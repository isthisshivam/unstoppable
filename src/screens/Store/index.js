import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  StatusBar,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import SafariView from 'react-native-safari-view';
import SecondaryHeader from '../../components/SecondaryHeader';
const Store = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  useFocusEffect(() => {
    _pressHandler();
  });

  function _pressHandler() {
    SafariView.isAvailable()
      .then(
        SafariView.show({
          url: 'https://thetoespacer.com/',
          fromBottom: true,
        }).then(
          SafariView.addEventListener('close', () => {
            alert('close');
          }),
        ),
      )
      .catch(error => {
        // Fallback WebView code for iOS 8 and earlier
      });
  }
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View
        style={{
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Montserrat-Bold',
            color: colors.white,
            fontSize: dW(13),
            letterSpacing: 0,
          }}>
          Store
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Store;
