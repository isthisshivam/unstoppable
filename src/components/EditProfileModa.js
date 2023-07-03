import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Modal,
  Alert,
} from 'react-native';
import useStyle from '../constants/style';
import usePallete from '../assests/Pallete';
import colors from '../constants/colors';
import images from '../assests/images';
const EditProfileModal = ({
  canclePress,
  heading,
  isVisible,
  onMainClick,
  icon,
}) => {
  const style = useStyle();
  const renderList = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => [canclePress(), onMainClick()]}
          style={style.em_click}>
          <ImageBackground
            borderRadius={14}
            style={style.profile_img}
            source={images.profileb}>
            <Image style={style.img_10_10} source={icon}></Image>
          </ImageBackground>
          <Text style={[style.edit_ath]}>{heading}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // backgroundColor: 'red',
            height: 5,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
            ///alignSelf: 'flex-end',
          }}
          onPress={() => canclePress()}>
          <Image style={[style.em_img]} source={images.cross}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={style.modalContainerSmall}>{renderList()}</View>
    </Modal>
  );
};
export default EditProfileModal;
