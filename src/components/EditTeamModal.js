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
const EditTeamModal = ({
  canclePress,
  onMessagePress,
  isVisible,
  onEditTeamPress,
  onRemoveMember,
  ath_name,
}) => {
  const style = useStyle();
  const renderList = () => {
    return (
      <>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
          }}
          onPress={canclePress}>
          <Image style={style.em_img} source={images.cross}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onEditTeamPress()}
          style={style.em_click}>
          <View style={style.clickview}>
            <Image style={style.clickviewimg} source={images.cwhite}></Image>
          </View>
          <Text style={style.edit_ath}>Edit Athlete Info</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onMessagePress()} style={style.sig}>
          <View style={style.sig1}>
            <Image style={style.clickviewimg} source={images.chatwhite}></Image>
          </View>
          <Text style={style.message}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onRemoveMember()}
          style={style.white_click}>
          <View style={style.white_v}>
            <Image style={style.clickviewimg} source={images.lwhite}></Image>
          </View>
          <Text style={style.savan}>{ath_name}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={style.modalContainer}>{renderList()}</View>
    </Modal>
  );
};
export default EditTeamModal;
