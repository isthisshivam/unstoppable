import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {
  useNavigation,
  CommonActions,
  StackActions,
  useFocusEffect,
} from '@react-navigation/native';
import useStyle from './style';
import colors from '../../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
import SportsList from '../../components/SportList';
import PrimaryHeader from '../../components/PrimaryHeader';

import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import strings from '../../constants/strings';
import {showToastMessage} from '../../utils/utilities';
import moment from 'moment';
const ChooseSport = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [selctedSportsIndex, setSelctedSportsIndex] = useState(0);
  const [selectedSports, setSelectedSports] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userType] = useState(props.route.params);
  // alert(JSON.stringify(props.route.params));
  const route = useRoute();

  useEffect(() => {
    getSports();
  }, []);
  const getSports = async () => {
    let data = [];
    setLoading(true);
    await firestore()
      .collection('Sports')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('getSports=', {id: doc.id, data: doc.data()});
          data.push({id: doc.id, data: doc.data()});
        });
        setSports(data);
        setSelectedSports(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  // const onItemPress = value => {
  //   setSports(sport =>
  //     sport.includes(value)
  //       ? sport.filter(n => n !== value)
  //       : [value, ...sport],
  //   );
  // };

  const onItemPress = value => {
    const {index, item} = value;
    console.log('onItemClick=>', item.data);
    sports[index].data.isSelected = !sports[index].data.isSelected;
    // selectedSports[index].data.isSelected =
    //   !selectedSports[index].data.isSelected;
    // if (sports[index].data.isSelected) {
    //   selectedSports.push({
    //     ...sports[index].data,
    //     id: item.id,
    //     day: 1,
    //     time: moment().unix(),
    //   });
    //   setSelctedSportsIndex(selectedSports);
    // } else {
    //   let data = selectedSports.filter(value => value.name != item.data.name);
    //   setSelectedSports(data);
    // }
    console.log('selectedSports =>', sports);
    setIsUpdating(!isUpdating);
    setSports(sports);
    //setSelctedSportsIndex(selectedSports);
    //  console.log('selectedSports=>', selectedSports);
    // setSports(sport =>
    //   sport.includes(value.data.name)
    //     ? sport.filter(n => n !== value)
    //     : [value, ...sport],
    // );
    ///  sports[]
  };

  const saveSport = async () => {
    console.log('saveSport=>', selectedSports);

    if (selectedSports.length == 0) {
      showToastMessage('Please select atleast one sport to continue.');
    } else {
      setLoading(true);
      await firestore()
        .collection('Users')
        .doc(global?.Uid)
        .update({sport_name: sports});
      setLoading(false);

      setTimeout(() => {
        userType == strings.coach
          ? navigation.navigate('EnterOrInviteTeam')
          : navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            });
      }, 500);
    }
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <Text style={style.heading}>
          {global.UserType == strings.coach
            ? strings.choosecoach
            : strings.choosesport}
        </Text>
        <Text style={style.h2}>{strings.choose_your_sport}</Text>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <Loader isLoading={loading}></Loader>
      <FlatList
        extraData={isUpdating}
        contentContainerStyle={style.cc}
        ListHeaderComponent={<ListHeaderComponent />}
        ListFooterComponent={
          <PrimaryButton
            heading={strings.NEXT}
            onClick={() => saveSport()}></PrimaryButton>
        }
        showsVerticalScrollIndicator={false}
        //data={strings.sportsData}
        data={sports}
        renderItem={item => (
          <SportsList
            selectedSports={selectedSports}
            data={sports}
            selctedSportsIndex={selctedSportsIndex}
            onClick={item => onItemPress(item)}
            item={item}></SportsList>
        )}></FlatList>
    </SafeAreaView>
  );
};

export default ChooseSport;
