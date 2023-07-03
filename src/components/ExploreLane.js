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
import colors from '../constants/colors';
import images from '../assests/images';
import useStyle from '../constants/style';
import LinearGradient from 'react-native-linear-gradient';
import {dW, dH} from '../utils/dynamicHeightWidth';
const ExploreLane = ({heading, onClick, ex_style, item, icon}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        marginTop: 14,
        height: 45,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <ImageBackground
        resizeMode="contain"
        source={icon}
        style={{
          height: 50,
          width: 50,
          marginLeft: 15,
        }}></ImageBackground>
      <Text
        style={{
          textAlign: 'left',
          marginLeft: 10,
          fontFamily: 'Montserrat-Regular',
          color: colors.white,
          fontSize: dW(16),
          letterSpacing: 0,
        }}>
        {heading}
      </Text>
    </TouchableOpacity>
  );
};
export default ExploreLane;
