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
    opacity: {opacity: 0.8},
    partition: {
      height: 1,
      width: '100%',
      marginTop: 30,
      backgroundColor: colors.blackShade_s,
    },
    h4: {
      margin: dW(20),
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: dW(14),
      letterSpacing: 0,
    },
    h4_desc: {
      marginHorizontal: dW(10),
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: dW(14),
      lineHeight: 25,
    },
    img_25_25: {height: 25, width: 25, resizeMode: 'contain'},
    h3: {
      marginLeft: dW(10),
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: dW(15),
      letterSpacing: 0,
    },
    mobility_head: {
      marginLeft: dW(10),
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
      color: colors.orange,
      fontSize: dW(10),
      letterSpacing: 0,
      marginBottom: 3,
    },
    mobility_title: {
      marginLeft: dW(10),
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: dW(10),
      letterSpacing: 0,
    },
    img_15_15: {height: 15, width: 15, resizeMode: 'contain'},
    main_cc: {
      flexDirection: 'row',
      flex: 1,
      height: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    h2: {
      width: '90%',
      margin: dW(20),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(15),
      letterSpacing: 0,
    },
    h1: {
      width: '90%',
      margin: dW(20),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(15),
      letterSpacing: 0,
    },
  });
};
export default useStyle;
