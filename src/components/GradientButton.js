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
import LinearGradient from 'react-native-linear-gradient';
const LinearGradientButton = ({heading, onClick, ex_style}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        height: 45,
        width: '100%',
        borderRadius: 20,
        marginTop: 40,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#681FA1', '#FF9900']}
        style={styles.linearGradient}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            textAlign: 'center',
            color: colors.white,
            fontSize: dW(16),
            letterSpacing: 1,
          }}>
          {heading}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default LinearGradientButton;
