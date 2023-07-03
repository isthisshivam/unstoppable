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
    cc: {paddingHorizontal: 20, paddingBottom: 30},
    jus: {
      flexDirection: 'row',
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    heading_white: {
      marginTop: dW(40),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    heading_white1: {
      // marginTop: dW(40),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    flex_h: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    flex_30: {
      flexDirection: 'row',
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    h1_gray: {
      fontSize: 15,
      fontFamily: 'Montserrat-Regular',
      color: colors.gray,
    },
    h1_white: {
      fontSize: 15,
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
    },
    inner_content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    edit_img: {height: 16, width: 16, resizeMode: 'contain'},
    inner_conv1: {
      flexDirection: 'row',
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    heading: {
      fontSize: 17,
      fontFamily: 'Montserrat-Regular',
      color: colors.orange,
    },
    inner_item: {
      flexDirection: 'row',
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    item: {
      backgroundColor: colors.blackshade,
      height: 170,
      width: '100%',
      marginTop: 20,
      borderRadius: 10,
      padding: 10,
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
