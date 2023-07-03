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
    text: {color: colors.gray, textAlign: 'center', marginTop: 20},
    innerview: {
      backgroundColor: colors.blackshade,
      height: 140,
      width: '100%',
      marginTop: 20,
      borderRadius: 10,
      padding: 10,
    },
    deo: {
      color: colors.gray,
      textAlign: 'center',
      marginTop: 20,
      fontFamily: 'Montserrat-SemiBold',
    },
    m_120: {marginTop: dH(170)},
    innerview1: {
      flexDirection: 'row',
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    img: {height: 16, width: 16, resizeMode: 'contain'},
    flex__: {
      flexDirection: 'row',
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btn: {
      flexDirection: 'row',
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    profile: {color: colors.gray, textAlign: 'center', marginTop: 20},
    fledx: {
      flexDirection: 'row',
      height: 30,
      width: '100%',
      alignItems: 'center',
    
      justifyContent: 'space-between',
    },
    flex: {flex: 1},
    gray: {
      fontSize: 15,
      fontFamily: 'Montserrat-Regular',
      color: colors.gray,
    },
    white: {
      fontSize: 15,
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
    },
    flex_1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    padding_20: {paddingHorizontal: 20},
    heading: {
      marginTop: dW(100),
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    linearGradient: {
      height: 48,
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: 'blue',
      backgroundColor: 'red',
    },
  });
};
export default useStyle;
