import {StyleSheet} from 'react-native';
import {
  dW,
  dH,
  windowHeight,
  windowWidth,
} from '../../utils/dynamicHeightWidth';
import assets from '../../assests/images/index';
import colors from '../../constants/colors';
const useStyle = () => {
  return StyleSheet.create({
    header_img: {height: 200, width: '100%'},
    imageBack: {
      width: '100%',
      height: '100%',
    },
    padding_20: {paddingHorizontal: 20},
    heading: {
      marginTop: dW(100),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    input: {
      color: colors.gray,
      fontSize: 17,
      padding: 10,
      fontFamily: 'Montserrat-Medium',
      marginTop: 20,
      height: 48,
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: 5,
    },
    by: {
      color: colors.gray,
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      marginTop: 50,
    },
    privacy: {
      textDecorationLine: 'underline',
      color: colors.gray,
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
    },
    haveacode: {
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      marginTop: dH(130),
      color: colors.gray,
      fontSize: dW(13),
      letterSpacing: 0.1,
    },
  });
};
export default useStyle;
