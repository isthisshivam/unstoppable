import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
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

import PrimaryHeader from '../../components/PrimaryHeader';
import strings from '../../constants/strings';
const InviteCoach = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [multiple, setMultiple] = useState(true);

  const VirtualizedList = () => {
    return (
      <>
        <Text
          style={{
            marginTop: dW(40),
            textAlign: 'center',
            fontFamily: 'Montserrat-Bold',
            color: colors.white,
            fontSize: dW(16),
            letterSpacing: 1,
          }}>
          {strings.inviteyourcoach}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            color: colors.gray,
            fontSize: 14,
            fontFamily: 'Montserrat-Medium',
            marginTop: 10,
          }}>
          {strings.being}
        </Text>
        <ImageBackground
          style={{height: 200, width: '100%', marginTop: 30}}
          source={images.coachgroup}></ImageBackground>

        <View style={{marginTop: dW(30), flexDirection: 'row'}}>
          <TextInput
            style={{
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              height: 45,
              width: '60%',
              backgroundColor: colors.white,
            }}></TextInput>
          <ImageBackground
            borderBottomRightRadius={20}
            borderTopRightRadius={20}
            source={images.back}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 45,
              width: '62%',
            }}>
            <Text
              style={{
                marginRight: dW(70),
                fontFamily: 'Montserrat-Medium',
                color: colors.white,
                fontSize: dW(13),
                letterSpacing: 0,
              }}>
              {strings.sharecode}
            </Text>
          </ImageBackground>
        </View>

        <Text
          style={{
            color: colors.gray,
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
            marginTop: 7,
          }}>
          {strings.justcode}
        </Text>
        <Text
          style={{
            color: colors.gray,
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
            marginTop: dH(350),
          }}>
          {strings.skip}
        </Text>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <FlatList
        style={{paddingHorizontal: 20}}
        contentContainerStyle={{paddingBottom: 40}}
        data={['a', 'b', 'c']}
        numColumns={3}
        ListHeaderComponent={<VirtualizedList />}></FlatList>
    </SafeAreaView>
  );
};
export default InviteCoach;
