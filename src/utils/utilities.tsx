import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import colors from '../constants/colors';
import moment from 'moment/moment';
export const navigateToClass = (screenName, params) => {
  const {navigate} = useNavigation();
  navigate(screenName, params);
};
export const convertMilliSecondsIntoLegibleString = milliSecondsIn => {
  var secsIn = milliSecondsIn / 1000;
  var milliSecs = milliSecondsIn % 1000;

  var hours = secsIn / 3600,
    remainder = secsIn % 3600,
    minutes = remainder / 60,
    seconds = remainder % 60;

  return (
    parseInt(hours.toFixed(2)) + 'h:' + parseInt(minutes.toFixed(2)) + 'min'
  );
};
export const is24HourPassed = lastExecutionTime => {
  if (!lastExecutionTime) {
    console.log('Please provide last execution time first');
    return;
  }

  let nextDay = moment(moment.unix(lastExecutionTime).format('MM/DD/YYYY'))
    .add(1, 'day')
    .format(); // calculate 24 hours next to last access
  let currentTime = moment().utc().format(); //current time
  let canExecuteNow = moment(currentTime).isSameOrAfter(nextDay);
  console.log({lastExecutionTime, nextDay, currentTime, canExecuteNow});
  return canExecuteNow;
};
export const inflateSnackBar = error => {
  return Snackbar.show({
    text: error,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: colors.red,
    fontFamily: 'Montserrat-Bold',
  });
};
export const secondsToHHMMSS = seconds => {
  var h = Math.floor(seconds / (60 * 60));

  var divisor_for_minutes = seconds % (60 * 60);
  var m = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var s = Math.ceil(divisor_for_seconds);

  return `${h ? `${h}:` : ''}${m ? `${m}:${s}` : `${s}s`}`;
  //return new Date(seconds * 1000).toISOString().substring(11, 16);
  const HH = `${Math.floor(seconds / 3600)}`.padStart(2, '0');
  const MM = `${Math.floor(seconds / 60) % 60}`.padStart(2, '0');
  const SS = `${Math.floor(seconds % 60)}`.padStart(2, '0');
  return [HH, MM, SS].join(':');
};
export const navigateTo = (screenName, params, navigation) => {
  navigation.navigate(screenName, params);
};
export const extractVideoId = url => {
  if (url) {
    let data = url.split('/');
    if (data) {
      // console.log('extractVideoId=', data[data.length - 1]);
      return data[data.length - 1];
    }
  }
};
export const validateEmail = text => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text);
};
export const validateNumber = num => {
  const reg = /^[0-9\b]+$/;
  return reg.test(num);
};
export const authLogs = code => {
  let errorMessage = '';
  console.log('authError...', code);
  switch (code) {
    case 'auth/wrong-password':
      errorMessage = 'Your password is wrong.';
      break;
    case 'auth/too-many-requests':
      errorMessage = 'Your attemp too many time please try after sometime';
      break;
    case 'auth/user-not-found':
      errorMessage = "User with this email doesn't exist.";
      break;

    default:
      errorMessage = 'Something went wrong please try after sometime.';
  }

  return errorMessage;
};
export const showToastMessage = message => {
  setTimeout(() => {
    Toast.show(message, Toast.SHORT);
  }, 100);
};

export const resetStack = (route, param, navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: route, params: param}],
    }),
  );
};
export const requestAndroidCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'Spacer needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('Camera granted==', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
      return true;
    } else {
      console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const track = async (name, payload) => {
  console.log(JSON.stringify(global.branchIo));
  if (global.branchIo) {
    global.branchIo.logEvent(name, {
      customData: payload,
    });
  } else {
    console.log('track not initalize yet...');
  }
};
export const SaveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('ERROR======', e);
  }
};
export const hasWhiteSpace = async s => {
  //return /\s/g.test(s);
  return s.indexOf(' ') >= 0;
};
export const isEmpty = item_to_check => {
  if (
    item_to_check == null ||
    item_to_check == undefined ||
    item_to_check == '' ||
    item_to_check == 'null'
  )
    return true;
  else return false;
};
export const isEmptyString = item_to_check => {
  if (item_to_check == '') return true;
  else return false;
};
export const isEmail = email => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  );

  return pattern.test(email);
};
export const getStoreData = async Key_to_be_fetched => {
  try {
    const value = await AsyncStorage.getItem(Key_to_be_fetched);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('ERROR IN FETCHING ASYNC STORAGE DATA');
    return null;
  }
};

export const setStoreData = async (Key_to_be_paired, data_to_save) => {
  try {
    console.log(
      'STORING DATA',
      Key_to_be_paired,
      'data_to_save=',
      data_to_save,
    );
    const value = await AsyncStorage.setItem(
      Key_to_be_paired,
      JSON.stringify(data_to_save),
    );
  } catch (e) {
    console.log('ERROR WHILE STORING  DATA', e);
  }
};

export const removeStoreData = async Key_to_be_removed => {
  try {
    await AsyncStorage.removeItem(Key_to_be_removed);
  } catch (e) {
    console.log('ERROR WHILE REMOVING  DATA', e);
  }
};
