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
import useStyle from './style';
import colors from '../../constants/colors';
import UserTypeLane from '../../components/UserTypeLane';
import PrimaryHeader from '../../components/PrimaryHeader';
import strings from '../../constants/strings';
const WhoisLogging = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <View style={[style.padding_20, {flex: 1}]}>
        <Text style={style.who}>{`Who’s ${
          props?.route.params.type === 'login'
            ? 'logging in?'
            : 'creating an account?'
        } `}</Text>

        <UserTypeLane
          heading={strings.imcoach}
          onClick={() =>
            props?.route.params.type === 'login'
              ? navigation.navigate('Login', 'Coach')
              : navigation.navigate('Register', 'Coach')
          }></UserTypeLane>
        <UserTypeLane
          heading={strings.imathelete}
          onClick={() =>
            props?.route.params.type === 'login'
              ? navigation.navigate('Login', 'Athlete')
              : navigation.navigate('Register', 'Athlete')
          }></UserTypeLane>

        <View style={{flex: 1}}></View>

        <Text
          onPress={() => navigation.navigate('EnterCode')}
          style={pallete.code}>
          {strings.ihaveacode}
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default WhoisLogging;
