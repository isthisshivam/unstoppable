import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import useStyle from '../constants/style';
import colors from '../constants/colors';

const ImagePickerBottomSheet = props => {
  const globalStyles = useStyle();
  const {reference, openCamera, openFiles} = props;
  return (
    <RBSheet
      ref={reference}
      height={200}
      closeOnPressMask={true}
      closeOnDragDown={true}
      customStyles={{
        container: globalStyles.BottomSheet_container,
        draggableIcon: {
          backgroundColor: colors.black,
        },
      }}>
      <View style={globalStyles.parent_contaier_bottomsheet}>
        <TouchableOpacity
          style={globalStyles.bottomSheet_btn}
          onPress={() => openCamera()}>
          <Text style={[globalStyles.btn_heading_black]}>{`Open Camera`}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openFiles()}
          style={globalStyles.bottomSheet_btn_margin}>
          <Text
            style={[
              globalStyles.btn_heading_black,
            ]}>{`Choose From Gallery`}</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default ImagePickerBottomSheet;
