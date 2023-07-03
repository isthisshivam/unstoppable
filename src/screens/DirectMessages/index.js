import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Pressable,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';

import colors from '../../constants/colors';
import HeaderWithHeading from '../../components/HeaderWithHeading';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import MessagesList from '../../components/MessageList';
import strings from '../../constants/strings';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
var refArray = [];
const DirectMessages = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      pullLatestChat();
    });
    return focus;
  }, []);
  const pullLatestChat = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('Users')
      .doc(global?.Uid)
      .collection(strings.messages)
      .orderBy(strings.created_at)
      .get()
      .then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'pullLatestChat querySnapshot=>',
            documentSnapshot.data().LatestMessage,
          );
          var id = documentSnapshot.id;
          var isUserIncludes = id.includes(global?.Uid);
          if (isUserIncludes) {
            data.push(documentSnapshot.data());
          }
          console.log('messageArray', data.length);
        });
        setMessageArray(data);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const onMessageClick = item => {
    const {receiver_id, receiver_image, receiver_name} = item;
    navigation.navigate('Message', {
      receiver_id: receiver_id,
      receiver_image: receiver_image,
      receiver_name: receiver_name,
    });
  };
  const SearchBox = () => {
    return (
      <TouchableOpacity
        onPress={() => [
          setMessageArray([]),
          navigation.navigate('SearchOrCreateChat'),
        ]}
        style={style.search}>
        <Image style={style.img_12_12} source={images.search}></Image>
        <Text style={style.find}>{strings.findchat}</Text>
        <View></View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <HeaderWithHeading heading={strings.directmsg}></HeaderWithHeading>
      <SearchBox />
      <Loader isLoading={loading}></Loader>
      <FlatList
        extraData={loading}
        style={style.Flatlist_ll}
        contentContainerStyle={{paddingBottom: 40}}
        data={messageArray}
        renderItem={item => (
          <MessagesList
            onClick={id => onMessageClick(id)}
            item={item.item}></MessagesList>
        )}></FlatList>
      <Pressable
        onPress={() => [
          setMessageArray([]),

          navigation.navigate('SearchOrCreateChat'),
        ]}
        style={style.absolute}>
        <ImageBackground
          resizeMode="cover"
          borderRadius={30}
          style={style.border}
          source={images.backone}>
          <Text style={style.heading}>{strings.newchat}</Text>
        </ImageBackground>
      </Pressable>
    </SafeAreaView>
  );
};
export default DirectMessages;
