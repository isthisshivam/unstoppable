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
import {useNavigation} from '@react-navigation/native';
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
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import UserTypeLane from '../../components/UserTypeLane';
import PrimaryHeader from '../../components/PrimaryHeader';
import LinearGradientButton from '../../components/GradientButton';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import strings from '../../constants/strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Login = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType] = useState(props.route.params);
  const [existiingId, setExistingId] = useState('');

  useEffect(() => {
    if (typeof userType != 'undefined' && typeof userType != 'string') {
      setUserEmail();
    }
  }, []);

  const setUserEmail = async () => {
    setEmail(userType._data.email);
    setExistingId(userType.id);
  };

  function validate() {
    console.log('dataType', existiingId);
    var message = '';
    if (isEmpty(email)) {
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
  const login = async () => {
    if (validate()) {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(useinfo => {
          pullUserPersonalInfo(useinfo?.user?.uid);
          console.log(useinfo);
          console.log('User logged-in successfully!');
        })
        .catch(error => {
          setLoading(false);
          showToastMessage(authLogs(error.code));
        });
    }
  };
  const pullUserPersonalInfo = async id => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(id)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          global.Uid = id;
          saveUserInfo(querySnapshot?._data);
        }
        setLoading(false);
      });
  };
  const saveUserInfo = async useinfo => {
    if (existiingId == '' && useinfo?.user_type != props?.route?.params) {
      showToastMessage('Selected role is incorrect!');
    } else {
      await setStoreData('LOGGEDIN_USER', {userinfo: useinfo, uid: global.Uid});
      global.UserInfo = {userinfo: useinfo, uid: global.Uid};
      global.UserType = useinfo.user_type;
      setLoading(false);
      setEmail('');
      setPassword('');
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <KeyboardAwareScrollView style={[style.padding_20]}>
        <Text style={style.heading}>Welcome | Login</Text>
        <Loader isLoading={loading}></Loader>

        {existiingId == '' ? (
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={colors.gray}
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
          heading={strings.SIGNIN}
          onClick={login}></LinearGradientButton>
        <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={style.forgot_pass}>
          {strings.forgotPassword}
        </Text>
      </KeyboardAwareScrollView>

      <Text style={style.dont}>
        {strings.donthave}
        <Text
          onPress={() =>
            navigation.navigate('WhoisLogging', {type: 'register'})
          }
          style={style.register}>
          {strings.createacconce}
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;
