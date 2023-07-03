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
import {dW, dH, windowHeight} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
const UserTypeLane = ({heading, onClick, ex_style}) => {
  const style = useStyle();
  return (
    <TouchableOpacity
      onPress={onClick}
      style={ex_style ? [style.black, ex_style] : style.black}>
      <Text style={style.heading}>{heading}</Text>
    </TouchableOpacity>
  );
};
export default UserTypeLane;
