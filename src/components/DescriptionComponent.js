import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from '../constants/colors';
import images from '../assests/images';
import useStyle from '../screens/CoachCorner/style';

const DescriptionComponent = ({data, listKey}) => {
  console.log(
    'DescriptionComponent=>',
    Math.random().toString(36).substring(2, 7).toString(),
  );
  const style = useStyle();
  const renderListLane = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginLeft: 15,
        }}>
        <Text style={{fontSize: 3, color: colors.white}}>{'\u2B24'}</Text>
        <Text style={[style.h4_desc, style.opacity]}>{item}</Text>
      </View>
    );
  };
  return (
    <FlatList
      listKey={listKey}
      data={data}
      renderItem={renderListLane}></FlatList>
  );
};
export default DescriptionComponent;
