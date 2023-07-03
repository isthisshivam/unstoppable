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
import useStyle from './style';
import {getStoreData, extractVideoId} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import BoxView from '../../components/BoxView';
import SecondaryHeader from '../../components/SecondaryHeader';
import strings from '../../constants/strings';

const TermsAndCondition = props => {
  const pallete = usePallete();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <SecondaryHeader
        onClick={() => navigation.goBack()}
        heading={strings.terms_condition}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 13,
          fontFamily: 'Montserrat-Regular',
          padding: 20,
        }}>
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content. Lorem ipsum may be used as a
        placeholder before final copy is available. It is also used to
        temporarily replace text in a process called greeking, which allows
        designers to consider the form of a webpage or publication, without the
        meaning of the text influencing the design. Lorem ipsum is typically a
        corrupted version of De finibus bonorum et malorum, a 1st-century BC
        text by the Roman statesman and philosopher Cicero, with words altered,
        added, and removed to make it nonsensical and improper Latin. Versions
        of the Lorem ipsum text have been used in typesetting at least since the
        1960s, when it was popularized by advertisements for Letraset transfer
        sheets.[1] Lorem ipsum was introduced to the digital world in the
        mid-1980s, when Aldus employed it in graphic and word-processing
        templates for its desktop publishing program PageMaker. Other popular
        word processors, including Pages and Microsoft Word, have since adopted
        Lorem ipsum,[2] as have many LaTeX packages
      </Text>
    </SafeAreaView>
  );
};
export default TermsAndCondition;
