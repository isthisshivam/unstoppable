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
import {showToastMessage} from '../../utils/utilities';
import UsersList from '../../components/UsersList';
import strings from '../../constants/strings';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import {dH, dW} from '../../utils/dynamicHeightWidth';
var selectedAtheletes = [];
var refArray = [];
const CoachTeam = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [userArray, setUserArray] = useState([]);
  const [parentUserArray, parentSetUserArray] = useState([]);

  const [loading, setLoading] = useState(false);
  const [coachId, setCoachIds] = useState([]);
  const [lastVisible, setLastVisible] = useState({});
  const [searchText, setSearchText] = useState('');
  const [coachName, setCoachName] = useState('');
  const [isUpdating, setUpdating] = useState(false);

  useEffect(() => {
    console.log('userId...', props.route.params.enterAthlete);
    if (props.route.params.enterAthlete) fetchWithoutCoachUser();
    else pullTeamUsers();
  }, []);

  useEffect(() => {
    if (searchText != '') {
      search(searchText);
    } else {
      setUserArray(parentUserArray);
    }
  }, [searchText]);

  const search = text => {
    console.log('users refArray.....', userArray);
    console.log('users refArray', refArray);
    const filteredUsers = parentUserArray.filter(item => {
      const itemData = `${item?._data?.first_name}`;
      return itemData.toLowerCase().includes(text.toLowerCase());
    });
    setUserArray(filteredUsers);
  };

  const pullTeamUsers = async () => {
    setCoachName(props.route.params.coachName);
    setLoading(true);
    await firebase
      .firestore()
      .collection('Users')
      .where('coachId', 'array-contains', props.route.params.coachId)
      //  .doc(props.route.params.coachId)
      // .collection('Team')
      // .orderBy(strings.created_at)
      .get()

      .then(querySnapshot => {
        const dataExist = querySnapshot.docs.map(object => {
          return {...object, isSelected: false};
        });
        console.log('dataExist=>', dataExist);
        setUserArray(dataExist);
        parentSetUserArray(dataExist);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const fetchWithoutCoachUser = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('Users')
      .where('user_type', '==', 'Athlete')
      //.orderBy('email', 'desc')
      //    .limit(10)
      .get()
      .catch(err => console.log('users err', err))
      .then(querySnapshot => {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        console.log('users ', querySnapshot);
        console.log('users lastVisible', lastVisible);
        const dataExist = querySnapshot.docs.map(object => {
          return {...object, isSelected: false};
        });
        setUserArray(dataExist);
        parentSetUserArray(dataExist);

        //    refArray = userArray;
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const fetchWithoutCoachUserMore = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('Users')
      .startAfter(lastVisible)
      .where('user_type', '==', 'Athlete')

      //.orderBy('email', 'desc')
      .limit(10)
      .get()
      .catch(err => console.log('users err', err))
      .then(querySnapshot => {
        console.log('users ', querySnapshot.docs);
        setUserArray(querySnapshot.docs);
        parentSetUserArray(querySnapshot.docs);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const loadMoreData = async () => {
    if (props.route.params.enterAthlete) fetchWithoutCoachUserMore();
    else pullTeamUsers();
  };

  const onUserClick = (item, index) => {
    item._data.coachName = coachName;
    console.log('matchdd', item);
    console.log('matchdd', index);
    item._data.index = index;
    navigation.navigate('FoundProfile', item);
  };

  const onAthleteEnter = item => {
    console.log('info', item._data);
    if (typeof item._data.coachId != 'undefined')
      setCoachIds(item._data.coachId);
    else setCoachIds([]);

    if (
      typeof item._data.coachId != 'undefined' &&
      item._data.coachId.length > 0 &&
      item._data.coachId.includes(global?.Uid)
    )
      showToastMessage('This Athlete already added in your Team');
    else navigation.navigate('EditTeam', item);
  };

  const onSelectUser = (item, index) => {
    if (typeof item._data.coachId != 'undefined')
      setCoachIds(item._data.coachId);
    else setCoachIds([]);

    if (
      typeof item._data.coachId != 'undefined' &&
      item._data.coachId.length > 0 &&
      item._data.coachId.includes(global?.Uid)
    ) {
      showToastMessage('This Athlete already added in your Team');
    } else {
      userArray[index]._data.isSelected = !userArray[index]._data.isSelected;

      if (userArray[index]._data.isSelected) {
        selectedAtheletes.push(item._data);
        console.log('selectedAtheletes if', selectedAtheletes);
      } else {
        if (index > -1) {
          selectedAtheletes.slice(index, 1);
        }
        console.log('selectedAtheletes else', selectedAtheletes);
      }
      setUserArray(userArray);
      setUpdating(!isUpdating);
      setTimeout(() => {
        console.log('selectedAtheletes', selectedAtheletes);
      }, 100);
    }
    // if (proteinArray[i].isSelected) {
    //   selectedFoods.protein.push({
    //     ...item,
    //     food_id: Date.now() + `/app`,
    //     created_by: userId,
    //     base_qty: item.quantity,
    //     base_food_details: JSON.stringify({
    //       base_calories: item.calories,
    //       base_carbs: parseFloat(item.carbs),
    //       base_fat: parseFloat(item.fat),
    //       base_protein: parseFloat(item.protein),
    //     }),
    //   });
    // } else {
    //   if (i > -1) {
    //     selectedFoods.protein.splice(i, 1);
    //   }
    // }
  };
  const SearchBox = () => {
    return (
      <View style={style.search}>
        <Image style={style.img_12_12} source={images.search}></Image>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={colors.white}
          placeholder={strings.findUser}
          style={style.input}></TextInput>
        <View></View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <HeaderWithHeading heading={strings.team}></HeaderWithHeading>

      <Loader isLoading={loading}></Loader>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          alignItems: 'center',

          marginBottom: dW(10),
        }}>
        {SearchBox()}
        {props.route.params.enterAthlete ? (
          <View
            style={style.img_add}
            onStartShouldSetResponder={() => navigation.navigate('EditTeam')}>
            <Image
              style={{
                height: dH(15),
                resizeMode: 'contain',
                width: dW(15),
              }}
              source={images.plus}></Image>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      {searchText ? (
        <Text
          style={style.heading}>{`Searching result for ${searchText}`}</Text>
      ) : (
        <Text style={style.heading}>{strings.suggested}</Text>
      )}

      <FlatList
        extraData={isUpdating}
        style={style.Flatlist_ll}
        contentContainerStyle={{paddingBottom: 40}}
        data={userArray}
        // onEndReached={loadMoreData}
        renderItem={({item, index}) => (
          <UsersList
            onSelect={(data, i) => onSelectUser(data, i)}
            item={item}
            index={index}
            isUser={true}
            onClick={item =>
              props.route.params.enterAthlete
                ? onAthleteEnter(item)
                : onUserClick(item, index)
            }></UsersList>
        )}></FlatList>
    </SafeAreaView>
  );
};
export default CoachTeam;
