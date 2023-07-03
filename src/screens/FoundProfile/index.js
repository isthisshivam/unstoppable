import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import UserTypeLane from '../../components/UserTypeLane';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradientButton from '../../components/GradientButton';
import SecButton from '../../components/SecondaryButton';
import PrimaryHeader from '../../components/PrimaryHeader';
import strings from '../../constants/strings';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';

const FoundProfile = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [fName, setFName] = useState('');

  const [lName, setLName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [sports, setSports] = useState([]);
  const [coachName, setCoachName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [gender, setGender] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    console.log('userDetaiddl', props.route.params);
    console.log('userDetaiddl', props.route.params.id);
    // setAge(props.route.params._data.age);
    // setFName(props.route.params._data.first_name);
    // setLName(props.route.params._data.last_name);
    // setEmail(props.route.params._data.email);
    // setCoachName(props.route.params._data.coachName);

    // if (typeof props.route.params._data.displayName != 'undefined')
    //   setDisplayName(props.route.params._data.displayName);

    // if (typeof props.route.params._data.sport_name != 'undefined')
    //   setSports(props.route.params._data.sport_name);
    setCoachName(props.route.params._data.coachName);
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(props.route.params.id)
      .get()
      // .collection('Team')
      .then(querySnapshot => {
        console.log('userData', querySnapshot);
        if (querySnapshot)
          if (querySnapshot._data != null) {
            querySnapshot._data.index = props.route.params._data.index;
            setUserData(querySnapshot);
            if (typeof querySnapshot._data.age != 'undefined')
              setAge(querySnapshot._data.age);

            setFName(querySnapshot._data.first_name);
            setLName(querySnapshot._data.last_name);
            setEmail(querySnapshot._data.email);

            if (typeof querySnapshot._data.displayName != 'undefined')
              setDisplayName(querySnapshot._data.displayName);

            if (typeof querySnapshot._data.password != 'undefined')
              setUserType(querySnapshot._data.password);

            if (typeof querySnapshot._data.sport_name != 'undefined')
              setSports(querySnapshot._data.sport_name);

            if (typeof querySnapshot._data.gender != 'undefined')
              setGender(querySnapshot._data.gender);
          }

        setLoading(false);
      });
  };

  refresh = data => {
    fetchUserInfo();
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <Loader isLoading={loading}></Loader>
      <View style={style.padding_20}>
        <Text style={style.heading}>{strings.FoundProfile}</Text>
        <Text style={style.text}>{strings.confirmathe}</Text>
        <View style={style.innerview}>
          <View style={style.innerview1}>
            <View style={style.flex}>
              <Text style={style.gray}>Name:</Text>
            </View>
            <View style={style.flex}>
              <Text style={style.white}>{fName + ' ' + lName}</Text>
            </View>

            <View style={style.flex_1}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate('AtheleteStatistics', {
                    onGoBack: this.refresh,
                    data: userData,
                  });
                }}>
                <Image style={style.img} source={images.edit}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.flex__}>
            <View style={{flex: 1}}>
              <Text style={style.gray}>Gender:</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={style.white}>{gender}</Text>
            </View>

            <View style={style.flex_1}></View>
          </View>
          <View style={style.btn}>
            <View style={{flex: 1}}>
              <Text style={style.gray}>Age:</Text>
            </View>
            <View style={style.flex}>
              <Text style={style.white}>{age + ' years old'}</Text>
            </View>

            <View style={style.flex_1}></View>
          </View>
          <View style={[style.fledx, {flex: 1}]}>
            <View style={style.flex}>
              <Text style={style.gray}>Sports:</Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={style.white}>{sports.join(', ')}</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}></View>
          </View>
        </View>
        <Text style={style.profile}>
          Profile created by
          <Text style={style.deo}> {coachName}</Text>
        </Text>
        <View style={style.m_120}>
          <PrimaryButton
            heading={userType == '' ? 'Confirm & SignUp' : 'Confirm & SignIn'}
            onClick={() => {
              userType == ''
                ? navigation.navigate('Register', userData)
                : navigation.navigate('Login', userData);
            }}></PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FoundProfile;
