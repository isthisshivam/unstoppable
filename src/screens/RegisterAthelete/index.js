import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import UserTypeLane from '../../components/UserTypeLane';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradientButton from '../../components/GradientButton';
import AtheleteType from '../../components/AtheletType';
import PrimaryHeader from '../../components/PrimaryHeader';
import strings from '../../constants/strings';
const data = [
  'Athelete #1',
  'Athelete #2',
  'Athelete #3',
  'Athelete #4',
  'Athelete #5',
];
const RegisterAthelete = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  const ListHeaderComponent = () => {
    return (
      <View style={style.padding}>
        <Text style={style.how}>{strings.howmany}</Text>
        <Text style={style.you}>{strings.regsiter}</Text>
        <AtheleteType
          data={data}
          onClick={() => console.log('clicked===')}></AtheleteType>

        <View style={{marginTop: dH(120)}}>
          <PrimaryButton
            heading={'NEXT'}
            onClick={() =>
              navigation.navigate('AtheleteInformation')
            }></PrimaryButton>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader />
      <ListHeaderComponent />
    </SafeAreaView>
  );
};

export default RegisterAthelete;
