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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getStoreData,
  isEmail,
  isEmpty,
  showToastMessage,
  setStoreData,
  authLogs,
} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import UserTypeLane from '../../components/UserTypeLane';
import PrimaryHeader from '../../components/PrimaryHeader';
import LinearGradientButton from '../../components/GradientButton';
import firebase from '@react-native-firebase/app';
import Loader from '../../components/Loader';
import strings from '../../constants/strings';
const ForgotPassword = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  function validate() {
    var message = '';
    if (isEmpty(email)) {
      message = 'Please enter email!';
    } else if (!isEmail(email)) {
      message = 'Please enter valid email!';
    }

    if (message == '') {
      return true;
    }
    showToastMessage(message);
    return false;
  }
  const forgotPassword = async () => {
    if (validate()) {
      setLoading(true);
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(res => {
          setLoading(false);
          showToastMessage('Email has been sent to your registered email');
          console.log('User forgot-updates successfully!', res);
          setEmail('');
          setTimeout(() => {
            navigation.navigate('Login');
          }, 500);
        })
        .catch(error => {
          setLoading(false);
          showToastMessage(authLogs(error.code));
        });
    }
  };
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <KeyboardAwareScrollView style={style.padding_20}>
        <Text style={style.heading}>{strings.forgotPassword}</Text>
        <Loader isLoading={loading}></Loader>
        <TextInput
          placeholderTextColor={colors.gray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Email"
          style={style.input}></TextInput>

        <LinearGradientButton
          heading={strings.NEXT}
          onClick={forgotPassword}></LinearGradientButton>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
