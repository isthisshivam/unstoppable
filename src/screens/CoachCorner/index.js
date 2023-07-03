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
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import WebView from 'react-native-webview';
import useStyle from './style';
import {
  getStoreData,
  extractVideoId,
  convertMilliSecondsIntoLegibleString,
  showToastMessage,
} from '../../utils/utilities';
import DescriptionComponent from '../../components/DescriptionComponent';
import {dW, dH, windowHeight} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import BoxView from '../../components/BoxView';
import SecondaryHeader from '../../components/SecondaryHeader';
import strings from '../../constants/strings';
import {Vimeo} from 'react-native-vimeo-iframe';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import PrimaryButton from '../../components/PrimaryButton';
import moment from 'moment';
var selectedSports = [];
const data = `<div style="flex:1;background-color:#000;border:none;padding:50;position:fixed;left:0;top:0;bottom:0"><p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Teen athletes are no strangers to the demanding world of sports. As they strive to excel in their chosen disciplines, they face a common adversary: overuse injuries. These injuries can have long-lasting effects, hindering performance and jeopardizing future athletic pursuits. In this blog, we will define overuse injuries, explore the reasons behind their occurrence, emphasize the importance of cross training for prevention, discuss injury prevention cross training methods, and underscore the significance of engaging in injury prevention training for teen athletes.<p>
<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">What are overuse injuries?</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Overuse injuries occur when the body is subjected to repetitive stress without adequate time for recovery. Unlike acute injuries resulting from sudden trauma, overuse injuries develop gradually over time. Common examples include stress fractures, tendinitis, and muscle strains. These injuries often arise due to improper training techniques, excessive training volume, lack of rest and recovery, or poor biomechanics.</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">Reasons for Overuse Injuries in Teen Athletes:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">1. Rapid Growth and Development:
During adolescence, teens experience rapid growth, which can lead to imbalances in bone, muscle, and joint development. This makes them more susceptible to overuse injuries, as their bodies struggle to adapt to the physical demands of intense training.
</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">2. Sport Specialization:</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">The trend of early sport specialization has become increasingly prevalent among young athletes. Focusing solely on one sport from a young age often leads to repetitive movements and overloading specific muscle groups, increasing the risk of overuse injuries.
</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">Why Cross Training is Key to Prevention:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Cross training involves participating in a variety of sports and activities that complement the primary sport. Here’s why it plays a crucial role in preventing overuse injuries:</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">1. Balanced Muscle Development:</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Cross training allows athletes to engage different muscle groups, reducing the strain on specific areas.
By strengthening and conditioning the entire body, athletes can maintain balance and stability, minimizing the risk of overuse injuries caused by muscular imbalances.
</P>
<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">2. Rest and Recovery:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Engaging in different sports and activities gives the primary muscles used in the primary sport a chance
to rest and recover. This helps prevent repetitive stress and allows for adequate healing of damaged tissues, reducing the likelihood of overuse injuries.</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">Preventing Overuse Injuries through Injury Prevention Cross Training:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">1. Incorporate Strength Training:
Strength training is crucial for building overall body strength and stability. Focus on exercises that target major muscle groups and work on improving core strength. This will enhance overall performance, reduce the risk of imbalances, and prevent overuse injuries.
</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">2. Include Low-Impact Activities:</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Engage in low-impact activities such as swimming, cycling, or yoga to reduce stress on joints while
maintaining cardiovascular fitness. These activities provide an opportunity to rest high-impact areas and allow for active recovery.

</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">3. Enhance Flexibility and Mobility:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Regular stretching and mobility exercises can improve joint range of motion, reduce muscle tightness,
and enhance flexibility. Incorporate dynamic stretching before workouts and static stretching after workouts to maintain optimal flexibility and prevent overuse injuries.
</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">4. Opt for Active Rest and Recovery:</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Rest and recovery are essential components of injury prevention. Incorporate active rest days into your
training routine, focusing on gentle activities that promote blood flow and mobility. This allows the body
to recover without being completely sedentary.
</P>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana,
Arial, Helvetica, sans-serif;">Engaging in injury prevention training fosters the development of well-rounded athletes. By prioritizing
injury prevention, young athletes can maintain their physical health, continue training consistently, and
lay the foundation for long-term athletic success.
</P></div>`;

/////second
const data2 = `<div style="flex:1;background-color:#000;border:none;padding:50;position:fixed;left:0;top:0;bottom:0">
<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">Introduction</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Teenagers engaged in athletics often face numerous challenges, including intense training schedules, demanding competitions, and academic commitments. Amidst this demanding lifestyle, sleep often
takes a backseat. However, understanding the critical role of sleep in athletic performance and injury prevention is essential for the overall well-being and success of teen athletes. In this blog, we will explore why teen athletes need adequate sleep, discuss the detriments of poor sleep on athletic performance and injury rates, and provide practical tips for establishing a healthy sleep routine.
<p>
<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">Why Teen Athletes Need Sleep:</h3>


<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">1. Physical Recovery and Growth:</h3>


<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">During sleep, the body undergoes essential physiological processes that aid in tissue repair, muscle
growth, and recovery from physical exertion. Growth hormone is released, promoting muscle development and repair. Adequate sleep allows for optimal physical recovery, enabling teen athletes to perform at their best and avoid overuse injuries.
</P>


<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">2. Cognitive Function and Mental Well-being: </h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Sleep plays a vital role in cognitive function, memory consolidation, and learning. Teens who consistently get enough sleep experience improved focus, concentration, and decision-making abilities.Additionally, quality sleep is crucial for emotional regulation, stress management, and mental well- being. It can enhance an athlete’s ability to cope with the pressures of training and competition.
</P>


<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">Detriments of Poor Sleep on Athletic Performance and Injury Rates:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Cross training involves participating in a variety of sports and activities that complement the primary sport. Here’s why it plays a crucial role in preventing overuse injuries:</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">1. Reduced Physical Performance:</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Inadequate sleep negatively impacts athletic performance, leading to reduced speed, strength, agility, and endurance. Sleep deprivation can impair coordination, reaction time, and accuracy, diminishing overall athletic abilities. Without proper rest, athletes may struggle to reach their full potential, hindering their chances of success.
</P>
<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">2. Increased Risk of Injuries:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Lack of sleep is associated with an increased risk of sports-related injuries. Fatigue impairs neuromuscular control and decision-making abilities, making athletes more susceptible to accidents and
mistakes. Sleep deprivation can also lead to slower recovery times, prolonging the healing process after
an injury. By prioritizing sleep, teen athletes can significantly reduce the likelihood of sustaining injuries and enhance their overall well-being.</P>


<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">Establishing a Healthy Sleep Routine:</h3>
<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">1. Prioritize Consistency:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">
Consistency is key to establishing a healthy sleep routine. Aim to go to bed and wake up at the same time every day, even on weekends. This helps regulate your body’s internal clock and promotes better sleep quality.
</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">2. Create a Sleep-Friendly Environment:</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Ensure that your bedroom is conducive to sleep. Keep the room cool, dark, and quiet. Remove electronic devices and limit exposure to screens before bed, as the blue light emitted can disrupt sleep patterns. Consider using blackout curtains, earplugs, or white noise machines to optimize the sleeping
environment.</P>


<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">3. Wind Down Before Bed:</h3>

<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Establish a relaxing pre-sleep routine to signal your body that it’s time to unwind. Engage in activities such as reading, listening to calming music, taking a warm bath, or practicing meditation. Avoid stimulating activities or consuming caffeine close to bedtime, as they can interfere with falling asleep.

</P>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">4. Exercise Regularly:</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">Regular physical activity can improve sleep quality, but it’s important to time your workouts appropriately. Exercising too close to bedtime may make it difficult to fall asleep. Aim to finish intense workouts at least a few hours before bedtime to allow your body to wind down.
</p>
<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">5. Monitor Nutrition and Hydration:</h3>


<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;">
Maintaining a balanced diet and staying hydrated throughout the day can positively impact sleep. Avoid
heavy meals before bed, as digestion can disrupt sleep. Additionally, limit caffeine intake, especially in the evening, as it can interfere with falling asleep.
</p>

<h3 style="color:white;font-family: Verdana, Arial, Helvetica, sans-serif;font-size:25pt;line-height:35pt;">Conclusion:</h3>
<p style="color:white;font-size:26pt;line-height:35pt;font-family: Verdana, Arial, Helvetica, sans-serif;"> 
Sleep is a vital component of optimal athletic performance and injury prevention for teen athletes. By
understanding the detriments of poor sleep and implementing healthy sleep routines, young athletes can unlock their full potential, reduce the risk of injuries, and enhance their overall well-being. Prioritizing adequate sleep is not only crucial for athletic success but also for maintaining a healthy and balanced lifestyle.</P>
</div>`; ///neweweewewwewe

const CoachCorner = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [programDetails, setProgramDetails] = useState(null);
  const [focusArea, setFocusArea] = useState([]);
  const [movementList, setMovementList] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousPoint, setPreviousPoints] = useState(0);
  const [workoutButtom, updateButtom] = useState('');
  const [programType] = useState(props.route.params.section);
  const [html, setHtml] = useState(null);
  const [height, setHeight] = useState(0);
  var checkProgramType = () => {
    ///alert(props.route.params.section);
    if (programType === 'Mobility') {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    // if (vimeoRef) {
    //   console.log('vimeoRef.curren==', vimeoRef);
    // }

    getProgramDetails();
  }, []);
  console.log('props.route.params===>', props.route.params);
  const getProgramDetails = async () => {
    setLoading(true);
    if (checkProgramType()) {
      getMobilityDetails();
    } else {
      getCategorizeData();
    }
  };
  const getMobilityDetails = async () => {
    await firestore()
      .collection('Workouts')
      .where('sport_id', '==', props?.route?.params?.sport_id)
      .where('day', '==', props?.route?.params?.category_id)
      //.where('type', '==', props?.route?.params?.category_id)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('coachcoanerpagedata=>', doc._data);
          setProgramDetails(doc._data);
          setFocusArea(doc._data?.focusArea ? doc._data?.focusArea : []);
          if (doc._data?.movementsList) {
            setMovementList(
              doc._data?.movementsList ? doc._data?.movementsList : [],
            );
          } else {
            setMovementList(
              doc._data?.movementList ? doc._data?.movementList : [],
            );
          }
        });
      });
  };
  const getCategorizeData = async () => {
    console.log(
      ' props?.route?.params?.category_id=>',
      props?.route?.params?.category_id,
    );
    if (props?.route?.params?.title) {
      await firestore()
        .collection('UnStoppableCategoryData')
        .where('category', '==', props?.route?.params?.category_id)
        .where('title', '==', props?.route?.params?.title)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log('getCategorizeData.doc._data=>', doc._data.title);
            setProgramDetails(doc._data);
            if (doc._data?.html) {
              setHtml(doc._data?.html.toString());
            }

            setFocusArea(doc._data?.focusArea ? doc._data?.focusArea : []);
            setMovementList(
              doc._data?.movementsList ? doc._data?.movementsList : [],
            );
          });
        });
    } else {
      await firestore()
        .collection('UnStoppableCategoryData')
        .where('category', '==', props?.route?.params?.category_id)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log('getCategorizeData.doc._data=>', doc._data.title);
            setProgramDetails(doc._data);
            if (doc._data?.html) {
              setHtml(doc._data?.html.toString());
            }
            setHeight(doc._data?.height);
            setFocusArea(doc._data?.focusArea ? doc._data?.focusArea : []);
            setMovementList(
              doc._data?.movementsList ? doc._data?.movementsList : [],
            );
          });
        });
    }
  };

  useEffect(() => {
    getFavStatus();
    getPreviousPoints();
    isWorkoutExists(false);
  }, []);

  const getFavStatus = async () => {
    await firestore()
      .collection('SavedPrograms')
      .where(
        'id',
        '==',
        checkProgramType()
          ? props?.route?.params?.doc_id
          : props?.route?.params?.category_id,
      )
      .where('user_id', '==', global?.Uid)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          setSaved(true);
        });

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };
  const saveProgram = async () => {
    setLoading(true);
    console.log('programDetails=', props?.route?.params?.category_id);
    await firestore()
      .collection('SavedPrograms')
      .add({
        saved: true,
        id: checkProgramType()
          ? props?.route?.params.doc_id
          : programDetails?.category,
        user_id: global?.Uid,
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          setSaved(true);
        }, 1000);
      })
      .catch(e => {
        console.log('saveProgram.catch=', e);
      });
  };
  const deleteProgram = async () => {
    let doc_id = '';
    setLoading(true);
    await firestore()
      .collection('SavedPrograms')
      .where(
        'id',
        '==',
        checkProgramType()
          ? props?.route?.params.doc_id
          : props?.route?.params?.category_id,
      )
      .where('user_id', '==', global?.Uid)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc_id = doc.id;
        });
      });
    setTimeout(() => {
      remove(doc_id);
    }, 300);
  };
  const remove = async id => {
    console.log('deleteProgram=', id);
    await firestore()
      .collection('SavedPrograms')
      .doc(id)
      .delete()
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          setSaved(false);
        }, 1000);
      });
  };
  const getPreviousPoints = async () => {
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          setPreviousPoints(querySnapshot._data.points);
        }
      });
  };
  const updatePoints = async () => {
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .update({
        points: parseInt(previousPoint + parseInt(programDetails?.points)),
      })
      .then(() => {
        setTimeout(() => {
          alert(`Great work you've earned ${programDetails?.points} points`);
        });
        console.log('updated');
      }, 300)
      .catch(e => {
        console.log('updated.error', e);
      });
  };
  const isWorkoutExists = async onComplete => {
    await firestore()
      .collection('CompletedWorkout')
      .doc(global?.Uid)
      .collection('workouts')
      .where(
        'id',
        '==',
        checkProgramType()
          ? props?.route?.params?.doc_id
          : props?.route?.params?.category_id,
      )
      .where('timestamp', '==', moment(new Date()).format('MM/DD/YY'))
      .onSnapshot(snapshot => {
        if (snapshot.size != 0) {
          if (!onComplete)
            updateButtom(
              `${
                strings.completed + ' ' + moment(new Date()).format('MM/DD/YY')
              }  `,
            );
        } else {
          console.log('not');
          if (onComplete) completeWorkout();
          else updateButtom('');
        }
      });
  };
  const completeWorkout = async () => {
    // incrementInDays();
    // console.log('updateWorkoutDayInUserProfile.success', selectedSports);
    // return;

    let payload = {
      isCompleted: true,
      id: checkProgramType()
        ? props?.route?.params?.doc_id
        : programDetails?.category,
      user_id: global?.Uid,
      timestamp: moment(new Date()).format('MM/DD/YY'),
      time: moment().format(),
      sport_id: props?.route?.params?.sport_id,
    };
    props?.route?.params?.sport_id === undefined && delete payload.sport_id;
    console.log('completeWorkout=>', payload);
    // return;
    setLoading(true);
    await firestore()
      .collection('CompletedWorkout')
      .doc(global?.Uid)
      .collection('workouts')
      .add(payload)
      .then(() => {
        console.log('Workout completed');
        if (checkProgramType()) incrementInDays();
        updateWorkoutDayInUserProfile();
        setTimeout(() => {
          updatePoints();
          isWorkoutExists(true);
          setLoading(false);
          updateButtom(
            `${
              strings.completed + ' ' + moment(new Date()).format('MM/DD/YY')
            }  `,
          );
        }, 1000);
      })
      .catch(e => {
        setLoading(false);
        console.log('completeWorkout.catch=', e);
      });
  };
  useEffect(() => {
    getSports();
  }, []);

  const getSports = async () => {
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          console.log('querySnapshot=', querySnapshot._data);
          if (typeof querySnapshot?._data.sport_name != 'undefined')
            selectedSports = querySnapshot?._data.sport_name;
          //  setSelectedSports(querySnapshot?._data.sport_name);
          console.log('sport_name=', querySnapshot?._data.sport_name);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  const incrementInDays = () => {
    let index = selectedSports.findIndex(
      obj => obj.id == props?.route?.params?.sport_id,
    );
    selectedSports[index].data.time = moment().unix();
    selectedSports[index].data.day = selectedSports[index].data.day + 1;
  };
  const updateWorkoutDayInUserProfile = async () => {
    // console.log('updateWorkoutDayInUserProfile.success', selectedSports);
    console.log('updateWorkoutDayInUserProfile==>', {
      // type: parseInt(props?.route?.params?.category_id) + 1,
      // workoutId: props?.route?.params?.doc_id,
      // time: moment().format(),
      sport_name: selectedSports,
    });

    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .update({
        // type: parseInt(props?.route?.params?.category_id) + 1,
        workoutId: props?.route?.params?.doc_id,
        sport_name: selectedSports,
        time: moment().format(),
      })
      .then(res => {
        console.log('updateWorkoutDayInUserProfile.success');
      })
      .catch(e => {
        console.log('updateWorkoutDayInUserProfile.catch', e);
        setLoading(false);
      });
  };
  const timeUpdate = data => {
    if (data?.isTrusted) {
      updatePoints();
      isWorkoutExists(true);
    }
  };
  const updateVideoDuration = async data => {
    console.log('videoCallbacks:', data);
    // if (data) {
    //   if (parseInt(data?.percent) < 10) {
    //     setVideoDuration(data?.duration.toFixed(2));
    //   }
    // }
  };
  const videoCallbacks = {
    timeupdate: data => updateVideoDuration(data),
    play: data => console.log('play: ', data),
    pause: data => console.log('pause: ', data),
    fullscreenchange: data => console.log('fullscreenchange: ', data),
    ended: data => timeUpdate(data),
    controlschange: data => console.log('controlschange: ', data),
    emptied: data => console.log('emptied: ', data),
    onloadeddata: data => console.log('onloadmetadata=', data),
  };

  const DescriptionView = () => {
    return (
      <View style={{paddingHorizontal: 0}}>
        <Text style={[style.h4, style.opacity]}>
          {programDetails && programDetails?.intro}
        </Text>
        {focusArea.length > 0 && (
          <DescriptionComponent
            listKey={Math.random().toString(36).substring(2, 7).toString()}
            data={focusArea}></DescriptionComponent>
        )}
        <Text style={[style.h4, style.opacity]}>
          {programDetails && programDetails?.movementSentence}
        </Text>
        {movementList.length > 0 ? (
          <Text style={[style.h4, style.opacity]}>
            {programDetails && programDetails?.movementsTitle}
          </Text>
        ) : null}
        <DescriptionComponent
          listKey={Math.random().toString(36).substring(2, 7).toString()}
          data={movementList}></DescriptionComponent>
      </View>
    );
  };
  const ListHeaderComponent = () => {
    return (
      <View style={{flex: 1}}>
        <Vimeo
          // ref={vimeoRef}
          style={{height: 333, width: '100%', flex: 1}}
          videoId={extractVideoId(programDetails?.video_url)}
          //   params={'api=1&autoplay=0'}
          handlers={videoCallbacks}
          //getVimeoPlayer={getVimeoPlayer}
        />

        <Text style={style.h1}>
          {programDetails?.title == ''
            ? programDetails?.subTitle
            : programDetails?.title}
          {programDetails?.title == '' && (
            <Text style={style.h2}>{` | ${programDetails?.subTitle}`}</Text>
          )}
        </Text>
        <View style={style.main_cc}>
          {/* {programType=="Mobility" ?  */}
          {programType == 'CoachCorner' && (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={style.mobility_head}>
                {/* {programType == 'CoachCorner' ? strings.time : strings.rpe} */}
                {programType == 'CoachCorner' ? strings.time : null}
              </Text>
              <Text style={style.mobility_title}>
                {/* {programType == 'CoachCorner'
           ? `${programDetails?.duration} min`
           : typeof programDetails?.rpe != 'undefined'
           ? `+ ${programDetails?.rpe}`
           : 0} */}
                {programType == 'CoachCorner'
                  ? `${programDetails?.duration} min`
                  : ''}
              </Text>
            </View>
          )}

          {/* :
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={images.inline} style={style.img_15_15}></Image>
        <Text style={style.h3}>
          {videoDuration}
         
        </Text>
      </View> */}

          {/* {programType=="Mobility" ?   */}
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={style.mobility_head}>Points</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={style.mobility_title}>
                {`+ ${programDetails?.points}`}
              </Text>
              <Image source={images.star} style={style.img_15_15}></Image>
            </View>
          </View>
          {/* //  :
      // <View style={{flexDirection: 'row', alignItems: 'center'}}>
      //   <Image source={images.star} style={style.img_15_15}></Image>
      //   <Text style={style.h3}>{`+ ${programDetails?.points}pts`}</Text>
      // </View> */}

          <Pressable onPress={() => (saved ? deleteProgram() : saveProgram())}>
            <Image
              key={saved}
              source={saved ? images.bookmark : images.save}
              style={style.img_25_25}></Image>
          </Pressable>
        </View>

        {html ? (
          <WebView
            style={{backgroundColor: '#000'}}
            containerStyle={{
              flex: 1,
              height: windowHeight() * 2.9,
              backgroundColor: 'black',
            }}
            originWhitelist={['*']}
            source={{html: html}}
          />
        ) : (
          <DescriptionView></DescriptionView>
        )}
        {/* <DescriptionView></DescriptionView> */}

        {/* <View style={style.partition}></View> */}
      </View>
    );
  };
  const ListFooterComponent = () => {
    return (
      <View style={{marginBottom: 20, alignItems: 'center'}}>
        {/* {programType == 'Mobility' ? ( */}
        <PrimaryButton
          heading={workoutButtom == '' ? strings.mark_complete : workoutButtom}
          onClick={() => {
            workoutButtom == '' ? completeWorkout() : {};
          }}></PrimaryButton>
        {workoutButtom != '' && (
          <Text
            style={[style.mobility_title, {padding: 20, textAlign: 'center'}]}>
            Great work! Take tomorrow off and come back to see your next workout
            in 48 hours.
          </Text>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <SecondaryHeader
        onClick={() => navigation.navigate('Home')}
        heading={props?.route?.params?.section}
      />
      <Loader isLoading={loading}></Loader>

      <FlatList
        data={[1]}
        renderItem={null}
        // ListFooterComponent={ListFooterComponent()}
        ListHeaderComponent={ListHeaderComponent()}></FlatList>
      {ListFooterComponent()}
    </SafeAreaView>
  );
};
export default CoachCorner;
