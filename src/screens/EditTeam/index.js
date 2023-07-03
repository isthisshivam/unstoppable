import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Share,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LinearGradientButton from '../../components/GradientButton';
import InvieTeamView from '../../components/InviteTeamView';
import PrimaryButton from '../../components/PrimaryButton';
import MyTeamListLane from '../../components/MyTeamListLane';
import SportsList from '../../components/SportList';
import PrimaryHeader from '../../components/PrimaryHeader';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import strings from '../../constants/strings';
import {showToastMessage, isEmpty, isEmail} from '../../utils/utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EditTeam = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [fName, setFName] = useState('');

  const [lName, setLName] = useState('');
  const [teamId, setTeamId] = useState(props.route.params);
  const [coachId, setCoachIds] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    //  getTeamInfo();
  }, []);
  function validate() {
    var message = '';
    if (isEmpty(fName)) {
      message = 'Please First name!';
    } else if (isEmpty(lName)) {
      message = 'Please Last name!';
    } else if (isEmpty(email)) {
      message = 'Please enter email!';
    } else if (!isEmail(email)) {
      message = 'Please enter valid email!';
    } else if (isEmpty(age)) {
      message = 'Please enter age!';
    }

    if (message == '') {
      return true;
    }
    showToastMessage(message);
    return false;
  }

  const fetchUserInfo = async () => {
    console.log('userDetaiddl', props.route);
    console.log('userDetaiddl', props.route.param);
    if (typeof props.route.params != 'undefined') {
      console.log('userDetaiddl', props.route.params._data.coachId);

      if (typeof props.route.params._data.age != 'undefined')
        setAge(props.route.params._data.age);

      setFName(props.route.params._data.first_name);
      setLName(props.route.params._data.last_name);
      setEmail(props.route.params._data.email);

      if (typeof props.route.params._data.coachId != 'undefined')
        setCoachIds(props.route.params._data.coachId);

      console.log('ids', coachId);
    }
  };
  const getTeamInfo = async () => {
    await firestore()
      .collection('Users')
      .doc(global.Uid)
      .collection('Team')
      .onSnapshot(querySnapshot => {
        setLoading(false);
        querySnapshot.forEach(doc => {
          if (doc) {
            if (teamId == doc.id) {
              setAge(doc.data().age);
              setFName(doc.data().first_name);
              setLName(doc.data().last_name);
            }
          }
        });
      });
  };

  const findTeam = async () => {
    if (validate()) {
      setLoading(true);
      let dbRef = await firestore()
        .collection('Users')
        .doc(global.Uid)
        .collection('Team');
      dbRef.onSnapshot(querySnapshot => {
        setLoading(false);
        querySnapshot.forEach(doc => {
          if (doc) {
            if (teamId == doc.id) {
              updateProfile(doc.id);
            }
          }
        });
      });
    }
  };
  const updateProfile = async () => {
    if (validate()) {
      setLoading(true);
      console.log('userDetaiddl', coachId);

      if (coachId.isEmpty || !coachId.includes(global?.Uid))
        coachId.push(global?.Uid);

      if (typeof props.route.params != 'undefined') {
        let dbRef = firestore().collection('Users').doc(props.route.params.id);
        dbRef
          .update({
            first_name: fName,
            last_name: lName,
            age: age,
            coachId: coachId,
          })
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              navigation.goBack();
            }, 100);
          })
          .catch(e => {
            console.log('pushUserPersonalInfo.catch', e);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        checkEmailExist();
      }
    }
  };

  const checkEmailExist = async () => {
    firestore()
      .collection('Users')
      .where('email', '==', email.toLowerCase())
      .get()
      .then(querySnapshot => {
        setLoading(false);
        console.log('dataExist', querySnapshot.empty);

        if (!querySnapshot.empty) {
          setLoading(false);
          showToastMessage(
            'User with this email already exist. Please try with another.',
          );
        } else {
          let dbRef = firestore().collection('Users').doc();
          dbRef
            .set({
              first_name: fName,
              last_name: lName,
              age: age,
              email: email.toLowerCase(),
              password: '',
              user_type: strings.athletew,
              coachId: coachId,
              profile:
                'http://52.206.87.221/backend/web/uploads/user_logo/my_default_picture.png',
              sport_name: [],
            })
            .then(() => {
              setTimeout(() => {
                setLoading(false);
                navigation.goBack();
              }, 100);
            })
            .catch(e => {
              setLoading(false);
              console.log('pushUserPersonalInfo.catch', e);
            })
            .finally(() => {
              setLoading(false);
            });
        }

        //    refArray = userArray;
      });
  };
  const VirtualizedList = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <Text style={style.heading}>{strings.Enter_Athelete}</Text>
        <Loader isLoading={loading}></Loader>
        <Text style={style.input_heading}>{strings.fname}</Text>
        <TextInput
          value={fName}
          onChangeText={setFName}
          keyboardType="default"
          placeholder="Name"
          style={style.input}></TextInput>
        <Text style={style.input_heading}>{strings.lname}</Text>
        <TextInput
          value={lName}
          onChangeText={setLName}
          keyboardType="default"
          placeholder="Last Name"
          style={style.input}></TextInput>
        <Text style={style.input_heading}>EMAIL</Text>
        {typeof props.route.params == 'undefined' ? (
          <TextInput
            value={email}
            //  enabled={false}
            onChangeText={setEmail}
            keyboardType="default"
            placeholder="Email"
            style={style.input}></TextInput>
        ) : (
          <TextInput
            value={email}
            enabled={false}
            //  onChangeText={setEmail}
            keyboardType="default"
            placeholder="Email"
            style={[
              style.input,
              {backgroundColor: colors.blackShade_s},
            ]}></TextInput>
        )}
        <Text style={style.input_heading}>AGE</Text>
        <TextInput
          value={age}
          keyboardType="decimal-pad"
          onChangeText={setAge}
          placeholder="Age"
          style={style.input}></TextInput>
        <InvieTeamView />
      </View>
    );
  };

  return (
    // <SafeAreaView
    //   style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
    //   <PrimaryHeader onClick={() => navigation.goBack()} />
    //   {VirtualizedList()}
    //   <FlatList
    //     style={style.padd_20}
    //     contentContainerStyle={style.padd_b20}
    //     data={[]}
    //     ListFooterComponent={
    //       <PrimaryButton
    //         ex_style={style.mt_30}
    //         heading={strings.UPDATE}
    //         onClick={() => updateProfile()}></PrimaryButton>
    //     }></FlatList>
    // </SafeAreaView>

    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <Loader isLoading={loading}></Loader>
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={150}>
        {VirtualizedList()}
        <PrimaryButton
          ex_style={[{alignSelf: 'center', marginTop: '23%'}]}
          heading={
            typeof props.route.params != 'undefined'
              ? strings.UPDATE
              : strings.SAVE
          }
          onClick={() => updateProfile()}></PrimaryButton>
        {/* <FlatList
    style={style.padd_20}
    contentContainerStyle={style.padd_b20}
    data={[]}
    ListFooterComponent={
      <PrimaryButton
        ex_style={style.mt_30}
        heading={strings.SAVE}
        onClick={() => addAthelete()}></PrimaryButton>
    }></FlatList> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default EditTeam;
