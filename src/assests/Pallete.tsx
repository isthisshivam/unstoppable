import {StyleSheet} from 'react-native';
import colors from '../constants/colors';
import {dW, dH} from '../utils/dynamicHeightWidth';

const usePallete = () => {
  return StyleSheet.create({
    mainContainor: {
      flex: 1,
      backgroundColor: colors.black,
    },

    code: {
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      padding: 30,
      color: colors.white,
      fontSize: dW(15),
      letterSpacing: 0.1,
    },
    screen_container: {
      paddingHorizontal: dW(15),
      flex: 1,
    },
    inheritView: {
      height: '100%',
      width: '100%',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contane: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      paddingHorizontal: 20,
      padding: 10,
      elevation: 24,
      //height: 190,
      width: 280,
      backgroundColor: colors.white,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: dH(240),
      borderRadius: 20,
    },
    invisi: {
      height: 34,
      width: 80,
      borderRadius: 5,
      backgroundColor: colors.lightgray,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    cancle: {
      color: 'black',
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
    },
    visible: {
      flexDirection: 'row',
      height: 100,
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    logout_: {
      height: 34,
      width: 80,
      borderRadius: 5,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    logout: {
      marginTop: 20,
      fontSize: 17,
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
    },
    miss: {
      marginTop: 10,
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Montserrat-Thin',
    },
    contanerr: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      paddingHorizontal: 20,
      padding: 10,
      elevation: 24,
      height: 50,
      marginLeft: '20%',
      width: 200,
      backgroundColor: colors.blackShade_s,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: dH(50),
      borderRadius: 20,
    },
  });
};
export default usePallete;
