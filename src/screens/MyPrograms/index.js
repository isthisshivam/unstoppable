import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Animated,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import ProgramsLane from '../../components/ProgramsLane';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import BoxView from '../../components/BoxView';
import HeaderWithHeading from '../../components/HeaderWithHeading';
import strings from '../../constants/strings';
const MyPrograms = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <HeaderWithHeading heading={strings.programs}></HeaderWithHeading>
      <FlatList
        data={[1, 1]}
        renderItem={() => <ProgramsLane></ProgramsLane>}
        style={style.pallate}></FlatList>
    </SafeAreaView>
  );
};
export default MyPrograms;
