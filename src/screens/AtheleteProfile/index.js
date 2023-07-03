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
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from '../AtheleteProfile/style';
import {
  removeStoreData,
  showToastMessage,
  setStoreData,
  getStoreData,
} from '../../utils/utilities';
import {dW, dH} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import moment from 'moment';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Tooltip from 'react-native-walkthrough-tooltip';
import ProfileLane from '../../components/ProfileLane';
import InBuildAppModal from '../../components/AppModal';
import EditBuildAppModal from '../../components/EditProfileModa';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import strings from '../../constants/strings';
import auth from '@react-native-firebase/auth';
import {differenceInSeconds, setSeconds} from 'date-fns';
const AtheleteProfile = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [tip, showTip] = useState(false);
  const [isLogoutModal, setLogoutModalVisibility] = useState(false);
  const [isDeleteAccModal, setDeleteAccVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [point, setPoints] = useState('0');
  const [sport, setSport] = useState('');
  const [spentTime, setSpentTime] = useState(0);

  const saveEndTime = async () => {
    let end_time = new Date();
    await setStoreData('end_time', end_time);
    console.log('savinnn end_time: ', end_time);
    pullUserPersonalInfo();
  };

  useFocusEffect(
    React.useCallback(() => {
      saveEndTime();
    }, []),
  );

  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .get()
      .then(querySnapshot => {
        console.log('querySnapshot=', querySnapshot?._data);
        if (querySnapshot) {
          console.log('querySnapshot=', querySnapshot?._data);
          setUserName(querySnapshot?._data?.displayName);
          setUserImage(querySnapshot?._data?.profile);
          setPoints(querySnapshot?._data?.points);

          if (
            querySnapshot?._data?.sport_name &&
            querySnapshot?._data?.sport_name.length > 0
          ) {
            setSport(
              querySnapshot?._data?.sport_name.filter(
                data => data.data.isSelected === true,
              ),
            );
          }
        }
        convertMilliSecondsIntoLegibleString(
          querySnapshot?._data?.sessionDuration,
        );
        setLoading(false);
      });
  };
  const convertMilliSecondsIntoLegibleString = async prevoiusSavedTime => {
    const storedEndTime = await getStoreData('end_time');
    const storedStartTime = await getStoreData('start_time');
    let millis =
      new Date(storedEndTime).getTime() - new Date(storedStartTime).getTime();
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    console.log('result:', minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
    setSpentTime(prevoiusSavedTime + minutes);
  };

  const logout = async () => {
    await removeStoreData('LOGGEDIN_USER');
    setLogoutModalVisibility(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'GetStarted'}],
      }),
    );
  };
  const deleteAccount = async () => {
    await removeStoreData('LOGGEDIN_USER');
    await auth().currentUser.delete();
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .delete()
      .then(() => {
        showToastMessage('Account deleted successfully');
        setDeleteAccVisibility(false);
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'GetStarted'}],
            }),
          );
        }, 1000);
      })
      .catch(e => {
        showToastMessage(e?.message);
      });
  };

  const TooltipMenu = () => {
    return (
      <Tooltip
        isVisible={tip}
        contentStyle={style.tt_cc}
        content={
          <TouchableOpacity
            onPress={() => alert('In progress')}
            style={style.tt_btn}>
            <ScrollView>
              <View style={style.tt_cc1}>
                <ImageBackground
                  borderRadius={14}
                  style={style.profile_img}
                  source={images.profileb}>
                  <Image style={style.img_10_10} source={images.share}></Image>
                </ImageBackground>
                <Text style={style.editProfile_heading}>{'Edit Profile'}</Text>
              </View>
            </ScrollView>
          </TouchableOpacity>
        }
        onClose={() => showTip(false)}
        placement={'left'}
        topAdjustment={dH(30)}>
        <Text></Text>
      </Tooltip>
    );
  };

  const renderSportsName = ({item}) => {
    return (
      <Text style={style.h2}>
        {sport.length == 1 ? item.data.name : item.data.name + ','}
      </Text>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      {/* {tip && <TooltipMenu></TooltipMenu>} */}
      <InBuildAppModal
        canclePress={() => setLogoutModalVisibility(false)}
        onMainClick={() => logout()}
        isVisible={isLogoutModal}
        rightBtnHeading={strings.CANCEL}
        heading={strings.logingout}
        subheading={strings.willmiss}
        leftBtnHeading={strings.LOGOUT}></InBuildAppModal>
      <EditBuildAppModal
        icon={images.share}
        heading={'Edit Profile'}
        canclePress={() => showTip(false)}
        onMainClick={() => navigation.navigate('EditAtheleteProfile')}
        isVisible={tip}></EditBuildAppModal>
      <InBuildAppModal
        canclePress={() => setDeleteAccVisibility(false)}
        onMainClick={() => deleteAccount()}
        isVisible={isDeleteAccModal}
        rightBtnHeading={strings.CANCEL}
        heading={strings.deleconfirm}
        subheading={strings.ableback}
        leftBtnHeading={'DELETE'}></InBuildAppModal>
      <ScrollView>
        <ImageBackground
          style={[style.parent_img_back]}
          source={images.profileb}>
          <View style={style.padding_20}>
            <View style={style.view_1}>
              <View style={style.view_inn1}></View>
              <ImageBackground
                source={{uri: userImage}}
                borderRadius={55}
                borderWidth={1}
                borderColor={colors.white}
                style={style.imageBack_90_90}
                resizeMode={'cover'}></ImageBackground>
              <TouchableOpacity
                style={style.trip_click}
                onPress={() => [showTip(true)]}>
                <Image
                  style={style.img_20_20}
                  source={images.whitemenu}></Image>
              </TouchableOpacity>
            </View>
            <Text style={style.name_h1}>{name}</Text>
            <Pressable style={style.jc_center}>
              <View style={style.fd_row_aI_center_jc_center}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={sport}
                  //horizontal
                  numColumns={2}
                  //  style={{flex: 0.7}}
                  renderItem={renderSportsName}></FlatList>
                <Pressable
                  onPress={() => navigation.navigate('EditAtheleteProfile')}>
                  <Image
                    style={[style.img_10_10, {flex: 0.3}]}
                    source={images.edit}></Image>
                </Pressable>
              </View>
            </Pressable>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // justifyContent: 'space-around',
                // marginHorizontal: 30,
              }}>
              <View
                style={{
                  opacity: 0.6,
                  height: 60,
                  marginRight: 10,
                  width: 100,
                  alignSelf: 'center',
                  marginTop: 10,
                  backgroundColor: colors.white,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{height: 25, width: 25}}
                    source={images.star}></Image>
                  <Text
                    style={{
                      color: colors.gray,
                      fontFamily: 'Montserrat-SemiBold',
                      marginLeft: 4,
                      fontSize: 17,
                    }}>
                    {point}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 4,
                    color: colors.gray,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                  }}>
                  Points
                </Text>
              </View>
              <View
                style={{
                  opacity: 0.6,
                  height: 60,
                  width: 100,
                  alignSelf: 'center',
                  marginTop: 10,
                  backgroundColor: colors.white,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Image
                    style={{height: 25, width: 25}}
                    source={images.watch}></Image>
                  <Text
                    key={spentTime}
                    style={{
                      color: colors.gray,
                      fontFamily: 'Montserrat-SemiBold',
                      marginLeft: 4,
                      fontSize: 12,
                    }}>
                    {spentTime}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 4,
                    color: colors.gray,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                  }}>
                  Minutes
                </Text>
              </View>
            </View>
            <View style={{marginTop: 40}}></View>
            <ProfileLane
              onClick={() => navigation.navigate('SavedPrograms')}
              heading={strings.myprog}
              icon={images.program}></ProfileLane>
            <ProfileLane
              onClick={() => navigation.navigate('MySchedule')}
              heading={strings.mysche}
              icon={images.calender}></ProfileLane>

            {global.UserType == strings.athletew && (
              <ProfileLane
                onClick={() => navigation.navigate('InviteCoach')}
                heading={strings.invitecoach}
                icon={images.coach}></ProfileLane>
            )}

            <ProfileLane
              onClick={() => setLogoutModalVisibility(true)}
              heading={strings.log}
              icon={images.lwhite}></ProfileLane>
            <TouchableOpacity
              onPress={() => setDeleteAccVisibility(true)}
              style={style.dele_btn}>
              <Text style={style.delete_heading}>{strings.deleteacc}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AtheleteProfile;
