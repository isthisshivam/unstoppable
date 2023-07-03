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
import {useNavigation} from '@react-navigation/native';
const HeaderWithHeading = ({heading}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 65,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 40,
          width: 40,
          resizeMode: 'contain',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: 20,
            width: 20,
            resizeMode: 'contain',
            transform: [{rotate: '90deg'}],
          }}
          source={images.downarrow}></Image>
      </TouchableOpacity>
      <Text
        style={{
          marginRight: dW(10),
          textAlign: 'left',
          fontFamily: 'Montserrat-Bold',
          color: colors.white,
          fontSize: dW(16),
          letterSpacing: 0,
        }}>
        {heading}
      </Text>
      <View></View>
    </View>
  );
};
export default HeaderWithHeading;
