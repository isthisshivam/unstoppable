import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  ScrollView,
  Modal,
  Share,
} from 'react-native';
import {DownloadDirectoryPath, readFile, writeFile} from 'react-native-fs';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData, showToastMessage} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import PrimaryButton from '../../components/PrimaryButton';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import UserTypeLane from '../../components/UserTypeLane';
import PrimaryHeader from '../../components/PrimaryHeader';
import MyTeamListLane from '../../components/MyTeamListLane';
import InvieTeamView from '../../components/InviteTeamView';
import EditTeamModal from '../../components/EditTeamModal';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import strings from '../../constants/strings';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import ImagePickerBottomSheet from '../../components/ImagePickerBottomSheet';

const EnterOrInviteTeam = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [isVisible, setVisible] = useState(false);
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importedAtheletes, setImportedAthelets] = useState([]);
  const [selectedAtheleteInfo, setSelectedAtheleteInfo] = useState(null);
  const [counter, setCounter] = useState(0);
  const [userImage, setUserImage] = useState(null);
  const refRBSheet = useRef();

  useEffect(() => {
    if (importedAtheletes.length > 0) {
      if (counter != importedAtheletes.length) {
        // uploadAtheletes();
      } else {
      }
    }
  }, [importedAtheletes, counter]);

  const fetchCoachCode = async () => {
    await firestore()
      .collection('Users')
      .doc(global.Uid)
      .get()
      .then(querySnapshot => {
        setCode(querySnapshot?.data()?.code);
      });
  };

  const uploadAtheletes = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global.Uid)
      .collection('Team')
      .add(importedAtheletes[counter])
      .then(() => {
        setCounter(counter + 1);
        setLoading(false);
      })
      .catch(e => {
        console.log('pushUserPersonalInfo.catch', e);
        setLoading(false);
      });
  };
  const importData = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv],
      });
      readFile(res[0].uri, 'ascii').then(res => {
        const wb = XLSX.read(res, {type: 'binary'});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {header: 1});
        var temp = [];
        for (let i = 1; i < data.length; i++) {
          if (data[i].length > 0) {
            temp.push({
              first_name: data[i][0],
              last_name: data[i][1],
              age: data[i][2],
              profile: data[i][3],
            });
          }
        }
        setImportedAthelets(temp);
      });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
      } else {
        //For Unknown Error
        showToastMessage(JSON.stringify(err));
        throw err;
      }
    }
  };
  useEffect(() => {
    // buildLink();
    pullUserPersonalInfo();
    // fetchCoachCode();
  }, []);
  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .where('coachId', 'array-contains', global?.Uid)
      // .where('user_type', '==', strings.athletew)
      // .doc(global?.Uid)
      // .collection('Team')
      .onSnapshot(querySnapshot => {
        // let data = [];
        // querySnapshot.forEach(doc => {
        //   let value = {
        //     id: doc.id,
        //     data: doc.data(),
        //   };
        //   data.push(value);
        // });
        setMyTeams(querySnapshot.docs);
        setLoading(false);
      });
  };
  const deleteTeamMember = async () => {
    console.log('updatedCoach before', selectedAtheleteInfo?._data?.coachId);

    const updatedCoach = selectedAtheleteInfo?._data?.coachId.filter(
      coach => coach !== global?.Uid,
    );

    console.log('updatedCoach after', updatedCoach);

    let dbRef = await firestore()
      .collection('Users')
      // .doc(global?.Uid)
      // .collection('Team')
      .doc(selectedAtheleteInfo?.id);
    dbRef
      .update({coachId: updatedCoach})
      //  dbRef.coachId
      //   .delete(global?.Uid)
      .then(() => {
        showToastMessage('Team member has been removed.');
        // setTimeout(() => {
        //   navigation.goBack();
        //   // navigation.navigate('Home');
        // }, 100);
      })
      .catch(e => {
        console.log('pushUserPersonalInfo.catch', e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateUserImage = async link => {
    console.log('pushUserPersonalInfo.payload', {
      profile: link,
    });

    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .update({
        teamLogo: link,
      })
      .then(res => {
        showToastMessage('Team image updated successfully.');
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(e => {
        console.log('updateUserImage.catch', e);
        setLoading(false);
      });
  };

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

  const renderListHeaderComponent = () => {
    return (
      <>
        <Text style={style.heading}>{strings.enterteam}</Text>
        <View style={style.view}>
          <View style={style.view_45}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={style.viewh1}>
              <Image style={style.img} source={images.upload}></Image>
            </TouchableOpacity>
            <Text style={style.upload}>{strings.uploadfile}</Text>
          </View>
          <View style={style.view_45}>
            <TouchableOpacity
              onPress={
                () =>
                  navigation.navigate('CoachTeam', {
                    enterAthlete: true,
                    coachId: '',
                  })
                //   navigation.navigate('AtheleteInformation')
              }
              style={style.btn}>
              <Image style={style.img} source={images.loho}></Image>
            </TouchableOpacity>
            <Text style={style.upload}>{strings.Enter_Athelete}</Text>
          </View>
        </View>
        <InvieTeamView />
        <Text style={style.heading}>{strings.myteam}</Text>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black, flex: 1}]}>
      <PrimaryHeader onClick={() => navigation.goBack()} />
      <ImagePickerBottomSheet
        openCamera={() => pickORCapture('CAMERA')}
        openFiles={() => pickORCapture('GALLERY')}
        reference={refRBSheet}
      />
      <Loader isLoading={loading}></Loader>
      <EditTeamModal
        isVisible={isVisible}
        onEditTeamPress={() => [
          setVisible(false),
          console.log('teamDeatil', selectedAtheleteInfo),
          navigation.navigate('EditTeam', selectedAtheleteInfo),
          //   navigation.navigate('EditTeam', selectedAtheleteInfo?.id),
          //  navigation.navigate('CoachTeam', {enterAthlete: true, coachId: ''}),
        ]}
        onMessagePress={() => [
          setVisible(false),
          navigation.navigate('Message', {
            receiver_id: selectedAtheleteInfo?.id,
            receiver_image: selectedAtheleteInfo?._data?.profile,
            receiver_name: selectedAtheleteInfo?._data?.first_name,
          }),
        ]}
        ath_name={selectedAtheleteInfo?._data?.first_name}
        canclePress={() => setVisible(false)}
        onRemoveMember={() => [setVisible(false), deleteTeamMember()]}
      />
      <FlatList
        ListHeaderComponent={renderListHeaderComponent}
        data={myTeams}
        renderItem={({item}) => (
          <MyTeamListLane
            onDotPress={info => [
              setSelectedAtheleteInfo(info),
              setVisible(true),
            ]}
            item={item}></MyTeamListLane>
        )}
        style={{paddingHorizontal: 20, flex: 1}}></FlatList>

      <PrimaryButton
        ex_style={[style.mt_30, {marginBottom: dW(20)}]}
        heading={strings.DONE}
        onClick={() => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          });

          setLoading(false);
        }}></PrimaryButton>
    </SafeAreaView>
  );
};
export default EnterOrInviteTeam;
