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
    maintain: {
      marginTop: dW(5),
      textAlign: 'left',
      // marginLeft: 20,
      fontFamily: 'Montserrat-SemiBold',
      color: colors.white,
      fontSize: dW(12),
      lineHeight: 15,
      letterSpacing: 1,
    },
    img_70: {
      height: 72,
      width: 72,
      borderRadius: 5,
      marginRight: 10,
    },
    imahge: {
      //backgroundColor: 'red',
      height: 190,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 11,
      },
      flexDirection: 'row',
      //alignItems: 'center',
      shadowOpacity: 0.57,
      shadowRadius: 15.19,
      justifyContent: 'space-between',
      elevation: 23,
    },
    imageView: {
      flexDirection: 'row',

      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      marginTop: dW(17),
      textAlign: 'left',
      marginHorizontal: 20,
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(20),
      letterSpacing: 1,
      lineHeight: 32,
    },
    header_img: {height: 200, width: '100%'},
    imageBack: {
      width: '100%',
      height: '100%',
    },
    list: {paddingHorizontal: 0, paddingBottom: 30},
    list_view: {
      flex: 1,
      backgroundColor: colors.black,
    },
    coach: {
      height: 100,
      flexDirection: 'row',
      marginTop: 10,

      //borderRadius: 20,
      borderBottomColor: colors.gray,
      borderBottomWidth: 0.5,
    },
    flex_75: {
      width: '72%',
      marginLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    health: {
      marginTop: dW(0),
      textAlign: 'left',
      // marginLeft: 20,
      fontFamily: 'Montserrat-Regular',
      color: colors.orange,
      fontSize: dW(11),
      letterSpacing: 1,
    },

    explore: {
      marginTop: dW(1),
      textAlign: 'left',
      margin: 20,

      fontFamily: 'Montserrat-Regular',
      color: colors.white,
      fontSize: dW(12),
      letterSpacing: 1,
    },
    img_30: {
      height: 27,
      width: 27,
      resizeMode: 'contain',
      marginRight: 20,
      marginTop: dW(20),
    },
    center: {
      //alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    images: {
      marginLeft: 20,
      borderRadius: 10,
      alignSelf: 'center',
      height: 160,
      width: '95%',
      marginTop: -102,
      // alignItems: 'center',
      justifyContent: 'center',
      //borderColor: colors.white,
      //borderWidth: 0.3,
    },
    feature: {
      marginTop: dW(70),
      textAlign: 'left',
      marginLeft: 20,
      fontFamily: 'Montserrat-Regular',
      color: colors.orange,
      fontSize: dW(13),
      //letterSpacing: 1,
    },
    train: {
      width: '90%',
      marginTop: dW(5),
      textAlign: 'left',
      marginLeft: 20,
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(15),
      letterSpacing: 0,
    },
    view: {
      flex: 1,
      marginTop: -30,
      justifyContent: 'center',
      borderRadius: 10,
      paddingLeft: 10,
      alignContent: 'center',
    },
    coach_list: {padding: 10, borderRadius: 20, marginTop: 30},
    coach_list_s: {
      padding: 10,
      borderRadius: 10,
    },
  });
};
export default useStyle;
