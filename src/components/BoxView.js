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
import images from '../assests/images';
import {dW, dH, windowHeight} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
import useStyle from '../constants/style';
const BoxView = ({heading, onClick, ex_style, icon}) => {
  const style = useStyle();
  return (
    <TouchableOpacity onPress={onClick} style={style.boxview}>
      <Image
        source={icon}
        style={{height: 35, width: 35, resizeMode: 'contain'}}></Image>
      <Text style={style.box_heading}>{heading}</Text>
    </TouchableOpacity>
  );
};
export default BoxView;
