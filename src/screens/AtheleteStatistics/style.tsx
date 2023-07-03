import {StyleSheet} from 'react-native';
import {dH, dW} from '../../utils/dynamicHeightWidth';
import assets from '../../assests/images/index';
import colors from '../../constants/colors';
const useStyle = () => {
  return StyleSheet.create({
    header_img: {height: 200, width: '100%'},
    imageBack: {
      width: '100%',
      height: '100%',
    },
    always: {
      color: colors.gray,
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
    },
    choose: {
      color: colors.gray,
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
      marginTop: 7,
    },
    sports: {
      color: colors.white,
      textAlign: 'left',
      fontSize: 18,
      fontFamily: 'Montserrat-Medium',
      marginTop: 50,
    },
    item_heading: {
      color: colors.white,
      textAlign: 'left',
      fontFamily: 'Montserrat-Medium',
    },

    input_view: {
      justifyContent: 'center',
    },
    item: {
      height: 32,
      margin: 5,
      marginTop: 15,

      paddingHorizontal: 20,
      alignItems: 'center',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: colors.white,
      justifyContent: 'center',
    },
    heading: {
      marginTop: dW(40),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    input_heading: {
      color: colors.gray,
      fontSize: 12,
      fontFamily: 'Montserrat-Medium',
      marginTop: 20,
    },
    input: {
      color: colors.gray,
      fontSize: 15,
      padding: 10,
      fontFamily: 'Montserrat-Regular',
      marginTop: 5,
      height: 48,
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: 5,
    },
    padd_b20: {paddingBottom: 40},
    padd_20: {paddingHorizontal: 20},
    mt_30: {marginTop: dH(100)},
  });
};
export default useStyle;
