import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import useStyle from '../constants/style';
import images from '../assests/images';
import {dW, dH, windowHeight} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
const ProgramsLane = ({heading, onClick, ex_style}) => {
  const style = useStyle();
  return (
    <View style={style.one}>
      <View style={style.teo}>
        <ImageBackground
          resizeMode="cover"
          source={images.manfoot}
          borderRadius={20}
          style={style.image}>
          <ImageBackground
            resizeMode="cover"
            borderRadius={20}
            style={style.image2}
            source={images.footbackfull}>
            <View style={style.flex_90}>
              <Text style={style.prog}>Baseball Program</Text>
              <View style={style.view}>
                <Image source={images.atom} style={style.img_10_10}></Image>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    </View>
  );
};
export default ProgramsLane;
