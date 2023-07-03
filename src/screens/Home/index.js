import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Animated,
  Pressable,
  AsyncStorage,
  ActivityIndicator,
  AppState,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import FastImage from 'react-native-fast-image';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import files from '../../assests/csv';
import DocumentPicker from 'react-native-document-picker';
import {
  getStoreData,
  removeStoreData,
  secondsToHHMMSS,
  convertMilliSecondsIntoLegibleString,
  is24HourPassed,
  showToastMessage,
  setStoreData,
} from '../../utils/utilities';
import Carousel from 'react-native-snap-carousel';
import {
  dW,
  dH,
  windowHeight,
  windowWidth,
} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import BoxView from '../../components/BoxView';
import strings from '../../constants/strings';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import moment from 'moment';
import {differenceInSeconds, setSeconds} from 'date-fns';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import XLSX from 'xlsx';
import {DownloadDirectoryPath, readFile, writeFile} from 'react-native-fs';

let appStartTime = new Date();
var data_ = [];
const Home = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [selected, setSelected] = useState('0');
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [coach_corner, setCoachCorner] = useState([]);
  const [coach_corner_data, setCoachCategoryData] = useState([]);
  const [todayMobility, setTodatMobility] = useState(null);
  const [myTeams, setMyTeams] = useState([]);
  const [userName, setUserName] = useState('');
  const [isListLoading, setListLoading] = useState(false);
  const [section, setSection] = useState(null);
  const [userType, setUserType] = useState('');
  const [wod, setWod] = useState([]);
  const [onGoingWorkout, setOnGoingWorkout] = useState(null);
  const [selectedSports, setSelectedSport] = useState([]);
  const route = useRoute();
  const [counter, setCounter] = useState(0);
  const [importedAtheletes, setImportedAthelets] = useState([]);
  const appState = useRef(AppState.currentState);

  React.useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    console.log('handleAppStateChange line:83');
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  const handleAppStateChange = nextAppState => {
    if (appState.current.match(/inactive|background/)) {
      console.log('handleAppStateChange /inactive|background/');
    } else {
      if (nextAppState == 'background') {
        console.log('handleAppStateChange active', 'BACKGROUND');
        saveEndTime();
      } else if (nextAppState == 'inactive') {
        console.log('handleAppStateChange active', 'INACTIVE');
      }
      console.log('handleAppStateChange active', nextAppState);
      //saveEndTime();
      // console.log({nextAppState});
      // const viewSessionDuration = differenceInSeconds(new Date(), appStartTime);
      // console.log({viewSessionDuration});
      // return;
      // updateSpentTime(viewSessionDuration);
      // you would then take the viewSessionDuration and do whatever you want with it. Save it to your local app DB, or send it off to an API.
    }
  };

  const saveEndTime = async () => {
    alert('called');
    let end_time = new Date();
    await setStoreData('end_time', end_time);
    console.log('savinnn end_time: ', end_time);
    convertMilliSecondsIntoLegibleString();
  };
  const convertMilliSecondsIntoLegibleString = async () => {
    const storedEndTime = await getStoreData('end_time');
    const storedStartTime = await getStoreData('start_time');
    let millis =
      new Date(storedEndTime).getTime() - new Date(storedStartTime).getTime();
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    console.log('result:', minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
    updateSpentTime(minutes);
  };

  const updateSpentTime = async minutes => {
    console.log('updateSpentTime need to add this time =>', minutes);
    let previousSavedDuration = 0;
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot) {
          previousSavedDuration = querySnapshot?._data?.sessionDuration
            ? querySnapshot?._data?.sessionDuration
            : 0;
        }
      });

    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .update({
        sessionDuration: previousSavedDuration + minutes,
      })
      .then(res => {
        console.log(
          'handleAppStateChange updateSpentTime.success',
          previousSavedDuration + minutes,
        );
        setTimeout(() => {
          saveStartTime();
          setLoading(false);
        }, 2000);
      })
      .catch(e => {
        console.log('updateSpentTime.catch', e);
        setLoading(false);
      });
  };
  const saveStartTime = async () => {
    let start_time = new Date();
    await setStoreData('start_time', start_time);
    console.log('savinnn start_time: ', start_time);
  };
  // const clearStartTime = async () => {
  //   await removeStoreData('start_time');
  // };
  const check = async () => {
    await dynamicLinks()
      .getInitialLink()
      .then(url => {
        if (url) {
          // app opened from a url
        } // use deep link to handle the URL.
        if (Platform.OS === 'android') {
          Linking.getInitialURL()
            .then(url => {
              // do something with the URL
            })
            .catch(err => err);
        } else {
          console.log('getInitialLink=', url);
          // handle case for iOS
        }
      });
  };
  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .get()
      .then(querySnapshot => {
        console.log('gpullUserPersonalInfolobal?.Uid=', querySnapshot);
        if (querySnapshot) {
          setUserName(querySnapshot?._data?.displayName);
          setUserType(querySnapshot?._data?.user_type);
          setOnGoingWorkout({
            type: querySnapshot?._data?.type,
            workoutId: querySnapshot?._data?.workoutId,
            time: querySnapshot?._data?.time,
          });
          console.log(
            'querySnapshot?._data===',
            querySnapshot?._data?.sport_name.filter(
              data => data?.data?.isSelected === true,
            ),
          );
          if (
            querySnapshot?._data?.sport_name &&
            querySnapshot?._data?.sport_name.length > 0
          ) {
            setSelectedSport(
              querySnapshot?._data?.sport_name.filter(
                data => data?.data?.isSelected === true,
              ),
            );
          }
        }
      });
  };

  useEffect(() => {
    getCategoriesId();
    check();
    // return () => {
    //   console.log('called');
    //   setWod([]);
    //   setSport([]);
    //   setCounter(0);
    // };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      pullUserTeams();
    }, []),
  );

  useEffect(() => {
    if (selectedSports.length > 0) {
      if (counter != selectedSports.length) {
        getAllWorkouts();
      } else {
        setLoading(false);
        console.log('wod=>', wod);
      }
    }
  }, [selectedSports, counter]);

  const getAllWorkouts = async () => {
    setLoading(true);
    console.log(
      'selectedSports[counter].data=>',
      // wod[counter],
      //is24HourPassed(selectedSports[counter].time),
      //   selectedSports[counter],
      selectedSports[counter].id,
      selectedSports[counter].data.day,
      is24HourPassed(selectedSports[counter].data.time),
      selectedSports[counter].data.day == 0 ||
        is24HourPassed(selectedSports[counter].data.time)
        ? console.log('plus+1')
        : console.log('sameDay'),
      // selectedSports[counter].data.name,
      // selectedSports[counter].data.time,
    );
    // await firestore()
    //   .collection('CompletedWorkout')
    //   .doc(global?.Uid)
    //   .collection('workouts')
    //   .where('id', '==', wod[counter].id)
    //   .where('sport_id', '==",wod[counter]', selectedSports[counter].id)
    //   .onSnapshot(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       console.log('getFavPrograms=', doc._data);
    //       // programsId.push(doc._data.id);
    //     });
    //   });
    // alert(is24HourPassed(selectedSports[counter].data.time));
    await firestore()
      .collection('Workouts')
      .where('sport_id', '==', selectedSports[counter].id)
      .where(
        'day',
        '==',
        selectedSports[counter].data.day == 0 ||
          is24HourPassed(selectedSports[counter].data.time)
          ? selectedSports[counter].data.day + 1
          : selectedSports[counter].data.day,
      )
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('workouts.object===>', {
            data: doc.data(),
            id: doc.id,
          });
          let value = doc.data();
          data_.push({
            data: doc.data(),
            id: doc.id,
          });
          setCounter(counter + 1);
        });
        setWod(data_);
        setLoading(false);
        console.log('workoutId=>', wod);
      });
  };

  // useEffect(() => {
  //   if (onGoingWorkout) {
  //     if (onGoingWorkout.type > wod.length) {
  //       onGoingWorkout.type = 1;
  //     }
  //     if (onGoingWorkout?.time != strings.empty) {
  //       //intial state passed
  //       if (is24HourPassed(onGoingWorkout?.time)) {
  //         getTodayMobilityeee(onGoingWorkout?.type);
  //       } else {
  //         getTodayMobilityeee(
  //           onGoingWorkout?.type === 1 ? 1 : onGoingWorkout?.type - 1,
  //         );
  //       }
  //     } else {
  //       //initial state
  //       getTodayMobilityeee(1);
  //     }
  //   }
  // }, [onGoingWorkout]);
  const getCategoriesId = async () => {
    await firestore()
      .collection('Category')
      .onSnapshot(querySnapshot => {
        let data = [];
        let coach_corner = [];
        querySnapshot.forEach(doc => {
          if (doc.data().title == 'Coaches Corner') {
            let value = {
              id: doc.id,
              data: doc.data(),
            };
            coach_corner.push(value);
          } else {
            let value = {
              id: doc.id,
              data: doc.data(),
            };
            data.push(value);
          }
        });
        setCategoryName(data);
        //getTodayMobility(data[1].id);
        //getSelctedCategorieData(data[0].id);
        setCoachCorner(coach_corner);
        setLoading(false);
      });
  };

  const getTodayMobilityeee = async type => {
    let data = [];
    await firestore()
      .collection('Workouts')
      .where('type', '==', type)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          setTodatMobility({data: doc.data(), id: doc.id});
          console.log('getTodayMobilityeee?._data===', doc.id);
        });
      });
    await firestore()
      .collection('Workouts')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          data.push({data: doc.data(), id: doc.id});
        });
      });

    setWod(data);
    console.log('WOD?._data===', wod);
  };

  const onWodPress = item => {
    const {image, description, points, title, type, time, sport_id, day} =
      item.data;
    console.log('onWodPress?._data===', item.data);

    navigation.navigate('CoachCorner', {
      category_id: is24HourPassed(time) ? day + 1 : day,
      doc_id: item?.id,
      section: 'Mobility',
      sport_id: sport_id,
    });
    return;
    if (type == 1) {
      //1 wala case
      navigation.navigate('CoachCorner', {
        category_id: type,
        doc_id: item?.id,
        section: 'Mobility',
        sport_id: sport_id,
      });
    } else if (!is24HourPassed(onGoingWorkout?.time)) {
      showToastMessage('You can complete one workout in one day.');
    } else if (onGoingWorkout?.type >= type) {
      navigation.navigate('CoachCorner', {
        category_id: type,
        doc_id: item?.id,
        section: 'Mobility',
        sport_id: sport_id,
      });
    } else if (
      onGoingWorkout?.type < type &&
      is24HourPassed(onGoingWorkout?.time)
    ) {
      navigation.navigate('CoachCorner', {
        category_id: type,
        doc_id: item?.id,
        section: 'Mobility',
        sport_id: sport_id,
      });
    } else {
      showToastMessage('Please complete your previous WOD first');
    }
  };
  useEffect(() => {
    if (coach_corner.length > 0) {
      getCoachCategorieData(coach_corner[0].id);
    }
  }, [coach_corner]);
  const getCoachCategorieData = async category_id => {
    await firestore()
      .collection('UnStoppableCategoryData')
      .where('category', '==', category_id)
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          let value = {
            id: doc.id,
            data: doc.data(),
          };
          data.push(value);
        });
        setCoachCategoryData(data);
      });
  };
  const getSelctedCategorieData = async (category_id, title) => {
    setLoading(true);
    // console.log('category_id=', category_id);
    await firestore()
      .collection('UnStoppableCategoryData')
      .where('category', '==', category_id)
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          let value = {
            id: doc.id,
            data: doc.data(),
          };
          console.log('UnStoppableCategoryData=', value);
          data.push(value);
        });
        setCategoryData(data);
        setLoading(false);
        setTimeout(() => {
          navigation.navigate('CoachCorner', {
            category_id: category_id,
            doc_id: data[0].id,
            section: title,
          });

          // setListLoading(false);
        }, 100);
      });
  };
  const pullUserTeams = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .where('coachId', 'array-contains', global?.Uid)
      .where('user_type', '==', strings.athletew)
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
        data_ = [];
        setWod([]);
        setSelectedSport([]);
        setCounter(0);
        pullUserPersonalInfo();
        // setTimeout(() => {
        //   pullUserPersonalInfo();
        //   setLoading(false);
        // }, 1500);
      });
  };

  const getWorkoutById = async () => {
    await firestore()
      .collection('Workouts')
      .doc(importedAtheletes[counter].id)
      .collection(importedAtheletes[counter].id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setCounter(counter + 1);
          console.log('getWorkoutById.object===>', {
            data: doc.data(),
            id: doc.id,
          });
          //workoutId.push({id: doc.id});
        });
        // setImportedAthelets(workoutId)
      });
  };
  const getWorkoutsBySelectedSports = async () => {
    let data = [];
    //In case of Soccer we need to retrieve this information because we have diffrent name in db (In case of Soccer)
    let sport_name =
      selectedSports[0] === 'Soccer'
        ? 'scorrer'
        : selectedSports[0].toLowerCase();

    await firestore()
      .collection('Workouts')
      .doc(sport_name)
      .collection(sport_name)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log('getWorkoutsBySelectedSports.object===', {
          //   data: doc.data(),
          //   id: doc.id,
          // });
          data.push({
            data: doc.data(),
            id: doc.id,
          });
        });
      });
    // console.log(
    //   'getWorkoutsBySelectedSports._data===',
    //   data.sort((a, b) => {
    //     return a.data.type - b.data.type;
    //   }));
    //sort array by type
    setWod(
      data.sort((a, b) => {
        return a.data.type - b.data.type;
      }),
    );
  };
  // const renderExercises = item => {
  //   return (
  //     <Pressable
  //       onPress={() => [
  //         navigation.navigate('CoachCorner', {
  //           category_id: item?.item?.data?.category,
  //           doc_id: item?.item?.id,
  //           section: selected == 0 ? 'Cool Down' : 'Warmup',
  //         }),
  //       ]}
  //       style={style.exe_view}>
  //       <Image
  //         source={{uri: item.item.data.image}}
  //         style={style.exe_img}></Image>
  //       <View style={style.flex_60}>
  //         <View>
  //           <Text style={style.h7}>{item?.item?.data?.title}</Text>
  //           <Text style={style.mint}>
  //             {convertMilliSecondsIntoLegibleString(
  //               item?.item?.data?.duration * 1000,
  //             )}
  //           </Text>
  //         </View>
  //         <FastImage
  //           source={images.downarrow}
  //           resizeMode="contain"
  //           style={style.arrow}></FastImage>
  //       </View>
  //     </Pressable>
  //   );
  // };
  // const renderCoaches = ({item}) => {
  //   console.log('renderCoaches=', item);
  //   return (
  //     <Pressable
  //       onPress={() =>
  //         navigation.navigate('CoachCorner', {
  //           category_id: item?.data.category,
  //           doc_id: item?.id,
  //           section: 'CoachCorner',
  //         })
  //       }
  //       style={style.coaches}>
  //       <View style={style.coachess}>
  //         <View>
  //           <Text style={style.coaches_heading}>{item?.data?.subTitle}</Text>
  //           <Text style={style.h6}>{item?.data?.title}</Text>
  //         </View>
  //       </View>
  //       <FastImage
  //         source={{uri: item.data.image}}
  //         style={style.img_70}></FastImage>
  //     </Pressable>
  //   );
  // };
  const renderTeams = ({item}) => {
    //  console.log('teams=', item);
    return (
      <View style={style.items}>
        <FastImage
          source={{
            uri: item.data.profile,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          style={style.man}></FastImage>
        <Text style={style.h1}>{item.data.first_name}</Text>
      </View>
    );
  };
  //old render wod code
  // const renderWod = item => {
  //   const {image, description, points, title, type, pointsVisible} =
  //     item?.item.data;
  //   console.log({image, description, points, title, type});
  //   return (
  //     <TouchableOpacity
  //       onPress={() => onWodPress(item?.item)}
  //       style={style.center}>
  //       <FastImage
  //         resizeMode={FastImage.resizeMode.cover}
  //         borderRadius={10}
  //         style={style.manfoot}
  //         source={{
  //           uri: image,
  //           headers: {Authorization: 'someAuthToken'},
  //           priority: FastImage.priority.high,
  //         }}>
  //         <ImageBackground
  //           progressiveRenderingEnabled
  //           loadingIndicatorSource={images.MobilityChat}
  //           resizeMode="cover"
  //           borderRadius={10}
  //           style={style.foot}
  //           source={images.footbackfull}>
  //           <Pressable
  //             onPress={() => navigation.navigate('MySchedule')}
  //             style={style.blackv}>
  //             {/* <Text style={style.blackvHeading}>
  //               {moment(new Date()).format('MMM D')}
  //             </Text>
  //             <Image style={style.downarrow} source={images.downarrow}></Image> */}
  //           </Pressable>
  //           <Text style={style.today}>
  //             {sport.length > 0 ? `${sport[0]} - ${title}` : title}
  //             {/* {item?.index == 0 ? `${sport[0]} - ${title}` : title} */}
  //           </Text>
  //           <Text numberOfLines={1} style={style.start}>
  //             {description}
  //           </Text>
  //           {pointsVisible && (
  //             <View style={style.star}>
  //               <Image style={style.img_star} source={images.star}></Image>
  //               <Text style={style.two}>{`+${points} pts`}</Text>
  //             </View>
  //           )}
  //         </ImageBackground>
  //       </FastImage>
  //     </TouchableOpacity>
  //   );
  // };

  // const getSportName=()=>{
  //   let data   =
  // }
  const renderWod = item => {
    const {image, description, points, title, type, pointsVisible} =
      item?.item.data;
    return (
      <TouchableOpacity
        onPress={() => onWodPress(item?.item)}
        style={style.center}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          borderRadius={10}
          style={style.manfoot}
          source={{
            uri: image,
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
            <Pressable
              onPress={() => navigation.navigate('MySchedule')}
              style={style.blackv}>
              {/* <Text style={style.blackvHeading}>
                {moment(new Date()).format('MMM D')}
              </Text>
              <Image style={style.downarrow} source={images.downarrow}></Image> */}
            </Pressable>
            <Text style={style.today}>
              {selectedSports[item.index]
                ? `${selectedSports[item.index]?.data?.name} ${title}`
                : `${title}`}
            </Text>
            {description != '' ? (
              <Text numberOfLines={1} style={style.start}>
                {description}
              </Text>
            ) : (
              <></>
            )}

            {item.index != 0 && (
              <View style={style.star}>
                <Image style={style.img_star} source={images.star}></Image>
                <Text style={style.two}>{`+${points} pts`}</Text>
              </View>
            )}
          </ImageBackground>
        </FastImage>
      </TouchableOpacity>
    );
  };
  const ListHeaderComponent = () => {
    return (
      <View style={style.header_c}>
        <FastImage style={style.image} source={images.backone}></FastImage>
        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate('CoachCorner', {
              category_id: todayMobility?.data?.type,
              doc_id: todayMobility?.id,
              section: 'Mobility',
            })
          }
          style={style.center}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            borderRadius={10}
            style={style.manfoot}
            source={{
              uri: todayMobility?.data?.image,
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
              <Pressable
                onPress={() => navigation.navigate('MySchedule')}
                style={style.blackv}>
                <Text style={style.blackvHeading}>
                  {moment(new Date()).format('MMM D')}
                </Text>
                <Image
                  style={style.downarrow}
                  source={images.downarrow}></Image>
              </Pressable>
              <Text style={style.today}>{todayMobility?.data?.title}</Text>
              <Text numberOfLines={1} style={style.start}>
                {todayMobility?.data?.description}
              </Text>
              <View style={style.star}>
                <Image style={style.img_star} source={images.star}></Image>
                <Text
                  style={
                    style.two
                  }>{`+${todayMobility?.data?.points} pts`}</Text>
              </View>
            </ImageBackground>
          </FastImage>
        </TouchableOpacity> */}
        <View style={{position: 'absolute', zIndex: 11}}>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
            }}>
            {global.UserType == strings.coach && (
              <Text
                key={userName}
                style={style.heading3}>{`Let’s go, Coach ${userName}`}</Text>
            )}
            {global.UserType == strings.athletew && (
              <Text
                key={userName}
                style={style.heading3}>{`Let’s go, ${userName}`}</Text>
            )}
            <Pressable onPress={() => navigation.navigate('SavedPrograms')}>
              <Image style={style.save} source={images.savewhite}></Image>
            </Pressable>
          </View>

          {/* <FlatList
            horizontal
            data={wod}
            extraData={sport}
            renderItem={renderWod}
            //pagingEnabled
          ></FlatList> */}
          <Carousel
            data={wod}
            extraData={selectedSports}
            //ref={carouselRef}
            useExperimentalSnap={true}
            renderItem={renderWod}
            sliderWidth={windowWidth()}
            itemWidth={windowWidth()}
            layout={'default'}
            //contentContainerStyle={{marginTop: -75}}
            //initialScrollIndex={onGoingWorkout.type}
            pagingEnabled={Platform.OS === 'android' ? true : false}
          />
        </View>
        {/* <View style={style.center_1}>
         
          <Pressable
            onPress={() => [
              setSection('CoolDown'),
              setSelected('0'),
              setListLoading(true),
              getSelctedCategorieData(
                categoryName.length > 0 && categoryName[0]?.id,
              ),
            ]}
            style={[
              style.flex_46,
              {
                backgroundColor:
                  selected == '0' ? colors.blackshade : colors.transparent,
              },
            ]}>
            {selected == '0' && (
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={style.img1}
                source={{
                  uri: categoryName[0]?.data?.image,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.high,
                }}>
                <ImageBackground
                  resizeMode="cover"
                  borderRadius={10}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 120,
                    width: '100%',
                  }}
                  source={images.selected}>
                  <Text style={style.warm}>
                    {categoryName.length > 0 && categoryName[0]?.data?.title}
                  </Text>
                </ImageBackground>
              </FastImage>
            )}
            {selected == '1' && (
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={style.img1}
                source={{
                  uri: categoryName[0]?.data?.image,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.high,
                }}>
                <ImageBackground
                  resizeMode="cover"
                  borderRadius={10}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 120,
                    width: '100%',
                  }}
                  source={images.footbackfull}>
                  <Text style={style.text}>
                    {categoryName.length > 0 && categoryName[0]?.data?.title}
                  </Text>
                </ImageBackground>
              </FastImage>
            )}
          </Pressable>
        
          <Pressable
            onPress={() => [
              setSection('WarmUp'),
              setSelected('1'),
              setListLoading(true),
              getSelctedCategorieData(
                categoryName.length > 0 && categoryName[2]?.id,
              ),
            ]}
            style={[
              style.flex_46,
              {
                backgroundColor:
                  selected == '1' ? colors.blackshade : colors.transparent,
                marginRight: 7,
              },
            ]}>
            {selected == '1' && (
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={style.img1}
                source={{
                  uri: categoryName[2]?.data?.image,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.high,
                }}>
                <ImageBackground
                  resizeMode="cover"
                  borderRadius={10}
                  style={{
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 120,
                    width: '100%',
                  }}
                  source={images.selected}>
                  <Text style={style.warm}>
                    {categoryName.length > 0 && categoryName[2]?.data?.title}
                  </Text>
                </ImageBackground>
              </FastImage>
            )}
            {selected == '0' && (
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={style.img1}
                source={{
                  uri: categoryName[2]?.data?.image,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.high,
                }}>
                <ImageBackground
                  resizeMode="cover"
                  borderRadius={10}
                  style={style.img4}
                  source={images.footbackfull}>
                  <Text style={style.text}>
                    {categoryName.length > 0 && categoryName[2]?.data?.title}
                  </Text>
                </ImageBackground>
              </FastImage>
            )}
          </Pressable>
        </View> */}

        <View style={style.center_1}>
          {/* first */}
          <Pressable
            onPress={() =>
              getSelctedCategorieData(
                categoryName.length > 0 && categoryName[0]?.id,
                categoryName[0]?.data?.title,
              )
            }
            style={[style.flex_48]}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={style.img10}
              source={{
                uri: categoryName[0]?.data?.image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}>
              <ImageBackground
                resizeMode="cover"
                // borderRadius={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 120,
                  width: '100%',
                }}
                source={images.selected}>
                <Text style={style.warm}>
                  {categoryName.length > 0 && categoryName[0]?.data?.title}
                </Text>
              </ImageBackground>
            </FastImage>
          </Pressable>
          {/* second */}
          <Pressable
            onPress={() =>
              getSelctedCategorieData(
                categoryName.length > 0 && categoryName[2]?.id,
                categoryName[2]?.data?.title,
              )
            }
            style={[style.flex_48]}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={style.img10}
              source={{
                uri: categoryName[1]?.data?.image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}>
              <ImageBackground
                resizeMode="cover"
                // borderRadius={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 120,
                  width: '100%',
                }}
                source={images.selected}>
                <Text style={style.warm}>
                  {categoryName.length > 0 && categoryName[2]?.data?.title}
                </Text>
              </ImageBackground>
            </FastImage>
          </Pressable>
        </View>

        <View style={style.main}>
          {/* {isListLoading ? (
            <View style={{marginTop: 20}}>
              <ActivityIndicator
                animating={isListLoading}
                size={'small'}
                color={'white'}></ActivityIndicator>
            </View>
          ) : (
            <FlatList
              listKey="renderExercises"
              data={categoryData}
              style={style.padding}
              renderItem={renderExercises}
              contentContainerStyle={[
                style.cc,
                {
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  borderTopLeftRadius: selected == '1' ? 10 : 0,
                  borderTopRightRadius: selected == '0' ? 10 : 0,
                  // marginTop: -2,
                },
              ]}></FlatList>
          )} */}
          {/* <View style={style.padding_20}>
            <View style={style.flex_row}>
              <Text style={style.heading1}>{strings.coach_corner}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  onPress={() => navigation.navigate('LearnV2')}
                  style={style.heading2}>
                  {strings.exp}
                </Text>
                <FastImage
                  source={images.rightgray}
                  resizeMode="contain"
                  style={style.arrowgray}></FastImage>
              </View>
            </View>
          </View>
          <FlatList
            data={coach_corner_data}
            listKey="renderCoaches"
            style={style.padding_fl}
            renderItem={renderCoaches}
            contentContainerStyle={style.contentContainerStyle}></FlatList> */}

          {global.UserType == strings.coach && (
            <>
              {myTeams.length > 0 && (
                <View style={style.padding_20}>
                  <View style={style.flexD}>
                    <Text style={style.heading1}>{strings.myteam}</Text>
                    <Text
                      onPress={() => navigation.navigate('EnterOrInviteTeam')}
                      style={style.heading2}>
                      {strings.editteam}
                    </Text>
                  </View>
                </View>
              )}

              <FlatList
                extraData={myTeams}
                data={myTeams}
                listKey="renderTeams"
                style={style.style}
                renderItem={renderTeams}
                horizontal
                contentContainerStyle={style.ccc}></FlatList>
            </>
          )}

          <View style={style.paddgin_20}>
            <BoxView
              icon={images.teamfeed}
              onClick={() => navigation.navigate('TeamFeed')}
              heading={strings.teamfeed}></BoxView>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <Loader fullScrreen={true} isLoading={loading && !isListLoading}></Loader>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        ListHeaderComponent={<ListHeaderComponent />}
        style={style.FlatList}></FlatList>
    </SafeAreaView>
  );
};
export default Home;
