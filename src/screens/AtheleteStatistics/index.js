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
import useStyle from './style';
import colors from '../../constants/colors';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import PrimaryHeader from '../../components/PrimaryHeader';
import LinearGradientButton from '../../components/GradientButton';
import strings from '../../constants/strings';
import firestore from '@react-native-firebase/firestore';
const AtheleteStatistics = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [multiple, setMultiple] = useState(false);
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [fName, setFName] = useState('');

  const [lName, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [sports, setSports] = useState([]);
  const [athletePosition, setAthletePosition] = useState([]);
  const [coachName, setCoachName] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
  
    setAge(props.route.params.data._data.age);
    setFName(props.route.params.data._data.first_name);
    setLName(props.route.params.data._data.last_name);
    setEmail(props.route.params.data._data.email);
    setCoachName(props.route.params.data._data.coachName);
    setAthletePosition(props.route.params.data._data.index);

    if (typeof props.route.params.data._data.displayName != 'undefined')
      setDisplayName(props.route.params.data._data.displayName);

    if (typeof props.route.params.data._data.sport_name != 'undefined')
      setSports(props.route.params.data._data.sport_name);

    if (typeof props.route.params.data._data.gender != 'undefined')
      setGender(props.route.params.data._data.gender);
  };

  const updateAthlete = async () => {
    console.log('userDetaiddl', props.route.params.data.id);

    let dbRef = await firestore()
      .collection('Users')
      // .doc(global?.Uid)
      .doc(props.route.params.data.id);
    //  .collection('Team')
    //  .doc(id);
    dbRef
      .update({
        first_name: fName,
        last_name: lName,
        age: age,
        gender: gender,
        sport_name: sports,
      })
      .then(data => {
        setTimeout(() => {
          console.log('data...', data);
          props.route.params.onGoBack(data);
          navigation.goBack();
        }, 100);
      })
      .catch(e => {
        console.log('pushUserPersonalInfo.catch', e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onItemClick = value => {
    setSports(sport =>
      sport.includes(value)
        ? sport.filter(n => n !== value)
        : [value, ...sport],
    );
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => onItemClick(item)}
        style={[
          style.item,
          {
            backgroundColor:
              sports?.length > 0 && sports.includes(item)
                ? colors.white
                : colors.black,
          },
        ]}>
        <Text
          style={[
            style._item,
            {
              color:
                sports?.length > 0 && sports.includes(item)
                  ? colors.black
                  : colors.white,
            },
          ]}>
          {item}
        </Text>
      </Pressable>
    );
  };
  const VirtualizedList = () => {
    return (
      <>
        <View style={style.input_view}>
          <Text style={style.heading}>Athlete #{athletePosition + 1} Info</Text>

          <Text style={style.input_heading}>{strings.fname}</Text>
          <TextInput
            value={fName}
            onChangeText={setFName}
            keyboardType="default"
            placeholder="Name"
            style={style.input}></TextInput>
          <Text style={style.input_heading}>{strings.lname}</Text>
          <TextInput
            keyboardType="default"
            placeholder="Last Name"
            value={lName}
            onChangeText={setLName}
            style={style.input}></TextInput>
          <Text style={style.input_heading}>{strings.GENDER}</Text>
          <TextInput
            value={gender}
            onChangeText={setGender}
            keyboardType="default"
            placeholder="Choose Gender"
            style={style.input}></TextInput>
          <Text style={style.input_heading}>EMAIL</Text>
          <TextInput
            value={email}
            enabled={false}
            keyboardType="default"
            placeholder="Email"
            style={style.input}></TextInput>
          <Text style={style.input_heading}>{strings.AGE}</Text>
          <TextInput
            placeholder="Age"
            value={age}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            onChangeText={setAge}
            style={style.input}></TextInput>
          <Text style={style.sports}>{strings.SPORTS}</Text>
          <Text style={style.choose}>{strings.CHOOSE_MU}</Text>
          <Text style={style.always}>{strings.always}</Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />

      <FlatList
        style={{paddingHorizontal: 20}}
        contentContainerStyle={{paddingBottom: 40}}
        data={strings.GAMES}
        numColumns={3}
        renderItem={renderItem}
        ListHeaderComponent={VirtualizedList()}
        ListFooterComponent={
          <LinearGradientButton
            heading={strings.SAVE}
            onClick={() => updateAthlete()}></LinearGradientButton>
        }></FlatList>
    </SafeAreaView>
  );


};
export default AtheleteStatistics;
