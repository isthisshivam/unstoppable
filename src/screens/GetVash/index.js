import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';
import {
  dW,
  dH,
  windowHeight,
  windowWidth,
} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import strings from '../../constants/strings';
const GetVash = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View style={style.flex}>
        <ImageBackground
          resizeMode="cover"
          style={style.imageBack}
          source={images.football}>
          <ImageBackground
            resizeMode="cover"
            style={style.imageBack}
            source={images.back}>
            <View style={style.image}>
              <Text style={style.heading}>{strings.Unstoppable}</Text>
              <Text style={style.athe}>Athletes</Text>

              <Text style={style.explore}>{strings.explore}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={style.create_btn}>
                <Text style={style.create_heading}>{strings.createacc}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={style.login_btn}>
                <Text style={style.login_heading}>{strings.login}</Text>
              </TouchableOpacity>
              <Text
                onPress={() => navigation.navigate('EnterCode')}
                style={style.code}>
                {strings.ihaveacode}
              </Text>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};
export default GetVash;
