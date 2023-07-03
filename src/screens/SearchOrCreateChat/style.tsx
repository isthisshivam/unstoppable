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
    pwd: {
      height: 45,
      alignSelf: 'center',
      width: '90%',
      backgroundColor: colors.blackShade_s,
      borderRadius: 40,

      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
    },
    img: {height: 12, width: 12, resizeMode: 'contain'},
    input: {
      textAlign: 'center',
      color: colors.white,
      height: 45,
      width: '90%',
      // backgroundColor: 'red',
      paddingHorizontal: 20,
    },
    heading: {
      margin: dW(10),
      marginTop: 20,
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 0,
    },
    list: {marginTop: 10, backgroundColor: colors.blackShade_s},
    pa: {paddingBottom: 40},
  });
};
export default useStyle;
