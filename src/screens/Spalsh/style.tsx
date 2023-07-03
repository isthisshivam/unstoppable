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
    view: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      alignSelf: 'auto',
    },
    unsto: {
      textAlign: 'center',
      marginTop: dH(10),
      color: colors.white,
      fontSize: dW(35),
      letterSpacing: 2,
      fontFamily: 'Montserrat-SemiBold',
    },
    athe: {
      textAlign: 'center',
      marginTop: dH(6),
      color: colors.white,
      fontSize: dW(22),
      letterSpacing: 2,
      fontFamily: 'Montserrat-SemiBold',
    },
  });
};
export default useStyle;
