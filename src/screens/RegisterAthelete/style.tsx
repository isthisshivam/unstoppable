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
    padding: {paddingHorizontal: 20},
    how: {
      marginTop: dW(30),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
      lineHeight: 30,
    },
    you: {
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
  });
};
export default useStyle;
