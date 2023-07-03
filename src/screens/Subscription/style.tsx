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
      height: 160,
    },
    img_22_22: {height: 22, width: 22},
    header: {
      height: 55,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },

    PrimaryHeader_C: {
      height: 65,
      paddingHorizontal: 10,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      //    backgroundColor: 'red',
    },

    PrimaryHeader_Click: {justifyContent: 'center', height: 55, width: 55},

    header_: {justifyContent: 'center', height: 55, width: 55},
    contain: {height: 22, width: 22},
    subs: {
      marginTop: dW(10),
      marginLeft: 35,
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(18),
      letterSpacing: 1,
    },
    subs1: {
      marginTop: dW(1),
      textAlign: 'left',
      marginLeft: 35,
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(18),
      letterSpacing: 1,
    },
    click: {
      height: 180,
      width: '100%',
      marginTop: 10,
      padding: 20,
      backgroundColor: colors.black,
    },
    dollar: {
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      lineHeight: 30,
      fontSize: 27,
    },

    img_2_221: {height: 150, width: 150, marginTop: 60, marginRight: 20},

    doll: {
      fontFamily: 'Montserrat-Medium',
      color: colors.white,
      lineHeight: 25,
      fontSize: 14,
    },
    padding: {paddingHorizontal: 20},
    opacity: {
      height: 142,
      width: '100%',
      marginTop: 0,
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: colors.blackshade,
    },
    monthly: {
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: 16,
      lineHeight: 25,
    },
    main: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    doll1: {
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      lineHeight: 30,
      fontSize: 27,
    },
    annual: {
      fontFamily: 'Montserrat-Medium',
      color: colors.white,
      lineHeight: 25,
      fontSize: 14,
    },
    man: {
      height: 20,
      width: 20,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    incl: {
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      lineHeight: 25,
      fontSize: 14,
    },
    opacc: {
      marginTop: dH(30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    restore: {
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: 16,
      lineHeight: 25,
      textAlign: 'center',
      marginTop: dH(20),
    },
    by: {
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: 12,
      lineHeight: 17,
      paddingHorizontal: 30,
      textAlign: 'center',
      marginTop: dH(10),
    },
    img: {
      height: 20,
      width: 20,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    img1: {
      height: 23,
      width: 23,
      resizeMode: 'cover',
      /// borderRadius: 10,
    },
    includes: {
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      lineHeight: 25,
      fontSize: 14,
    },
    image: {
      borderRadius: 20,
      height: '100%',
      padding: 20,
      justifyContent: 'center',
    },
    month: {
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: 16,
      lineHeight: 25,
    },
    jus: {
      width: '100%',
      /// backgroundColor: 'red',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
};
export default useStyle;
