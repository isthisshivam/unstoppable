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
import moment from 'moment';
const MessagesList = props => {
  const {item, onClick} = props;
  return (
    <TouchableOpacity
      onPress={() => onClick(item)}
      style={{
        height: 90,
        backgroundColor: colors.blackShade_s,
        width: '100%',
        borderBottomColor: colors.white,
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
      }}>
      <Image
        style={{
          height: 45,
          width: 45,
          resizeMode: 'cover',
          borderRadius: 22,
        }}
        source={{
          uri:
            item?.sender_id == global?.Uid
              ? item.receiver_image
              : item.sender_profile,
        }}></Image>
      <View
        style={{
          backgroundColor: 'transparent',
          width: '83%',
          marginLeft: dW(10),
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              textAlign: 'left',
              fontFamily: 'Montserrat-SemiBold',
              color: colors.white,
              fontSize: dW(16),
              letterSpacing: 0,
            }}>
            {item?.sender_id == global?.Uid
              ? item.receiver_name
              : item?.sender_name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: 'Montserrat-Regular',
                color: colors.white,
                fontSize: dW(14),
                letterSpacing: 0,
                marginRight: 5,
              }}>
              {moment(item.created_at).format('dddd')}
            </Text>
            <Image
              style={{
                height: 12,
                width: 12,
                resizeMode: 'contain',
                transform: [{rotate: '270deg'}],
              }}
              source={images.downarrow}></Image>
          </View>
        </View>
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'left',
            fontFamily: 'Montserrat-Regular',
            color: colors.white,
            fontSize: dW(13),
            marginTop: 5,
          }}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default MessagesList;
