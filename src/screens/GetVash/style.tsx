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
    imageFront: {
      width: '100%',
      height: '70%',
      //marginTop: 200,
    },
    flex: {flex: 1},
    image: {
      flex: 1,
      padding: 20,
      alignSelf: 'auto',
      marginTop: windowHeight() / 2.3,
      // backgroundColor: colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    heading: {
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(30),
      letterSpacing: 2,
    },
    athe: {
      fontFamily: 'Montserrat-SemiBold',
      textAlign: 'left',
      marginTop: dH(6),
      color: colors.white,
      fontSize: dW(26),
      letterSpacing: 2,
    },
    explore: {
      fontFamily: 'Montserrat-Regular',
      textAlign: 'left',
      marginTop: dH(20),
      color: colors.white,
      fontSize: dW(15),
      letterSpacing: 1,
      lineHeight: 20,
    },
    create_btn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth() - 30,
      marginTop: dH(20),
      height: 48,
      borderRadius: 26,
      backgroundColor: colors.white,
    },
    create_heading: {
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
      color: colors.primary,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    login_btn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth() - 30,
      marginTop: dH(20),
      height: 48,
      borderRadius: 26,
      borderColor: colors.white,
      borderWidth: 1,
      backgroundColor: colors.transparent,
    },
    login_heading: {
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    cide: {
      textAlign: 'center',
      marginTop: dH(20),
      color: colors.white,
      fontSize: dW(14),
      letterSpacing: 0.1,
    },
  });
};
export default useStyle;
