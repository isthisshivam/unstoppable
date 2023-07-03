import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  StyleSheet,
  Linking,
} from 'react-native';

import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import UserTypeLane from '../../components/UserTypeLane';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradientButton from '../../components/GradientButton';
import SecButton from '../../components/SecondaryButton';
import PrimaryHeader from '../../components/PrimaryHeader';
import strings from '../../constants/strings';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {sync} from 'react-native-iap/lib/typescript/modules/iosSk2';
import firestore from '@react-native-firebase/firestore';
import {showToastMessage} from '../../utils/utilities';

const EnterCode = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [link, setLink] = useState('');
  const [code, setCode] = useState('');
  // const check = async () => {
  //   await dynamicLinks()
  //     .getInitialLink()
  //     .then(url => {
  //       if (url) {
  //         console.log('getInitialLink=', url);
  //         // app opened from a url
  //       } // use deep link to handle the URL.
  //       if (Platform.OS === 'android') {
  //         Linking.getInitialURL()
  //           .then(url => {
  //             // do something with the URL
  //           })
  //           .catch(err => err);
  //       } else {
  //         // handle case for iOS
  //       }
  //     });
  // };

  const handleDynamicLink = async link => {
    const tt = await dynamicLinks().onLink(link);

    console.log('handleDynamicLink==', JSON.stringify(tt));
    // Handle dynamic link inside your own application
    if (link.url === 'https://invertase.io/offer') {
      // ...navigate to your offers screen
    }
  };

  const checkCodeExist = async () => {
    if (code.length == 0) return;

    await firestore()
      .collection('Users')
      .where('code', '==', code)
      .get()
      .then(querySnapshot => {
        if (querySnapshot != null && querySnapshot.docs.length > 0) {
          showToastMessage('Code matched.');
          console.log('coach', querySnapshot.docs[0]._data);
          console.log('coach', querySnapshot.docs[0]._data.displayName);

          navigation.navigate('CoachTeam', {
            enterAthlete: false,
            coachId: querySnapshot.docs[0].id,
            coachName: querySnapshot.docs[0]._data.displayName,
          });
          setCode('');
        } else showToastMessage('Code is Invalid.');
      });
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <View style={style.padd}>
        <Text style={style.code}>{strings.entercode}</Text>
        <Text style={style.code_des}>{strings.entercode_des}</Text>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholderTextColor={colors.gray}
          keyboardType="default"
          placeholder="Enter Code"
          style={style.input}></TextInput>

        <View style={style.margin}>
          <PrimaryButton
            onClick={() => checkCodeExist(code)}
            heading={'CONFIRM'}
            //onClick={() => navigation.navigate('FoundProfile')}
          ></PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterCode;
