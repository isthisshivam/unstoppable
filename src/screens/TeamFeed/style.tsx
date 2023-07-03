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
    touch: {
      height: 50,
      width: 50,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      backgroundColor: colors.primary,
      alignContent: 'center',
      alignSelf: 'center',
      shadowColor: colors.gray,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.2,
      shadowRadius: 9.97,

      elevation: 21,
    },
    header_img: {height: 200, width: '100%'},
    imageBack: {
      width: '100%',
      height: '100%',
    },
    header_view: {
      paddingHorizontal: 20,
      height: 55,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.blackShade_s,
    },
    back_click: {
      height: 40,
      width: 40,
      resizeMode: 'contain',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    back_click1: {
      height: 40,
      width: 40,
      resizeMode: 'contain',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    img_20: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
      transform: [{rotate: '90deg'}],
    },

    header_heading: {
      marginRight: dW(10),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 0,
    },
    flex1: {flex: 1},
    paddingHorizontal: {paddingVertical: 20, paddingHorizontal: 20},
    key: {
      height: 60,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 15,
      marginBottom: 10,
    },
    input: {
      paddingHorizontal: 20,
      borderRadius: 20,
      height: 45,
      backgroundColor: colors.white,
      width: '85%',
    },
    // touch: {
    //   height: 40,
    //   width: 40,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   borderRadius: 20,
    //   backgroundColor: colors.primary,
    // },
  });
};
export default useStyle;
