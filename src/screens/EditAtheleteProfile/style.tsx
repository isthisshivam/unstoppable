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
    man: {
      height: 99,
      width: 99,
      marginTop: dH(20),
    },
    sport: {
      color: colors.white,
      textAlign: 'left',
      fontSize: 18,
      fontFamily: 'Montserrat-Medium',
      marginTop: 20,
    },
    change: {
      marginTop: dW(7),
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: dW(11),
      letterSpacing: 0,
    },
    input_view: {
      marginTop: dH(60),
      // alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    input1: {
      color: colors.gray,
      fontSize: 15,
      padding: 10,
      fontFamily: 'Montserrat-Regular',
      marginTop: 15,
      height: 48,
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: 5,
    },
    input: {
      color: colors.gray,
      fontSize: 15,
      padding: 10,
      fontFamily: 'Montserrat-Regular',
      marginTop: 5,
      height: 48,
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: 5,
    },
    img_back: {height: 140, width: '100%', alignItems: 'center'},
    img_v: {
      height: 55,
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
    },
    arrow: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
      transform: [{rotate: '90deg'}],
    },
    heading: {
      marginTop: dW(0),
      textAlign: 'left',
      fontFamily: 'Montserrat-SemiBold',
      color: colors.white,
      fontSize: dW(14),
      letterSpacing: 0,
    },
    item: {
      height: 32,
      margin: 1,
      marginLeft: 10,
      marginTop: 15,
      //flex: 1,

      paddingHorizontal: 20,
      alignItems: 'center',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: colors.white,
      justifyContent: 'center',
    },
    _item: {
      color: colors.white,
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
    },
  });
};
export default useStyle;
