import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';

import {getStoreData, showToastMessage} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import HeaderWithHeading from '../../components/HeaderWithHeading';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import Messages from '../../components/Messages';
import EditBuildAppModal from '../../components/EditProfileModa';
import FastImage from 'react-native-fast-image';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import moment from 'moment';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import strings from '../../constants/strings';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
var comment_count = 0;
const TeamFeedsComment = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [teamFeed, setTeamFeed] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const inputRef = React.useRef();
  useEffect(() => {
    pullComments();
    inputRef.current.focus();
  }, []);
  console.log('props==', props?.route?.params?.post_id);
  const pullComments = async () => {
    await firestore()
      .collection('TeamFeed')
      .doc(props?.route?.params?.post_id)
      .onSnapshot(querySnapshot => {
        comment_count = querySnapshot.data().comment_count;
        console.log('pullcomoemomeoe=', querySnapshot.data());
      });
    await firestore()
      .collection('TeamFeed')
      .doc(props?.route?.params?.post_id)
      .collection('comments')
      .orderBy('created_at')
      .onSnapshot(querySnapshot => {
        const refArray = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log('refarray=', documentSnapshot.data());
          refArray.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setTeamFeed(refArray);
      });
  };

  const addComment = async () => {
    let comment = {
      created_at: moment().format(),
      user_image: global.UserInfo.userinfo.profile,
      user_name: global.UserInfo.userinfo.displayName,
      comment: message,
      post_id: props?.route?.params?.post_id,
      user_id: global?.Uid,
    };

    await firestore()
      .collection('TeamFeed')
      .doc(props?.route?.params?.post_id)
      .collection('comments')
      .add(comment)
      .then(() => {
        setMessage('');
      })
      .catch(e => {});
    await firestore()
      .collection('TeamFeed')
      .doc(props?.route?.params?.post_id)
      .update({comment_count: comment_count + 1})
      .then(() => {
        setMessage('');
      })
      .catch(e => {});
  };
  const Header = () => {
    return (
      <View style={style.header_view}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.back_click}>
          <Image style={style.img_20} source={images.downarrow}></Image>
        </TouchableOpacity>
        <Text style={style.header_heading}>Comments</Text>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={style.back_click1}>
          <Image style={style.img_20} source={images.menu}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  const renderComments = item => {
    const {created_at, user_image, user_name, comment} = item?.item?.data;
    var start = moment(created_at);
    var end = moment(new Date());

    return (
      <View
        style={{
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
          backgroundColor: colors.blackShade_s,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <FastImage
              style={{
                height: 35,
                width: 35,
                resizeMode: 'cover',
                borderRadius: 15,
              }}
              source={{uri: user_image}}></FastImage>
            <View style={{paddingLeft: 10}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'left',
                  lineHeight: 20,
                  color: colors.white,
                  fontSize: dW(13),
                  letterSpacing: 0,
                }}>
                {user_name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'left',
                  lineHeight: 20,
                  color: colors.gray,
                  fontSize: dW(12),
                  letterSpacing: 0,
                }}>
                {moment(created_at).fromNow()}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={style.back_click}>
            <Image style={style.img_20} source={images.menu}></Image>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            textAlign: 'left',
            marginTop: 8,
            lineHeight: 20,
            color: colors.white,
            fontSize: 15,
            letterSpacing: 0,
          }}>
          {comment}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[{backgroundColor: colors.black, flex: 1}]}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      keyboardVerticalOffset={40}>
      <Header />
      <View style={[style.flex1]}>
        <SafeAreaProvider>
          <AutoScrollFlatList
            onEndReached={() => console.log('onendreached====')}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.paddingHorizontal}
            enabledAutoScrollToEnd
            threshold={20}
            renderItem={renderComments}
            data={teamFeed}></AutoScrollFlatList>

          <EditBuildAppModal
            icon={images.write}
            heading={'Create Post'}
            canclePress={() => setModal(false)}
            onMainClick={() => navigation.navigate('CreatePost')}
            isVisible={modal}></EditBuildAppModal>

          <KeyboardAvoidingView>
            <View style={style.key}>
              <TextInput
                ref={inputRef}
                value={message}
                onChangeText={value => setMessage(value)}
                placeholder="Write a message..."
                style={style.input}></TextInput>
              <TouchableOpacity
                onPress={() => message.length > 0 && addComment()}
                style={message.length > 0 ? style.touch : style.touch_disabled}>
                <Image
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                  source={images.send}></Image>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </View>
    </KeyboardAvoidingView>
  );
};
export default TeamFeedsComment;
