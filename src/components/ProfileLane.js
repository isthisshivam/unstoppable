import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import images from '../assests/images';
import {dW, dH, windowHeight} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
import useStyle from '../constants/style';
const ProfileLane = ({heading, onClick, ex_style, icon}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity onPress={onClick} style={styles.profile_v}>
      <Image style={styles.pro_img} source={icon}></Image>
      <Text style={styles.pro_h1}>{heading}</Text>
    </TouchableOpacity>
  );
};
export default ProfileLane;
