import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  Share,
} from 'react-native';
import images from '../assests/images';
import {dW, dH, windowHeight} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
import useStyle from '../constants/style';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import firestore from '@react-native-firebase/firestore';

import LinearGradient from 'react-native-linear-gradient';
const InvieTeamView = ({heading, onClick, ex_style, onchange, value}) => {
  const styles = useStyle();

  const [link, setLink] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    buildLink();

    fetchCoachCode();
  }, []);

  async function buildLink() {
    const link = await dynamicLinks().buildShortLink(
      {
        link: 'https://scorrer.com/inviteWithPromo?promotionID=123&payload=abcdef&inviterID=3435',
        domainUriPrefix: 'https://unstoppablernapp.page.link',
        analytics: {
          campaign: 'banner',
        },
        android: {
          packageName: 'com.unstoppableathelete',
        },
        ios: {
          bundleId: 'com.unstoppable.com.dev',
          customScheme: 'appparameter',
        },
      },
      'SHORT',
    );
    setLink(link);
  }

  const fetchCoachCode = async () => {
    await firestore()
      .collection('Users')
      .doc(global.Uid)
      .get()
      .then(querySnapshot => {
        console.log('codeUser', querySnapshot?.data()?.code);
        setCode(querySnapshot?.data()?.code);
      });
  };

  const onShareCodeClick = async () => {
    try {
      const result = await Share.share({
        message:
          link + '\n\nPlease use below code for join the Coach Team:\n' + code,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View
      style={{
        // flex: 1,
        // flexDirection: 'row',
        backgroundColor: colors.blackshade,
        marginVertical: 15,
        height: 160,
        width: '100%',
        borderRadius: 10,
        // justifyContent: 'space-between',
        padding: 15,
      }}>
      <Text
        style={{
          marginTop: dW(1),
          textAlign: 'left',
          fontFamily: 'Montserrat-SemiBold',
          color: colors.white,
          fontSize: dW(16),
          letterSpacing: 1,
        }}>
        Invite Your Team
      </Text>
      <Text
        style={{
          marginTop: dW(10),
          textAlign: 'left',
          fontFamily: 'Montserrat-Regular',
          color: colors.white,
          fontSize: dW(14),
          letterSpacing: 1,
        }}>
        Create your own custom invite code for your team.
      </Text>
      <View style={{marginTop: dW(10), flexDirection: 'row'}}>
        <TextInput
          editable={false}
          value={code}
          style={{
            color: colors.gray,
            paddingHorizontal: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            height: 45,
            fontSize: 14,
            fontFamily: 'Montserrat-Medium',
            width: '60%',
            backgroundColor: colors.white,
          }}></TextInput>
        <TouchableOpacity onPress={() => onShareCodeClick()}>
          <ImageBackground
            borderBottomRightRadius={20}
            borderTopRightRadius={20}
            source={images.back}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 45,
              width: 120,
            }}>
            <Text
              style={{
                //  marginRight: dW(70),
                fontFamily: 'Montserrat-Medium',
                color: colors.white,
                fontSize: dW(13),
                letterSpacing: 0,
              }}>
              SHARE CODE
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default InvieTeamView;
