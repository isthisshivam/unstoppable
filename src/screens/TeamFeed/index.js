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
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import {getStoreData, showToastMessage} from '../../utils/utilities';
import {dW, dH, windowHeight} from '../../utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import HeaderWithHeading from '../../components/HeaderWithHeading';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import Messages from '../../components/Messages';
import EditBuildAppModal from '../../components/EditProfileModa';
import FastImage from 'react-native-fast-image';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import moment from 'moment';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import strings from '../../constants/strings';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';

const TeamFeed = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [teamFeed, setTeamFeed] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [likesss, setLikes] = useState([]);

  useEffect(() => {
    pullFeed();
  }, []);
  const pullFeed = async () => {
    await firestore()
      .collection('TeamFeed')
      .orderBy('created_at')
      .onSnapshot(querySnapshot => {
        const refArray = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'reffffff',
            documentSnapshot.data()?.likes && documentSnapshot.data()?.likes,
          );
          refArray.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
            isLiked:
              documentSnapshot.data()?.likes.length > 0 &&
              documentSnapshot
                .data()
                .likes.find(
                  e => e.user_id == global?.Uid && e.post_id == e.post_id,
                )
                ? true
                : false,
          });
        });
        setTeamFeed(refArray);
      });
  };

  const likeAFeed = async item => {
    const {index} = item;
    let data = [];
    console.log('likesssss== ', item.item.data.likes);

    const {
      created_at,
      liked,
      likes_count,
      message,
      comment_count,
      user_profile,
      user_name,
      type,
      image,
      post_id,
      likes,
    } = item.item.data;

    let like = {
      isLiked: true,
      user_id: global?.Uid,
      post_id: item?.item.id,
    };
    data.push(like);
    console.log('[...likes, like]=>', likes.concat(data));

    // return;

    await firestore()
      .collection('TeamFeed')
      .doc(item?.item.id)
      .update({likes: likes.concat(data)})
      .then(() => {
        teamFeed[index].isLiked = true;
        console.log('likeafeed=>', teamFeed[index].isLiked);
      })
      .catch(e => {
        console.log('cathc=>', e);
      });
    await firestore()
      .collection('TeamFeed')
      .doc(item?.item.id)
      .update({likes_count: likes_count + 1})
      .then(() => {
        teamFeed[index].likes_count = teamFeed[index].likes_count + 1;
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(e => {});
  };
  const dislikeAFeed = async item => {
    const {index} = item;
    const {
      likes_count,

      post_id,
      likes,
    } = item.item.data;

    await firestore()
      .collection('TeamFeed')
      .doc(item?.item.id)
      .update({
        likes: likes.filter(
          e => e.user_id != global?.Uid && e.post_id != post_id,
        ),
      })
      .then(() => {})
      .catch(e => {
        console.log('cathc=>', e);
      });
    await firestore()
      .collection('TeamFeed')
      .doc(item?.item.id)
      .update({likes_count: likes_count - 1})
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
        <Text style={style.header_heading}>{'Team Feed'}</Text>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={style.back_click1}>
          <Image style={style.img_20} source={images.menu}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFeed = item => {
    const {
      created_at,
      liked,
      likes_count,
      message,
      likes,
      comment_count,
      user_profile,
      user_name,
      type,
      image,
      post_id,
    } = item?.item?.data;
    const {id} = item?.item;
    console.log('refarray=', item.item.isLiked);

    if (type === 'text') {
      return (
        <View
          style={{
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: colors.blackShade_s,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <FastImage
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: 'cover',
                  borderRadius: 15,
                }}
                source={{uri: user_profile}}></FastImage>
              <View style={{paddingLeft: 10}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    textAlign: 'left',
                    lineHeight: 20,
                    color: colors.white,
                    fontSize: dW(13),
                    letterSpacing: 0,
                  }}>
                  {user_name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    textAlign: 'left',
                    lineHeight: 20,
                    color: colors.gray,
                    fontSize: dW(12),
                    letterSpacing: 0,
                  }}>
                  {moment(created_at).fromNow()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={style.back_click}>
              <Image style={style.img_20} source={images.menu}></Image>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              textAlign: 'left',
              marginTop: 8,
              lineHeight: 20,
              color: colors.white,
              fontSize: 15,
              letterSpacing: 0,
            }}>
            {message}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              {likes.find(
                e => e.user_id == global?.Uid && e.post_id == e.post_id,
              ) ? (
                <Pressable
                  onPress={() => dislikeAFeed(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{height: 17, width: 17}}
                    source={images.like}></Image>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      textAlign: 'left',
                      lineHeight: 20,
                      marginLeft: 5,
                      color: colors.white,
                      fontSize: dW(13),
                      letterSpacing: 0,
                    }}>
                    {likes_count}
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => likeAFeed(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{height: 17, width: 17}}
                    source={images.heart}></Image>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      textAlign: 'left',
                      lineHeight: 20,
                      marginLeft: 5,
                      color: colors.white,
                      fontSize: dW(13),
                      letterSpacing: 0,
                    }}>
                    {likes_count}
                  </Text>
                </Pressable>
              )}

              {/* <Pressable
                onPress={() =>
                  navigation.navigate('TeamFeedsComment', {post_id: id})
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={images.comment}></Image>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'left',
                    lineHeight: 20,
                    marginLeft: 5,
                    color: colors.white,
                    fontSize: dW(13),
                    letterSpacing: 0,
                  }}>
                  {comment_count}
                </Text>
              </Pressable> */}
            </View>
            {/* <Text
              onPress={() =>
                navigation.navigate('TeamFeedsComment', {post_id: id})
              }
              style={{
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'left',
                lineHeight: 20,

                color: colors.white,
                fontSize: dW(13),
                letterSpacing: 0,
              }}>
              Reply
            </Text> */}
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginTop: 10,
            paddingVertical: 15,
            borderRadius: 10,
            backgroundColor: colors.blackShade_s,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //  backgroundColor: 'red',
              paddingHorizontal: 15,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: 'cover',
                  borderRadius: 15,
                }}
                source={{uri: user_profile}}></Image>
              <View style={{paddingLeft: 10}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    textAlign: 'left',
                    lineHeight: 20,
                    color: colors.white,
                    fontSize: dW(13),
                    letterSpacing: 0,
                  }}>
                  {user_name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    textAlign: 'left',
                    lineHeight: 20,
                    color: colors.gray,
                    fontSize: dW(12),
                    letterSpacing: 0,
                  }}>
                  {moment(created_at).fromNow()}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={style.back_click}>
              <Image style={style.img_20} source={images.menu}></Image>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            <FastImage
              style={{height: 200, width: '100%'}}
              source={{uri: image}}></FastImage>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                textAlign: 'left',
                marginTop: 8,
                paddingHorizontal: 15,
                lineHeight: 20,
                color: colors.white,
                fontSize: 15,
                letterSpacing: 0,
              }}>
              {message}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              {likes.find(
                e => e.user_id == global?.Uid && e.post_id == e.post_id,
              ) ? (
                <Pressable
                  onPress={() => dislikeAFeed(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{height: 17, width: 17}}
                    source={images.like}></Image>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      textAlign: 'left',
                      lineHeight: 20,
                      marginLeft: 5,
                      color: colors.white,
                      fontSize: dW(13),
                      letterSpacing: 0,
                    }}>
                    {likes_count}
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => likeAFeed(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{height: 17, width: 17}}
                    source={images.heart}></Image>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      textAlign: 'left',
                      lineHeight: 20,
                      marginLeft: 5,
                      color: colors.white,
                      fontSize: dW(13),
                      letterSpacing: 0,
                    }}>
                    {likes_count}
                  </Text>
                </Pressable>
              )}

              {/* <Pressable
                onPress={() =>
                  navigation.navigate('TeamFeedsComment', {post_id: id})
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={images.comment}></Image>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'left',
                    lineHeight: 20,
                    marginLeft: 5,
                    color: colors.white,
                    fontSize: dW(13),
                    letterSpacing: 0,
                  }}>
                  {comment_count}
                </Text>
              </Pressable> */}
            </View>
            {/* <Text
              onPress={() =>
                navigation.navigate('TeamFeedsComment', {post_id: id})
              }
              style={{
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'left',
                lineHeight: 20,

                color: colors.white,
                fontSize: dW(13),
                letterSpacing: 0,
              }}>
              Reply
            </Text> */}
          </View>
        </View>
      );
    }
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: windowHeight() / 1.4,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePost')}
          style={style.touch}>
          <Image
            style={{height: 20, width: 20, resizeMode: 'contain'}}
            source={images.plus}></Image>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            color: colors.white,
            fontSize: 10,
            fontFamily: 'Montserrat-Regular',
          }}>
          Create feed
        </Text>
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
      <View style={[style.flex1]}>
        <SafeAreaProvider>
          <FlatList
            contentContainerStyle={style.paddingHorizontal}
            data={teamFeed}
            renderItem={renderFeed}
            ListEmptyComponent={ListEmptyComponent}></FlatList>
          <Loader isLoading={isLoading}></Loader>
          <EditBuildAppModal
            icon={images.write}
            heading={'Create Post'}
            canclePress={() => setModal(false)}
            onMainClick={() => navigation.navigate('CreatePost')}
            isVisible={modal}></EditBuildAppModal>
        </SafeAreaProvider>
      </View>
    </KeyboardAvoidingView>
  );
};
export default TeamFeed;
