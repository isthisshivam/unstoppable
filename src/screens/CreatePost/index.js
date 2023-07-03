import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import ImagePicker from 'react-native-image-crop-picker';
import {getStoreData, showToastMessage} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import storage from '@react-native-firebase/storage';
import ImagePickerBottomSheet from '../../components/ImagePickerBottomSheet';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import moment from 'moment';
const CreatePost = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const refRBSheet = useRef();
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [teamFeed, setTeamFeed] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      pullUserPersonalInfo();
      return () => {};
    }, []),
  );

  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          console.log('querySnapshot=', querySnapshot?._data);
          setUserName(querySnapshot?._data?.displayName);
          setUserImage(querySnapshot?._data?.profile);
        }
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
            setImage(url);
          })
          .catch(e => {
            setLoading(false);
            console.log('getting downloadURL of image error => ', e);
          });
      })
      .catch(e => console.log('uploading image error => ', e));
  };

  const post = async () => {
    let feed = {
      comment_count: 0,
      created_at: moment().format(),
      image: image,
      liked: true,
      message: message,
      type: image ? 'text&image' : 'text',
      user_id: global?.Uid,
      user_name: global.UserInfo.userinfo.displayName,
      user_profile: userImage,
      likes_count: 0,
      likes: [],
    };
    console.log('feedddd=', feed);

    await firestore()
      .collection('TeamFeed')
      .add(feed)
      .then(() => {
        navigation.navigate('TeamFeed');
      })
      .catch(e => {});
  };

  const Header = () => {
    return (
      <View style={style.header_view}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.back_click}>
          <Image style={style.img_20} source={images.downarrow}></Image>
        </TouchableOpacity>
        <Text style={style.header_heading}>{'Create Post'}</Text>
        <TouchableOpacity
          onPress={() => message.length > 0 && post()}
          style={message.length > 0 ? style.post_btn : style.post_btn_disabled}>
          <Text style={message.length > 0 ? style.post : style.post_disables}>
            POST
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[{backgroundColor: colors.black, flex: 1}]}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      keyboardVerticalOffset={40}>
      <Header />
      <ImagePickerBottomSheet
        openCamera={() => pickORCapture('CAMERA')}
        openFiles={() => pickORCapture('GALLERY')}
        reference={refRBSheet}
      />
      <ScrollView>
        <View
          style={{
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 40,
              width: 40,
              resizeMode: 'cover',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.white,
            }}
            source={{uri: userImage}}></Image>
          <Text
            style={{
              margin: 10,
              color: colors.white,
              lineHeight: 23,
              fontSize: 14,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {name}
          </Text>
        </View>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholderTextColor={colors.white}
          placeholder="Share What's on your mind?"
          style={{
            padding: 17,
            color: colors.white,
            lineHeight: 23,
            fontFamily: 'Montserrat-Regular',
          }}
          multiline></TextInput>
        {image ? (
          <TouchableOpacity onPress={() => pickORCapture()}>
            <ImageBackground
              resizeMode="cover"
              style={{height: 400, width: '100%'}}
              source={{uri: image}}></ImageBackground>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => pickORCapture()} style={style.touch}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={images.plus}></Image>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default CreatePost;
