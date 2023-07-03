import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  StatusBar,
  AppState,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import strings from '../../constants/strings';
import {differenceInSeconds} from 'date-fns';
let appStartTime = new Date();
const Splash = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  const getUserInfo = async () => {
    await getStoreData('LOGGEDIN_USER').then(userInfo => {
      console.log('LOGGEDIN_USER=', userInfo);
      if (userInfo) {
        global.Uid = userInfo?.uid;
        global.UserInfo = userInfo;
        global.UserType = userInfo?.userinfo?.user_type;
        setTimeout(navigateToHome, 1000);
      } else {
        setTimeout(navigateToMain, 1000);
      }
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  function navigateToMain() {
    navigation.reset({
      index: 0,
      routes: [{name: 'GetStarted'}],
    });
  }
  function navigateToHome() {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <ImageBackground
        resizeMode="cover"
        style={style.imageBack}
        source={images.man}>
        <ImageBackground
          resizeMode="cover"
          style={style.imageBack}
          source={images.back}>
          <View style={style.view}>
            <Image
              style={{
                height: 300,
                width: 300,
                resizeMode: 'contain',
                marginTop: dH(350),
              }}
              source={images.applogo}></Image>
            {/* <Text style={style.unsto}>{strings.Unstoppable}</Text>
            <Text style={style.athe}>{strings.Athletes}</Text> */}
          </View>
        </ImageBackground>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Splash;
