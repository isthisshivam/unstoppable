import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Animated,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData, extractVideoId} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import BoxView from '../../components/BoxView';
import SecondaryHeader from '../../components/SecondaryHeader';
import strings from '../../constants/strings';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
let programsId = [];
const CompletedWorkout = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [programs, setPrograms] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCompletedWorkouts();
  }, [props]);
  const getCompletedWorkouts = async () => {
    await firestore()
      .collection('CompletedWorkout')
      .doc(global?.Uid)
      .collection('workouts')
      //   .where('user_id', '==', global?.Uid)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('getFavPrograms=', doc._data);
          programsId.push(doc._data.id);
        });
        console.log('programsId=', programsId);
        getCompletedWorkoutsDetails();
      });
  };

  const getCompletedWorkoutsDetails = async () => {
    let allPrograms = [];
    let allMobilityPrograms = [];
    setLoading(true);
    await firestore()
      .collection('UnStoppableCategoryData')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (programsId.includes(doc._data.category)) {
            let value = {
              id: doc.id,
              data: doc._data,
            };
            allPrograms.push(value);
          }
          console.log('allPrograms=', allPrograms);
        });
      });
    await firestore()
      .collection('Workouts')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (programsId.includes(doc.id)) {
            let value = {
              id: doc.id,
              data: doc._data,
            };
            allMobilityPrograms.push(value);
          }
        });
        console.log('allmobility=', allMobilityPrograms);
      });
    setTimeout(() => {
      console.log({allPrograms, allMobilityPrograms});
      setPrograms(allPrograms.concat(allMobilityPrograms));
    }, 1000);

    setLoading(false);
  };

  const renderVideos = ({item}) => {
    return (
      <Pressable
        onPress={() => [
          navigation.navigate('CoachCorner', {
            category_id: item?.data?.category
              ? item?.data?.category
              : item?.data?.day,
            doc_id: item?.id,
            section: item?.data?.category ? 'CoachCorner' : 'Mobility',
            sport_id: item?.data?.sport_id,
          }),
          console.log('renderVideos=>', item.data),
        ]}
        style={{
          height: 100,
          width: '100%',
          marginTop: 1,
          padding: 20,
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.7}}>
          <View>
            <Text
              numberOfLines={1}
              style={{color: colors.orange, fontFamily: 'Montserrat-Regular'}}>
              {item?.data?.title.toUpperCase()}
            </Text>
            <Text
              numberOfLines={2}
              style={{color: colors.white, fontFamily: 'Montserrat-SemiBold'}}>
              {item.data.description}
            </Text>
          </View>
        </View>
        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
          <ImageBackground
            borderRadius={5}
            style={{height: 60, width: 60}}
            resizeMode="cover"
            source={{uri: item.data.image}}></ImageBackground>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <SecondaryHeader
        onClick={() => navigation.goBack()}
        heading={strings.complete_workout}
      />
      <FlatList
        extraData={programs}
        key={programs}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={renderVideos}
        data={programs}></FlatList>
    </SafeAreaView>
  );
};
export default CompletedWorkout;
