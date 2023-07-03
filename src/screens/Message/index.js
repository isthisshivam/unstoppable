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
var listeners = []; // list of listeners
var start = null; // start position of listener
var end = null; // end position of listener
const Message = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [message, setMessage] = useState('');
  const [chatArray, setChatArray] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const receiver_id = props.route.params.receiver_id;
  const receiver_image = props?.route?.params?.receiver_image;
  const receiver_name = props?.route?.params?.receiver_name;

  const getMessages = async () => {
    let ref = await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .collection(strings.messages)
      .doc(setOneToOneChat(receiver_id, global?.Uid))
      .collection(strings.messages_collection);

    ref
      .orderBy(strings.created_at, 'desc')
      .limit(10)
      .get()
      .then(snapshots => {
        start = snapshots.docs[snapshots.docs.length - 1];
        let listener = ref
          .orderBy(strings.created_at)
          .startAt(start)
          .onSnapshot(querySnapshot => {
            const refArray = [];
            querySnapshot.forEach(documentSnapshot => {
              console.log('refarray=', documentSnapshot.data());
              refArray.push(documentSnapshot.data());
            });
            setChatArray(refArray);
          });

        listeners.push(listener);
      });
  };
  const getMoreMessages = async () => {
    let ref = await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .collection(strings.messages)
      .doc(setOneToOneChat(receiver_id, global?.Uid))
      .collection(strings.messages_collection);

    ref
      .orderBy(strings.created_at, 'desc')
      .startAt(start)
      .limit(10)
      .get()
      .then(snapshots => {
        end = start;
        start = snapshots.docs[snapshots.docs.length - 1];
        let listener = ref
          .orderBy(strings.created_at)
          .startAt(start)
          .endBefore(end)
          .onSnapshot(querySnapshot => {
            const refArray = [];
            querySnapshot.forEach(documentSnapshot => {
              refArray.push(documentSnapshot.data());
            });
            for (let i = 0; i < refArray.length; i++) {
              chatArray.unshift(refArray[i]);
            }
            setChatArray(chatArray);
          });
        listeners.push(listener);
      });
  };

  //////Function setsup endpoint for one to one chat
  const setOneToOneChat = (uid1, uid2) => {
    //Check if user1’s id is less than user2's
    if (uid1 < uid2) {
      return uid1 + '_' + uid2;
    } else {
      return uid2 + '_' + uid1;
    }
  };

  useEffect(() => {
    getMessages();
    //pullMessages();
  }, []);
  const pullMessages = async () => {
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .collection(strings.messages)
      .doc(setOneToOneChat(receiver_id, global?.Uid))
      .collection(strings.messages_collection)
      .orderBy(strings.created_at)
      .onSnapshot(querySnapshot => {
        const refArray = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log('refarray=', documentSnapshot.data());
          refArray.push(documentSnapshot.data());
        });
        setChatArray(refArray);
      });
  };
  const pushMessageToFireStore = async (message, type) => {
    var messageToAdd = {
      message,
      sender_id: global?.Uid,
      receiver_id: receiver_id,
      type: type,
      //image: type == 'image' ? {uri: localUri} : null,
      receiver_image: receiver_image,
      receiver_name: receiver_name,
      sender_name: global.UserInfo.userinfo.first_name,
      sender_profile: global.UserInfo.userinfo.profile,
      created_at: moment().format(), ///set current date to firestore
      is_seen: 0,
    };
    console.log('messagetoadd==', messageToAdd);

    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .collection(strings.messages)
      .doc(setOneToOneChat(receiver_id, global?.Uid))
      .collection(strings.messages_collection)
      .add(messageToAdd)
      .then(() => {
        chatArray.push(messageToAdd);
        setMessage('');
        setLoading(false);
      });
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .collection(strings.messages)
      .doc(receiver_id + `_` + global?.Uid)
      .set(messageToAdd);
  };

  const Header = () => {
    return (
      <View style={style.header_view}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.back_click}>
          <Image style={style.img_20} source={images.downarrow}></Image>
        </TouchableOpacity>
        <Text style={style.header_heading}>{receiver_name}</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.back_click}>
          <Image style={style.img_20} source={images.menu}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[{backgroundColor: colors.blackShade_s, flex: 1}]}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      keyboardVerticalOffset={40}>
      <Header />
      <View style={[style.flex1]}>
        <SafeAreaProvider>
          <AutoScrollFlatList
            refreshing={isRefreshing}
            onRefresh={() => [getMoreMessages(), console.log('onRefresh====')]}
            onEndReached={() => console.log('onendreached====')}
            //  ListEmptyComponent={() => emptyView()}
            //  extraData={isSent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.paddingHorizontal}
            enabledAutoScrollToEnd
            threshold={20}
            data={chatArray}
            renderItem={item => (
              <Messages
                receiver_image={null}
                index={item.index}
                // userId={item.item.userId}
                created_at={item.item.created_at}
                type={'text'}
                sender_profile={item.item.sender_profile}
                sender_id={item.item.sender_id}
                image={item.item.receiver_image}
                message={item.item.message}
                side={
                  item.item.sender_id == global.Uid ? 'right' : 'left'
                }></Messages>
            )}
            keyExtractor={item => 'item.created_at'}
          />
          <KeyboardAvoidingView>
            <View style={style.key}>
              <TextInput
                value={message}
                onChangeText={value => setMessage(value)}
                placeholder="Write a message..."
                style={style.input}></TextInput>
              <TouchableOpacity
                onPress={() =>
                  !isLoading && message
                    ? pushMessageToFireStore(message, 'text')
                    : showToastMessage('Please enter messsage!')
                }
                style={style.touch}>
                <Text style={{color: colors.white}}>Send</Text>
                {/* {isSent ? (
                  <Indicator isLoading={isSent}></Indicator>
                ) : (
                  <Image style={styles.send} source={images.CHAT.SEND}></Image>
                )} */}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Message;
