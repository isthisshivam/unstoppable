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
    heading: {
      marginTop: dW(20),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    h2: {
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      marginTop: dW(4),
      fontSize: dW(13),
      letterSpacing: 0.1,
    },
    cc: {paddingHorizontal: 20, paddingBottom: 30},
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
