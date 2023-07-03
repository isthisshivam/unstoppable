import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import images from '../assests/images';
import {dW, dH, windowHeight, windowWidth} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
import useStyle from '../constants/style';
import LinearGradient from 'react-native-linear-gradient';
const PrimaryButton = ({heading, onClick, ex_style}) => {
  const styles = useStyle();
  return (
    <Pressable
      onPress={onClick}
      style={ex_style ? [styles.primary, ex_style] : styles.primary}>
      <Text style={styles.primar_h1}>{heading}</Text>
    </Pressable>
  );
};
export default PrimaryButton;
