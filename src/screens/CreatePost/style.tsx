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
      marginLeft: dW(20),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 0,
    },
    post: {
      color: colors.white,
      lineHeight: 23,
      fontSize: 14,
      fontFamily: 'Montserrat-SemiBold',
    },
    post_disables: {
      color: colors.gray,
      lineHeight: 23,
      fontSize: 14,
      fontFamily: 'Montserrat-SemiBold',
    },
    plain: {height: 37, width: 75},
    post_btn_disabled: {
      height: 34,
      width: 65,
      borderRadius: 5,
      backgroundColor: colors.blackShade_s,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 19.97,

      elevation: 21,
    },
    post_btn: {
      height: 34,
      width: 65,
      borderRadius: 5,
      backgroundColor: colors.orange,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.3,
      shadowRadius: 9.97,

      elevation: 21,
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
    touch: {
      height: 80,
      width: 80,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
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
  });
};
export default useStyle;
