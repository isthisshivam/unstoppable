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
const SecondaryHeader = ({heading, onClick, ex_style}) => {
  const style = useStyle();
  return (
    <View style={style.outercc}>
      <TouchableOpacity onPress={onClick}>
        <Image style={style.outer_img} source={images.downarrow}></Image>
      </TouchableOpacity>
      <Text style={style.outer_h1}>{heading}</Text>
    </View>
  );
};
export default SecondaryHeader;
