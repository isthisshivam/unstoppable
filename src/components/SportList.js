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
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const SportsList = ({
  heading,
  onClick,
  ex_style,
  item,
  data,
  selectedSports,
}) => {
  console.log('SportsList=>', item.item.data.uri);
  const styles = useStyle();
  return (
    <Pressable
      onPress={() => [
        onClick(item),
        // console.log(
        //   'checking=>',
        //   selectedSports.some(data => data.name == item.item.data.name),
        // ),
      ]}
      style={styles.SportList_cc}>
      <ImageBackground
        borderRadius={5}
        source={{uri: item?.item?.data?.uri}}
        style={styles.sl_img}>
        <ImageBackground
          borderRadius={5}
          // source={
          //   data.length > 0 &&
          //   selectedSports.some(data => data.name == item.item.data.name)
          //     ? images.option
          //     : images.footBack
          // }
          source={item.item.data.isSelected ? images.option : images.footBack}
          style={styles.sl_img}>
          <Text style={styles.item_heading}>{item.item.data.name}</Text>
        </ImageBackground>
      </ImageBackground>
    </Pressable>
  );
};
export default SportsList;
