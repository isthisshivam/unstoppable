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
import {useNavigation} from '@react-navigation/native';
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
import UsersList from '../../components/UsersList';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import strings from '../../constants/strings';
import MessagesList from '../../components/MessageList';
var refArray = [];
const SearchOrCreateChat = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageArray, setMessageArray] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    pullUserPersonalInfo();
    pullLatestChat();
  }, []);
  useEffect(() => {
    if (search != '') {
      search(searchText);
    }
  }, [searchText]);

  const search = text => {
    const filteredUsers = refArray.filter(item => {
      const itemData = `${item.receiver_name}`;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setMessageArray(filteredUsers);
  };
  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .collection('Team')
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          let value = {
            id: doc.id,
            data: doc.data(),
          };
          data.push(value);
        });
        setMyTeams(data);
        setLoading(false);
      });
  };
  const pullLatestChat = async () => {
    ///working code  for listing data and chats
    await firebase
      .firestore()
      .collection('Users')
      .doc(global?.Uid)
      .collection(strings.messages)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'pullLatestChat querySnapshot=>',
            documentSnapshot.data().LatestMessage,
          );
          var id = documentSnapshot.id;
          var isUserIncludes = id.includes(global?.Uid);
          if (isUserIncludes) {
            messageArray.push(documentSnapshot.data());
          }
          console.log('messageArray', messageArray);
        });
      });
    setMessageArray(messageArray);
    // i have to set data in a const variable
    // just because i need t search data from this array
    refArray = messageArray;
  };
  const onMessageClick = item => {
    navigation.navigate('Message', {
      receiver_id: item.id,
      receiver_image: item.data.profile,
      receiver_name: item.data.first_name,
    });
  };
  const onResultClick = item => {
    const {receiver_id, receiver_image, receiver_name} = item;
    navigation.navigate('Message', {
      receiver_id: receiver_id,
      receiver_image: receiver_image,
      receiver_name: receiver_name,
    });
  };
  const SearchBox = () => {
    return (
      <View style={style.pwd}>
        <Image style={style.img} source={images.search}></Image>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={colors.white}
          placeholder="Find Chats"
          style={style.input}></TextInput>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <HeaderWithHeading heading={'Search/Create Chat'}></HeaderWithHeading>
      {SearchBox()}
      {searchText ? (
        <Text
          style={style.heading}>{`Searching result for ${searchText}`}</Text>
      ) : (
        <Text style={style.heading}>{strings.suggested}</Text>
      )}

      {searchText ? (
        <FlatList
          style={style.Flatlist_ll}
          contentContainerStyle={{paddingBottom: 40}}
          data={messageArray}
          renderItem={item => (
            <MessagesList
              onClick={id => onResultClick(id)}
              item={item.item}></MessagesList>
          )}></FlatList>
      ) : (
        <FlatList
          style={style.list}
          contentContainerStyle={style.pa}
          data={myTeams}
          renderItem={item => (
            <UsersList
              item={item.item}
              isUser={false}
              onClick={item => onMessageClick(item)}></UsersList>
          )}></FlatList>
      )}
    </SafeAreaView>
  );
};
export default SearchOrCreateChat;
