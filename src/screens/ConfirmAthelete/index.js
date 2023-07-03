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

import colors from '../../constants/colors';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import PrimaryButton from '../../components/PrimaryButton';

import PrimaryHeader from '../../components/PrimaryHeader';
import strings from '../../constants/strings';
const ConfirmAthelete = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  const renderItem = () => {
    return (
      <View style={style.item}>
        <View style={style.inner_item}>
          <View style={{flex: 1}}>
            <Text style={style.heading}>ATHLETE #1</Text>
          </View>

          <View style={style.inner_content}>
            <Image style={style.edit_img} source={images.edit}></Image>
          </View>
        </View>
        <View style={style.inner_conv1}>
          <View style={{flex: 1}}>
            <Text style={style.h1_gray}>Name:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={style.h1_white}>Jane Deo</Text>
          </View>

          <View style={style.flex_h}></View>
        </View>
        <View style={style.flex_30}>
          <View style={{flex: 1}}>
            <Text style={style.h1_gray}>Gender:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={style.h1_white}>Female</Text>
          </View>

          <View style={style.flex_h}></View>
        </View>
        <View style={style.jus}>
          <View style={{flex: 1}}>
            <Text style={style.h1_gray}>Age:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={style.h1_white}>15 years old</Text>
          </View>

          <View style={style.flex_h}></View>
        </View>
        <View style={style.flex_30}>
          <View style={{flex: 1}}>
            <Text style={style.h1_gray}>Sports:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={style.h1_white}>Baseball, Lacrosse</Text>
          </View>

          <View style={style.flex_h}></View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader />
      <FlatList
        contentContainerStyle={style.cc}
        ListHeaderComponent={
          <>
            <Text style={style.heading_white}>{strings.infolook}</Text>
            <Text style={style.heading_white1}>{strings.correct}</Text>
          </>
        }
        ListFooterComponent={
          <PrimaryButton
            heading={strings.CONFIRM}
            onClick={() => navigation.navigate('Subscription')}></PrimaryButton>
        }
        showsVerticalScrollIndicator={false}
        data={[1, 1, 1]}
        renderItem={renderItem}></FlatList>
    </SafeAreaView>
  );
};

export default ConfirmAthelete;
