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
import {dW, dH, windowHeight, windowWidth} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
import useStyle from '../constants/style';
import LinearGradient from 'react-native-linear-gradient';
const SecButton = ({heading, onClick, ex_style}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity onPress={onClick} style={styles.SecButton}>
      <Text style={styles.headingd}>{heading}</Text>
    </TouchableOpacity>
  );
};
export default SecButton;
