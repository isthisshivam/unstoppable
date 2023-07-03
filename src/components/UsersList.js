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
import useStyle from '../constants/style';
import {dW, dH, windowHeight} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
const UsersList = props => {
  const {onClick, item, isUser, onSelect, index} = props;
  console.log('UsersList=>', props);
  const style = useStyle();
  return (
    <TouchableOpacity onPress={() => onClick(item)} style={style.click}>
      <Image
        style={style.img__}
        source={{
          uri: isUser ? item?._data?.profile : item.data.profile,
        }}></Image>
      <View style={style.opac}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.list_head}>
            {isUser ? item?._data?.first_name : item?.data?.first_name}
          </Text>
          {item?._data?.isSelected ? (
            <Pressable
              onPress={() => onSelect(item, index)}
              style={style.list_dire}></Pressable>
          ) : (
            <Pressable
              onPress={() => onSelect(item, index)}
              style={style.list_dire1}></Pressable>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default UsersList;
