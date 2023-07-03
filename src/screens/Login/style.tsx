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
    forgot_pass: {color: colors.gray, textAlign: 'center', marginTop: 50},
    dont: {
      color: colors.gray,
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      // marginTop: 50,
      padding: 30,
    },
    register: {
      color: colors.white,
      textAlign: 'center',
      marginTop: 50,
      fontFamily: 'Montserrat-SemiBold',
    },
  });
};
export default useStyle;
