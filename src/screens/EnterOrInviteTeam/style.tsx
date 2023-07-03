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
    img: {height: 20, width: 20, borderRadius: 10},
    upload: {
      marginTop: dW(10),
      textAlign: 'left',
      fontFamily: 'Montserrat-SemiBold',
      color: colors.white,
      fontSize: dW(13),
      letterSpacing: 1,
    },
    btn: {
      backgroundColor: colors.gray,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    view: {
      // flex: 1,
      flexDirection: 'row',
      //backgroundColor: 'red',
      marginVertical: 15,
      justifyContent: 'space-between',
    },
    view_45: {
      flex: 0.47,
      backgroundColor: colors.blackshade,
      height: 155,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewh1: {
      backgroundColor: colors.gray,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    heading: {
      marginTop: dW(20),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
  });
};
export default useStyle;
