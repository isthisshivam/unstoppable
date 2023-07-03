import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {
  getStoreData,
  setStoreData,
  showToastMessage,
} from '../../utils/utilities';
import colors from '../../constants/colors';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradientButton from '../../components/GradientButton';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import strings from '../../constants/strings';
import ImagePickerBottomSheet from '../../components/ImagePickerBottomSheet';
//var selectedSports = [];
var sportid = 'J7AOxQTL2h7WQbQuuCG7';
const EditAtheleteProfile = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [multiple, setMultiple] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const refRBSheet = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedSports, setSelectedSports] = useState([]);
  useEffect(() => {
    pullUserPersonalInfo();
    getSports();
  }, []);
  const getSports = async () => {
    let data = [];
    setLoading(true);
    await firestore()
      .collection('Sports')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('getSports=', {id: doc.id, data: doc.data()});
          data.push({id: doc.id, data: doc.data()});
        });
        setSports(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          console.log('querySnapshot=', querySnapshot._data);
          setFName(querySnapshot?._data?.first_name);
          setLName(querySnapshot?._data?.last_name);
          setEmail(querySnapshot?._data?.email);
          setUserImage(querySnapshot?._data?.profile);
          setPassword(querySnapshot?._data?.password);
          if (typeof querySnapshot?._data.sport_name != 'undefined')
            setSelectedSports(querySnapshot?._data.sport_name);
          var data = querySnapshot?._data.sport_name;
          console.log('sport_name=', querySnapshot?._data.sport_name);
          let index = data.findIndex(obj => obj.name == 'Baseball');
          //if (data.length > 0) console.log(`timeshicjeinf=>`, data[index].name);
          //data[index].time = parseInt(selectedSports[index].day + 1);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  const updateProfile = async () => {
    if (selectedSports.length == 0) {
      showToastMessage('Please select atleast one sport');
      return;
    }
    console.log({selectedSports});

    console.log('updateProfile=>', {
      displayName: `${fName} ${lName}`,
      first_name: fName,
      last_name: lName,
      email: email,
      profile: userImage,
      sport_name: selectedSports,
    });

    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .update({
        displayName: `${fName} ${lName}`,
        first_name: fName,
        last_name: lName,
        email: email,
        profile: userImage,
        sport_name: selectedSports,
      })
      .then(data => {
        showToastMessage('Profile has been Updated');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 500);
      })
      .catch(e => {
        console.log('pushUserPersonalInfo.catch', e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const updateUserInfoToLocal = async () => {
  //   const {user_type} = userInformation;
  //   alert(user_type);
  //   let info = {
  //     uid: userInformation.uid,
  //     userinfo: {
  //       displayName: `${fName} ${lName}`,
  //       email: email,
  //       first_name: fName,
  //       last_name: lName,
  //       password: userInformation.password,
  //       points: userInformation.points,
  //       profile: userImage,
  //       sport_name: sports,
  //       user_type: JSON.parse(userInformation.user_type),
  //     },
  //   };
  //   console.log('updateUserInfoToLocal==');
  //   return;
  //   await setStoreData('LOGGEDIN_USER', info).then(() => {
  //     setTimeout(() => {
  //       setLoading(false);
  //       showToastMessage('Profil has been Updated');
  //       navigation.navigate('Home');
  //     }, 1000);
  //   });
  // };

  const pickORCapture = TYPE => {
    refRBSheet.current.open();
    if (TYPE == 'CAMERA') {
      ImagePicker.openCamera({
        width: 400,
        height: 300,
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.8,
        compressImageMaxWidth: 400,
        compressImageMaxHeight: 300,
      })
        .then(image => {
          refRBSheet.current.close();
          generateImage(image);
        })
        .catch(e => {
          console.log(JSON.stringify(e.message));
        });
    } else if (TYPE == 'GALLERY') {
      ImagePicker.openPicker({
        width: 400,
        height: 300,
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.8,
        compressImageMaxWidth: 400,
        compressImageMaxHeight: 300,
      })
        .then(image => {
          refRBSheet.current.close();
          generateImage(image);
        })
        .catch(e => {
          console.log(JSON.stringify(e.message));
          refRBSheet.current.close();
        });
    }
  };
  const generateImage = async data => {
    setTimeout(() => {
      setLoading(true);
    }, 300);
    const localUri = data.path;
    const filename = localUri.split('/').pop();
    let fileType = data.mime;
    const File = {
      uri: localUri,
      name: filename,
      type: fileType,
    };
    console.log('localUri', data);

    uploadFileToFirebaseStorage(localUri, filename);
  };
  const uploadFileToFirebaseStorage = (path, imageName) => {
    let reference = storage().ref(imageName);
    let task = reference.putFile(path);
    task
      .then(() => {
        console.log(`${imageName} has been successfully uploaded.`);
        let imageRef = firebase.storage().ref('/' + imageName);
        imageRef
          .getDownloadURL()
          .then(url => {
            console.log(`${imageName} has been downloaded uploaded.`, url);
            setUserImage(url);
            updateUserImage(url);
          })
          .catch(e => {
            setLoading(false);
            console.log('getting downloadURL of image error => ', e);
          });
      })
      .catch(e => console.log('uploading image error => ', e));
  };
  const updateUserImage = async link => {
    console.log('pushUserPersonalInfo.payload', {
      profile: link,
    });

    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .update({
        profile: link,
      })
      .then(res => {
        console.log('updateUserImage.success');
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(e => {
        console.log('updateUserImage.catch', e);
        setLoading(false);
      });
  };
  const onItemClick = value => {
    const {index, item} = value;
    //all previous working code starts
    // let selectedItem = {...item.data, day: 1};
    // if (selectedSports.length > 0) {
    //   selectedSports.forEach(value => {
    //     if (value?.name === item?.data?.name) {
    //       selectedItem = value;
    //     } else {
    //       selectedItem = value;
    //     }
    //   });
    // }
    // console.log('onItemClick=>', selectedItem);
    // sports[index].data.isSelected = !sports[index]?.data.isSelected;
    // if (sports[index]?.data?.isSelected) {
    //   //selectedSports.push({id: item.id, name: item.data.name, day: 1});
    //   if (selectedItem != null) selectedSports.push(selectedItem);
    //   setSelectedSports(selectedSports);
    // } else {
    //   let filteredData = selectedSports.filter(
    //     value => value?.name != item?.data?.name,
    //   );
    //   setSelectedSports(filteredData);
    // }
    // setIsUpdating(!isUpdating);
    // setSports(sports);
    //all previous working code ends

    //new code starts here
    console.log('onItemClick=>', selectedSports[index].data.isSelected);
    selectedSports[index].data.isSelected =
      !selectedSports[index]?.data.isSelected;
    setSelectedSports(selectedSports);
    setIsUpdating(!isUpdating);

    //very old code
    // setSports(sport =>
    //   sport.includes(value.data.name)
    //     ? sport.filter(n => n !== value)
    //     : [value, ...sport],
    // );
    ///  sports[]
  };

  useEffect(() => {
    //console.log('selectedSports=>', selectedSports);
  }, [selectedSports]);
  const renderItem = item => {
    return (
      <Pressable
        onPress={() => [onItemClick(item)]}
        style={[
          style.item,
          // {
          //   backgroundColor: selectedSports.some(
          //     data => data?.name == item?.item?.data?.name,
          //   )
          //     ? colors.white
          //     : colors.black,
          // },
          {
            backgroundColor: item?.item?.data?.isSelected
              ? colors.white
              : colors.black,
          },
        ]}>
        <Text
          style={[
            style._item,
            {
              color: item?.item?.data?.isSelected ? colors.black : colors.white,
            },
          ]}>
          {item?.item?.data?.name}
        </Text>
      </Pressable>
    );
  };
  const VirtualizedList = () => {
    return (
      <>
        <ImageBackground style={style.img_back} source={images.profileb}>
          <View style={style.img_v}>
            <TouchableOpacity onPress={() => navigation.navigate('Homee')}>
              <Image style={style.arrow} source={images.downarrow}></Image>
            </TouchableOpacity>
            <Text style={style.heading}>{strings.editprofile}</Text>
            <View></View>
          </View>

          <ImageBackground
            source={{uri: userImage}}
            borderRadius={50}
            borderWidth={1}
            borderColor={colors.white}
            style={style.man}
            resizeMode={'cover'}></ImageBackground>
          <Text onPress={() => refRBSheet.current.open()} style={style.change}>
            {strings.change}
          </Text>
        </ImageBackground>
        <View style={style.input_view}>
          <TextInput
            value={fName}
            onChangeText={setFName}
            keyboardType="default"
            placeholder="First Name"
            style={style.input}></TextInput>

          <TextInput
            value={lName}
            onChangeText={setLName}
            keyboardType="default"
            placeholder="Last Name"
            style={style.input1}></TextInput>
          <TextInput
            editable={false}
            value={email}
            onChangeText={setEmail}
            keyboardType="default"
            placeholder="Email"
            style={[
              style.input1,
              {backgroundColor: colors.blackShade_s},
            ]}></TextInput>

          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            placeholder="Password"
            style={style.input1}></TextInput>
          {global.UserType == strings.coach && (
            <Text style={style.sport}>{strings.SPORTS}</Text>
          )}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <ImagePickerBottomSheet
        openCamera={() => pickORCapture('CAMERA')}
        openFiles={() => pickORCapture('GALLERY')}
        reference={refRBSheet}
      />
      <Loader isLoading={loading}></Loader>

      <FlatList
        style={{paddingHorizontal: 0}}
        contentContainerStyle={{paddingBottom: 40}}
        data={selectedSports}
        extraData={isUpdating && selectedSports}
        numColumns={3}
        renderItem={renderItem}
        ListHeaderComponent={VirtualizedList()}
        ListFooterComponentStyle={{paddingHorizontal: 20}}
        ListFooterComponent={
          <LinearGradientButton
            heading={strings.UPDATE}
            onClick={() => updateProfile()}></LinearGradientButton>
        }></FlatList>
    </SafeAreaView>
  );
};
export default EditAtheleteProfile;
