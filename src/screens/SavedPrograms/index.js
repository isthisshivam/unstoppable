import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData, extractVideoId} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import BoxView from '../../components/BoxView';
import SecondaryHeader from '../../components/SecondaryHeader';
import strings from '../../constants/strings';
import {Vimeo} from 'react-native-vimeo-iframe';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import FastImage from 'react-native-fast-image';
let programsId = [];
const SavedPrograms = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const {isFocused} = useIsFocused();
  const style = useStyle();
  const [programs, setPrograms] = useState(null);
  const [loading, setLoading] = useState(false);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     setPrograms([]);
  //     getFavPrograms();
  //   }, []),
  // );
  useEffect(() => {
    setPrograms([]);
    programsId = [];
    getFavPrograms();
  }, [isFocused]);

  const getFavPrograms = async () => {
    await firestore()
      .collection('SavedPrograms')
      .where('user_id', '==', global?.Uid)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('getFavPrograms=', doc._data);
          programsId.push(doc._data.id);
        });
        getProgramDetails();
      });
  };

  const getProgramDetails = async () => {
    let allPrograms = [];
    let allMobilityPrograms = [];

    setLoading(true);
    await firestore()
      .collection('UnStoppableCategoryData')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (programsId.includes(doc._data.category)) {
            let value = {
              id: doc?.id,
              data: doc?._data,
            };
            allPrograms.push(value);
          }
        });
        console.log('allPrograms=', allPrograms);
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
      });

    setTimeout(() => {
      console.log({allPrograms, allMobilityPrograms});
      setPrograms(allPrograms.concat(allMobilityPrograms));

      setLoading(false);
    }, 1000);
  };

  const renderVideos = ({item}) => {
    return (
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate('CoachCorner', {
        //     category_id: item?.data?.category,
        //     doc_id: item?.id,
        //   })
        // }
        onPress={() =>
          navigation.navigate('CoachCorner', {
            category_id: item?.data?.category
              ? item?.data?.category
              : item?.data?.day,
            doc_id: item?.id,
            section: item?.data?.category ? 'CoachCorner' : 'Mobility',
            sport_id: item?.data?.sport_id,
          })
        }
        style={style.center}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          borderRadius={10}
          style={style.manfoot}
          source={{
            uri: item.data.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}>
          <ImageBackground
            progressiveRenderingEnabled
            loadingIndicatorSource={images.MobilityChat}
            resizeMode="cover"
            borderRadius={10}
            style={style.foot}
            source={images.footbackfull}>
            <Text
              numberOfLines={1}
              style={style.today}>{`${item.data.title}`}</Text>
            <Text numberOfLines={1} style={style.start}>
              {item.data?.description}
            </Text>
          </ImageBackground>
        </FastImage>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <SecondaryHeader
        onClick={() => [setPrograms([]), navigation.goBack()]}
        heading={strings.saved_workouts}
      />
      {loading ? (
        <Loader isLoading={loading}></Loader>
      ) : (
        <FlatList
          key={programs}
          contentContainerStyle={{paddingHorizontal: 10}}
          renderItem={renderVideos}
          data={programs}></FlatList>
      )}
    </SafeAreaView>
  );
};
export default SavedPrograms;
