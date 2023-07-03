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
import usePallete from '../assests/Pallete';
import colors from '../constants/colors';
import images from '../assests/images/index';
const InBuildAppModal = ({
  canclePress,
  onMainClick,
  isVisible,
  heading,
  subheading,
  leftBtnHeading,
  rightBtnHeading,
}) => {
  const style = usePallete();
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={style.contane}>
        <Text style={style.logout}>{heading}</Text>
        <Text style={style.miss}>{subheading}</Text>
        <View style={style.visible}>
          <TouchableOpacity
            onPress={() => [onMainClick()]}
            style={style.logout_}>
            <Text style={[style.cancle, {color: colors.white}]}>
              {leftBtnHeading}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => canclePress()} style={style.invisi}>
            <Text style={style.cancle}>{rightBtnHeading}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default InBuildAppModal;
