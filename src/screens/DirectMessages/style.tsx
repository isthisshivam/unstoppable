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
      textAlign: 'left',
      fontFamily: 'Montserrat-SemiBold',
      color: colors.white,
      fontSize: dW(13),
      letterSpacing: 0,
    },
    img_12_12: {height: 12, width: 12, resizeMode: 'contain'},
    find: {textAlign: 'center', color: colors.white},
    Flatlist_ll: {marginTop: 20, backgroundColor: colors.blackShade_s},
    border: {
      height: 40,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    absolute: {
      position: 'absolute',
      width: 90,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      right: 20,
      bottom: 25,
      borderRadius: 30,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,

      elevation: 15,
    },
    search: {
      height: 45,
      alignSelf: 'center',
      width: '90%',
      backgroundColor: colors.blackShade_s,
      borderRadius: 40,
      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
};
export default useStyle;
