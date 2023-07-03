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
 
      padding: 20,
      alignSelf: 'auto',
    //  marginTop: windowHeight() / 2.1,
   //   backgroundColor: colors.white,
    //  borderTopLeftRadius: 30,
     // borderTopRightRadius: 30,
      
    },

    text: {color: colors.white, fontSize: dW(15), 
      fontFamily: 'Montserrat-SemiBold', textAlign: 'center'
    },

    img_45_45: {height: 45, width: 45, resizeMode: 'cover'},
    create_btn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth() - 30,
      marginTop: dH(20),
      height: 48,
      borderRadius: 26,
      backgroundColor: colors.primary,
    },
    app_logo : {
      alignItems: "center"
     
      },
    code: {
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      marginTop: dH(20),
      color: colors.black,
      fontSize: dW(13),
      letterSpacing: 0.1,
    },
    create_heading: {
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    started: {
      fontFamily: 'Montserrat-SemiBold',
      
      color: colors.primary,
      fontSize: dW(16),
      letterSpacing: 1,
    },
    login: {
      fontFamily: 'Montserrat-SemiBold',
      textAlign: 'center',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 1,
      marginTop : 20,
      marginBottom: 10,
      textDecorationLine :'underline'
    },
    started_btn: {
    //  alignItems: 'center',
    //  justifyContent: 'center',
      width: windowWidth() - 30,
      marginTop: dH(20),
      height: 48,
      borderRadius: 26,
      borderColor: colors.primary,
      borderWidth: 1,
      backgroundColor: colors.white,
    },
    explore: {
      textAlign: 'center',
      marginTop: dH(20),
      color: colors.black,
      fontSize: dW(15),
      fontFamily: 'Montserrat-Regular',
      letterSpacing: 1,
    },
  });
};
export default useStyle;
