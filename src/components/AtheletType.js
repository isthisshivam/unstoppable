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
import useStyle from '../../src/constants/style';
import {FlatList} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
const AtheleteType = ({heading, onClick, ex_style, data}) => {
  const style = useStyle();
  const [selected, setSelected] = useState(0);
  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          [setSelected(item.index), onClick()];
        }}
        style={style.ath_type}>
        {selected == item.index ? (
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={style.ath_type_backimg}
            source={images.atheback}>
            <Text style={style.ath_h1}>{item.item}</Text>
          </FastImage>
        ) : (
          <Text style={style.ath_h1}>{item.item}</Text>
        )}
      </TouchableOpacity>
    );
  };
  return <FlatList data={data} renderItem={renderItem}></FlatList>;
};
export default AtheleteType;
