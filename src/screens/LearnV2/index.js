import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Animated,
  Pressable,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';
import colors from '../../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import BoxView from '../../components/BoxView';
import strings from '../../constants/strings';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import FastImage from 'react-native-fast-image';
const LearnV2 = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [coachCorner, setCoachCorner] = useState([]);
  const [coyDetails, setCoyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCategoriesId();
  }, []);

  const getCategoriesId = async () => {
    setLoading(true);
    await firestore()
      .collection('Category')
      .onSnapshot(querySnapshot => {
        let doc_id = '';
        let coy_id = '';
        querySnapshot.forEach(doc => {
          if (doc.data().title == 'Coaches Corner') {
            doc_id = doc.id;
          } else if (doc.data().title == 'COY') {
            coy_id = doc.id;
          }
        });
        setTimeout(() => {
          getCoachCategorieData(doc_id);
          getCoachOfYear(coy_id);
        }, 100);
      });
  };
  const getCoachCategorieData = async category_id => {
    console.log('category_id=', category_id);
    await firestore()
      .collection('UnStoppableCategoryData')
      .where('category', '==', category_id)
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          console.log('getCoachCategorieData=', doc._data);
          let value = {
            id: doc.id,
            data: doc.data(),
          };
          data.push(value);
        });
        setCoachCorner(data);
      });
  };
  const getCoachOfYear = async category_id => {
    console.log('category_id=', category_id);
    await firestore()
      .collection('UnStoppableCategoryData')
      .where('category', '==', category_id)
      .onSnapshot(querySnapshot => {
        let details = null;
        querySnapshot.forEach(doc => {
          console.log('getCoachOfYear=', doc._data);
          details = {
            id: doc.id,
            data: doc.data(),
          };
        });
        setCoyDetails(details);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };
  const renderCoaches = ({item}) => {
    console.log('rendercoaches==', item.data.category, item?.id);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('CoachCorner', {
            category_id: item?.data.category,
            doc_id: item?.id,
            section: 'CoachCorner',
            title: item.data.title,
          })
        }
        style={style.coach}>
        <View style={style.flex_75}>
          <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={style.health}>{item?.data?.subTitle}</Text>
            <Text style={style.maintain}>{item?.data?.title}</Text>
          </View>
        </View>
        <FastImage
          source={{uri: item.data.image}}
          style={style.img_70}></FastImage>
        {/* <Image source={images.man} style={style.img_70}></Image> */}
      </Pressable>
    );
  };
  const ListHeaderComponent = () => {
    return (
      <View style={style.list_view}>
        <ImageBackground style={style.image} source={images.backone}>
          <View style={style.imahge}>
            <View>
              <Text style={style.title}>{strings.coach_corner}</Text>
              <Text style={style.explore}>{strings.leanv}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('SavedPrograms')}>
              <Image style={style.img_30} source={images.savewhite}></Image>
            </Pressable>
          </View>
        </ImageBackground>
        <Pressable
          onPress={() =>
            navigation.navigate('CoachCorner', {
              category_id: coachCorner[0]?.data?.category,
              doc_id: coachCorner[0]?.data?.id,
              section: 'CoachCorner',
              title: coachCorner[0]?.data?.title,
            })
          }
          style={style.center}>
          <ImageBackground
            resizeMode="cover"
            borderRadius={10}
            style={style.images}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unstoppable-bda30.appspot.com/o/fea.png?alt=media&token=bbe3c0eb-754e-476b-aeff-137553083a0e',
            }}>
            <Text style={style.feature}>{coyDetails?.data?.title}</Text>
            <Text numberOfLines={1} style={style.train}>
              {/* {coyDetails?.data?.description} */}
              {coachCorner[0]?.data?.title}
            </Text>
          </ImageBackground>
        </Pressable>

        <View style={style.view}>
          <FlatList
            data={coachCorner}
            listKey="renderCoaches"
            style={style.coach_list}
            renderItem={renderCoaches}
            contentContainerStyle={style.coach_list_s}></FlatList>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <Loader isLoading={loading}></Loader>
      <FlatList
        ListHeaderComponent={<ListHeaderComponent />}
        style={style.list}></FlatList>
    </SafeAreaView>
  );
};
export default LearnV2;
