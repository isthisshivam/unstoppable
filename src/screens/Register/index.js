import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TextInput,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {StackActions, useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {
  getStoreData,
  isEmail,
  isEmpty,
  showToastMessage,
  setStoreData,
  authLogs,
  inflateSnackBar,
} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import LinearGradientButton from '../../components/GradientButton';
import PrimaryHeader from '../../components/PrimaryHeader';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import UserTypeLane from '../../components/UserTypeLane';
import strings from '../../constants/strings';
import random from 'random-string-alphanumeric-generator';
import uppercase from 'random-string-alphanumeric-generator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
const Register = props => {
  console.log('props==>', props.route.params);
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType] = useState(props.route.params);
  const [code, setCode] = useState('');
  const [existiingId, setExistingId] = useState('');
  const [sports, setSports] = useState([]);
  const [coachId, setCoachId] = useState([]);
  const [age, setAge] = useState('');

  useEffect(() => {
    getSports();
    if (typeof userType == 'string') {
      if (userType == strings.coach)
        setCode(random.randomAlphanumeric(15, uppercase));
    } else {
      // setUserData(userType);
      setUserEmail();
    }
  }, []);

  const setUserEmail = async () => {
    setEmail(userType._data.email);
    setFName(userType._data.first_name);
    setLName(userType._data.last_name);
    setExistingId(userType.id);
    setCoachId(userType._data.coachId);
    setAge(userType._data.age);
  };

  function validate() {
    var message = '';
    if (isEmpty(fName)) {
      message = 'Please enter First name!';
    } else if (isEmpty(lName)) {
      message = 'Please enter Last name!';
    } else if (isEmpty(email)) {
      message = 'Please enter email!';
    } else if (!isEmail(email)) {
      message = 'Please enter valid email!';
    } else if (isEmpty(password)) {
      message = 'Please enter password';
    } else if (password.length < 8) {
      message = 'Please enter at least an eight digit password!';
    }

    if (message == '') {
      return true;
    }
    inflateSnackBar(message);
    return false;
  }

  const register = async () => {
    console.log('dataexsting', existiingId);
    if (validate()) {
      setLoading(true);
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(useinfo => {
          console.log('User registered successfully!', useinfo);
          setLoading(false);
          pushUserPersonalInfo(useinfo);
        })
        .catch(error => {
          setLoading(false);
          showToastMessage(authLogs(error.code));
        });
    }
  };
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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  const pushUserPersonalInfo = async useinfo => {
    var workoutId = null;
    setLoading(true);
    // await firestore()
    //   .collection('Workouts')
    //   .where('type', '==', 1)
    //   .onSnapshot(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       workoutId = doc.id;
    //       console.log('getTodayMobilityeee?._data===', workoutId);
    //     });
    //   });
    console.log('pushUserPersonalInfoonregicter=>', {
      points: 0,
      first_name: fName,
      last_name: lName,
      email: email.toLowerCase(),
      password: password,
      displayName: `${fName} ${lName}`,
      user_type: existiingId == '' ? userType : strings.athletew,
      code: code,
      age: age,
      profile:
        'http://52.206.87.221/backend/web/uploads/user_logo/my_default_picture.png',
      coachId: coachId,
      //type: 1,
      // type: sports,
      // sport_name: sports,
      //workoutId: workoutId ? workoutId : '',
      created_at: moment().unix(),
    });

    await firestore()
      .collection('Users')
      .doc(useinfo?.user?.uid)
      .set({
        points: 0,
        first_name: fName,
        last_name: lName,
        email: email.toLowerCase(),
        password: password,
        displayName: `${fName} ${lName}`,
        user_type: existiingId == '' ? userType : strings.athletew,
        code: code,
        age: age,
        sessionDuration: 0,
        profile:
          'http://52.206.87.221/backend/web/uploads/user_logo/my_default_picture.png',
        coachId: coachId,
        //type: 1,
        //type: sports,
        //sport_name: sports,
        //workoutId: workoutId ? workoutId : '',
        created_at: moment().unix(),
      })
      .then(() => {
        setLoading(false);
        if (existiingId != '') {
          console.log('mannualUser....', existiingId);
          firestore().collection('Users').doc(existiingId).delete();
        }

        pullUserPersonalInfo(useinfo?.user?.uid);
      })
      .catch(e => {
        console.log('pushUserPersonalInfo.catch', e);
        setLoading(false);
      });
  };
  const pullUserPersonalInfo = async id => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then(querySnapshot => {
        setLoading(false);
        global.Uid = id;
        console.log('querySnapshot=', querySnapshot._data);
        saveUserInfo(querySnapshot._data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const saveUserInfo = async useinformation => {
    global.UserType = useinformation?.user_type;
    global.UserInfo = {
      userinfo: useinformation,
      uid: global.Uid,
    };

    await setStoreData('LOGGEDIN_USER', {
      userinfo: useinformation,
      uid: global.Uid,
    }).then(() => {
      navigation.navigate('WalkThrough', userType);
    });
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <Loader isLoading={loading}></Loader>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={150}
        style={style.padding_20}>
        <Text style={style.heading}>{`Create ${
          existiingId == '' ? userType : strings.athletew
        } Account`}</Text>
        <TextInput
          placeholderTextColor={colors.gray}
          value={fName}
          onChangeText={setFName}
          keyboardType="default"
          placeholder="First Name"
          style={style.input}></TextInput>
        <TextInput
          placeholderTextColor={colors.gray}
          value={lName}
          onChangeText={setLName}
          keyboardType="default"
          placeholder="Last Name"
          style={style.input}></TextInput>
        {existiingId == '' ? (
          <TextInput
            placeholderTextColor={colors.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Email"
            style={style.input}></TextInput>
        ) : (
          <TextInput
            value={email}
            enabled={false}
            //  onChangeText={setEmail}
            keyboardType="default"
            placeholder="Email"
            style={[
              style.input,
              {backgroundColor: colors.blackShade_s},
            ]}></TextInput>
        )}
        <TextInput
          placeholderTextColor={colors.gray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Password (min. 8 char)"
          style={style.input}></TextInput>
        <LinearGradientButton
          heading={strings.CREATE_ACC}
          onClick={register}></LinearGradientButton>
        <Text style={style.by}>
          {strings.by}
          <Text
            onPress={() => navigation.navigate('TermsAndCondition')}
            style={style.privacy}>
            {strings.by1}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Register;
