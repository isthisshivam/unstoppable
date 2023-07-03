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
import {showToastMessage, isEmpty} from '../../utils/utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const AtheleteInformation = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  function validate() {
    var message = '';
    if (isEmpty(fName)) {
      message = 'Please First name!';
    } else if (isEmpty(lName)) {
      message = 'Please Last name!';
    } else if (isEmpty(age)) {
      message = 'Please enter age!';
    }

    if (message == '') {
      return true;
    }
    showToastMessage(message);
    return false;
  }
  const addAthelete = async () => {
    // alert(global.Uid);
    if (validate()) {
      setLoading(true);
      await firestore()
        .collection('Users')
        .doc(global.Uid)
        .collection('Team')
        .add({
          first_name: fName,
          last_name: lName,
          age: age,
          profile:
            'http://52.206.87.221/backend/web/uploads/user_logo/my_default_picture.png',
        })
        .then(() => {
          showToastMessage('Athelete added successfully.');
          setTimeout(() => {
            navigation.navigate('Home');
          }, 100);
          setLoading(false);
        })
        .catch(e => {
          console.log('pushUserPersonalInfo.catch', e);
          setLoading(false);
        });
    }
  };

  const VirtualizedList = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <Text style={style.heading}>{strings.Enter_Athelete}</Text>

        <Text style={style.input_heading}>{strings.fname}</Text>
        <TextInput
          placeholderTextColor={colors.gray}
          value={fName}
          onChangeText={setFName}
          keyboardType="default"
          placeholder="Name"
          style={style.input}></TextInput>
        <Text style={style.input_heading}>{strings.lname}</Text>
        <TextInput
          value={lName}
          placeholderTextColor={colors.gray}
          onChangeText={setLName}
          keyboardType="default"
          placeholder="Last Name"
          style={style.input}></TextInput>

        <Text style={style.input_heading}>{strings.email}</Text>
        <TextInput
          value={email}
          enabled={false}
          //  onChangeText={setFName}
          keyboardType="default"
          placeholder="Email"
          style={style.input}></TextInput>

        <Text style={style.input_heading}>AGE</Text>
        <TextInput
          placeholderTextColor={colors.gray}
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
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={150}>
        {VirtualizedList()}
        <PrimaryButton
          ex_style={[{alignSelf: 'center', marginTop: '23%'}]}
          heading={strings.SAVE}
          onClick={() => addAthelete()}></PrimaryButton>
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
export default AtheleteInformation;
