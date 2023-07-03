import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  Share,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import LinearGradientButton from '../../components/GradientButton';

import {getStoreData} from '../../Utils/utilities';
import {
  dW,
  dH,
  windowHeight,
  windowWidth,
} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {color} from 'react-native-reanimated';
import {TouchableHighlight} from 'react-native-gesture-handler';
const GetStarted = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <ImageBackground
        resizeMode="cover"
        style={style.imageBack}
        source={images.img_welcome}>
        {/* <ImageBackground
          resizeMode="cover"
          style={style.imageBack}
          source={images.back}>
          <View style={style.view}>
            <Image
              borderRadius={22}
              style={style.img_45_45}
              source={images.blueheart}></Image>
            <Text style={style.explore}>{strings.explore}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WhoisLogging', {type: 'register'})
              }
              style={style.create_btn}>
              <Text style={style.create_heading}>{strings.createacc}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WhoisLogging', {type: 'login'})
              }
              style={style.login_btn}>
              <Text style={style.login}>{strings.login}</Text>
            </TouchableOpacity>
            <Text
              onPress={() => navigation.navigate('EnterCode')}
              style={style.code}>
              {strings.ihaveacode}
            </Text>
          </View>
        </ImageBackground> */}

        <View style={{alignItems: 'center'}}>
          <Image
            style={{
              height: 200,
              width: 200,
              resizeMode: 'contain',
            }}
            source={images.applogo}></Image>
        </View>
        {/* <Text style={style.unsto}>{strings.Unstoppable}</Text>
            <Text style={style.athe}>{strings.Athletes}</Text> */}
        <View style={{flex: 1}}></View>
        <View style={style.view}>
          <Text style={style.text}>
            Explore programs, improve your skills, and prevent injury in any
            sport.
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('WhoisLogging', {type: 'register'})
            }
            style={style.started_btn}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
                paddingHorizontal: 30,
              }}>
              <View
                style={{
                  width: dW(20),
                  height: dH(20),
                  resizeMode: 'contain',
                }}></View>
              <Text style={style.started}>{strings.get_started}</Text>

              <Image
                source={images.arrow}
                style={{
                  width: dW(20),
                  height: dH(20),
                  resizeMode: 'contain',
                }}></Image>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('WhoisLogging', {type: 'login'})
            }>
            <Text style={style.login}>{strings.login}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default GetStarted;
