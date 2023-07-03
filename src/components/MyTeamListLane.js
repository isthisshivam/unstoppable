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
const MyTeamListLane = ({heading, onClick, ex_style, item, onDotPress}) => {
  const styles = useStyle();
  return (
    <View style={styles.tl}>
      <View style={{flex: 0.9, alignItems: 'center', flexDirection: 'row'}}>
        <Image
          source={{uri: item?._data?.profile}}
          style={styles.tl_img}></Image>
        <Text style={styles.savan}>{item?._data?.first_name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => [console.log('datataa', item), onDotPress(item)]}
        style={styles.dot}>
        <Image source={images.menu} style={styles.menu}></Image>
      </TouchableOpacity>
    </View>
  );
};
export default MyTeamListLane;
