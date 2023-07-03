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
const PrimaryHeader = ({heading, onClick, ex_style}) => {
  const styles = useStyle();
  return (
    <View style={styles.PrimaryHeader_C}>
      <TouchableOpacity
        onPress={() => onClick && onClick()}
        style={styles.PrimaryHeader_Click}>
        <Image
          resizeMode="contain"
          style={styles.img_22_22}
          source={images.backwhite}></Image>
      </TouchableOpacity>
      <Image
        resizeMode="contain"
        style={styles.img_2_221}
        source={images.applogo}></Image>
      <View style={styles.img_22_22} />
    </View>
  );
};
export default PrimaryHeader;
