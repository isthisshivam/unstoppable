import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Pressable,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';
import {dW, dH, windowWidth} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import HeaderWithHeading from '../../components/HeaderWithHeading';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {LocaleConfig, Calendar, Arrow} from 'react-native-calendars';
import MessagesList from '../../components/MessageList';
import strings from '../../constants/strings';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import moment from 'moment';
var refArray = [];
const MySchedule = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialDate, setInitialDate] = useState(
    moment(new Date()).format('ll'),
  );
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [currentDate, setCurrentDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const getInitialMarkedDates = () => {
    const markedDates = {};
    const currentMonth = moment().format('YYYY-MM');

    markedDates[currentDate] = {
      selected: true,
      marked: true,
      selectedColor: 'blue',
    };

    if (selectedDate.startsWith(currentMonth)) {
      markedDates[selectedDate] = {
        selected: true,
        marked: true,
        selectedColor: 'blue',
      };
    }

    return markedDates;
  };
  const [markedDates, setMarkedDates] = useState(getInitialMarkedDates());

  const getMarkedDates = () => {
    const currentMonth = moment().format('YYYY-MM');
    const newMarkedDates = {...markedDates};

    Object.keys(newMarkedDates).forEach(date => {
      if (!date.startsWith(currentMonth)) {
        delete newMarkedDates[date];
      } else {
        newMarkedDates[date] = {
          ...newMarkedDates[date],
          selectedColor: 'blue',
        };
      }
    });

    return newMarkedDates;
  };

  const onMonthChange = month => {
    const newMonth = moment(month.dateString).format('YYYY-MM');
    const currentDate = moment().format('YYYY-MM-DD');

    if (!currentDate.startsWith(newMonth)) {
      setSelectedDate('');

      const markedDates = getMarkedDates();
      setMarkedDates(markedDates);
    }
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <HeaderWithHeading heading={strings.Schedule}></HeaderWithHeading>

      <Loader isLoading={loading}></Loader>
      <Calendar
        markedDates={markedDates}
        onMonthChange={onMonthChange}
        value
        onDayPress={day => {
          console.log(
            'onDayPress==',
            moment(day.timestamp).format('YYYY-MM-DD'),
          ),
            setInitialDate(moment(day.timestamp).format('YYYY-MM-DD'));
          navigation.navigate('Home', {Date: day.timestamp});
        }}
        style={{
          borderWidth: 1,
          borderColor: colors.blackShade_s,

          backgroundColor: colors.blackShade_s,
          borderRadius: 10,
          padding: 20,
          alignSelf: 'center',
          width: windowWidth() - 20,
        }}
        hideExtraDays
        disableMonthChange={false}
        headerStyle={{height: 90}}
        theme={{
          backgroundColor: colors.blackShade_s,
          calendarBackground: colors.blackShade_s,
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: colors.blackShade_s,
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ffffff',
          dayTextColor: '#ffffff',
          textDisabledColor: '#ffffff',
          dotColor: 'yellow',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',

          textDayStyle: {
            fontFamily: 'Montserrat-SemiBold',
          },
          monthTextColor: 'white',
          textDayFontFamily: 'Montserrat-Bold',
          textMonthFontFamily: 'Montserrat-SemiBold',
          textDayHeaderFontFamily: 'Montserrat-SemiBold',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayHeaderFontFamily: 'Montserrat-SemiBold',
          textDayFontSize: 13,
          textMonthFontFamily: 'Montserrat-SemiBold',
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
        }}
      />
    </SafeAreaView>
  );
};

export default MySchedule;
