import {StyleSheet} from 'react-native';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import assets from '../../assests/images/index';
import colors from '../../constants/colors';
const useStyle = () => {
  return StyleSheet.create({
    header_img: {height: 200, width: '100%'},
    imageBack: {
      width: '100%',
      height: '100%',
    },
    padding_20: {padding: 15},
    img_10_10: {
      height: 10,
      width: 10,
      resizeMode: 'contain',
      marginLeft: 10,
    },
    delete_heading: {
      color: colors.orange,
      fontSize: 15,
      fontFamily: 'Montserrat-Medium',
      marginTop: 2,
      marginLeft: 40,
    },
    dele_btn: {
      height: 55,
      marginTop: 10,
      borderBottomColor: colors.gray,
      borderBottomWidth: 0.3,
      alignItems: 'center',
      flexDirection: 'row',
    },
    h2: {
      textAlign: 'center',
      color: colors.white,
      fontSize: 12,
      fontFamily: 'Montserrat-Regular',
      marginTop: 2,
      marginLeft: 10,
    },
    fd_row_aI_center_jc_center: {
      flexDirection: 'row',
      width: 160,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: 'red',
    },
    parent_img_back: {height: 320, width: '100%'},
    paddgin_20: {padding: 20},
    view_1: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 90,
      marginTop: 10,
    },
    view_inn1: {
      height: 20,
      width: 20,
    },
    imageBack_90_90: {
      height: 109,
      width: 109,
    },
    trip_click: {
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    img_20_20: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
    },
    jc_center: {
      alignItems: 'center',
      //justifyContent: 'center',
      marginTop: 10,
    },
    name_h1: {
      marginTop: dW(25),
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 0,
    },
  });
};
export default useStyle;
