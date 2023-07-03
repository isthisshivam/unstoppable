import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import images from '../assests/images';
import colors from '../constants/colors';
import useStyle from '../constants/style';
const Messages = props => {
  const styles = useStyle();
  const {
    receiver_image,
    type,
    message,
    sender_id,
    created_at,
    sender_profile,
    receiver_id,
    image,
    mode,
    userId,
    side,
  } = props;
  console.log('message', message.message);
  if (side == 'left') {
    return (
      <View style={styles.left_msg_c}>
        <Image source={{uri: sender_profile}} style={styles.sender_img}></Image>
        <View style={styles.left_msg_c_c}>
          {/* <Text style={styles.left_msg_time}>{created_at}</Text> */}
          {type == 'text' && (
            <View>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {message}
              </Text>
            </View>
          )}

          {/* {type == 'image' && (
            <ImageBackground
              style={{height: 200, width: 200}}
              imageStyle={{borderRadius: 10}}
              resizeMode="cover"
              source={{uri: image?.uri}}></ImageBackground>
          )} */}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.right_msg_c}>
        <View style={styles.right_msg_c_c}>
          {type == 'text' && (
            <View style={styles.right_msg}>
              <Text
                style={{color: colors.white, fontFamily: 'Montserrat-Medium'}}>
                {message}
              </Text>
            </View>
          )}
          {/* <Text style={styles.right_msg_text}>{created_at}</Text> */}

          {/* {type == 'image' && image != '' && (
            <ImageBackground
              style={{height: 200, width: 200, margin: 5}}
              imageStyle={{borderRadius: 10}}
              resizeMode="cover"
              source={{uri: image?.uri}}></ImageBackground>
          )} */}
        </View>

        <Image source={{uri: sender_profile}} style={styles.sender_img}></Image>
      </View>
    );
  }
};

export default Messages;
