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
    outer_c: {
      flexDirection: 'column',
      width: windowWidth() - 0,
      paddingHorizontal: 0,
    },
    heading: {
      marginTop: dW(20),
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 0,
    },
    desc: {
      margin: 20,
      // marginTop: dW(20),
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      color: colors.gray,
      fontSize: dW(12),
      letterSpacing: 0,
    },
    main_img: {
      height: '88%',
      width: '100%',
      alignSelf: 'center',
      marginTop: dW(20),
    },
    absolute_v: {
      position: 'absolute',
      right: 20,
      bottom: 10,
      borderRadius: 30,
      elevation: 8,
    },
  });
};
export default useStyle;
