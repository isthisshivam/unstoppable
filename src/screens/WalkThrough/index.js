import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  Text,
  Animated,
} from 'react-native';
import usePallete from '../../assests/Pallete';
import {
  useNavigation,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import images from '../../assests/images/index';
import useStyle from './style';

import colors from '../../constants/colors';
import PrimaryHeader from '../../components/PrimaryHeader';
import PrimaryButton from '../../components/PrimaryButton';
import strings from '../../constants/strings';
var i = 1;
const WalkThrough = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const flatListRef = useRef();
  const [userType] = useState(props.route.params);
  const onViewRef = React.useRef(({viewableItems}: any) => {
    //setinitialPage(viewableItems[0].index);
  });

  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  var scrollX = React.useRef(new Animated.Value(0)).current;

  const animate = value => {
    if (i < 3) {
      flatListRef.current.scrollToIndex({
        index: value,
        animated: true,
      });
    } else {
      navigateToHome();
    }
  };

  function navigateToHome() {
    i = 1;

    navigation.navigate('ChooseSport', userType);
    return;
    userType == strings.coach
      ? navigation.navigate('ChooseSport', userType)
      : navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
  }

  const One = () => {
    return (
      <View style={style.outer_c}>
        <Text style={style.heading}>{strings.mobility}</Text>
        <Text style={style.desc}>{strings.one} </Text>
        <ImageBackground
          resizeMode="contain"
          style={style.main_img}
          source={images.mobility}></ImageBackground>
      </View>
    );
  };
  const Two = () => {
    return (
      <View style={style.outer_c}>
        <Text style={style.heading}>{strings.temand}</Text>
        <Text style={style.desc}>{strings.two}</Text>
        <ImageBackground
          resizeMode="contain"
          style={style.main_img}
          source={images.edit_team}></ImageBackground>
      </View>
    );
  };
  const Three = () => {
    return (
      <View style={style.outer_c}>
        <Text style={style.heading}>{strings.coach_corner}</Text>
        <Text style={style.desc}>{strings.three}</Text>
        <ImageBackground
          resizeMode="contain"
          style={style.main_img}
          source={images.MobilityCoach}></ImageBackground>
      </View>
    );
  };

  const getSteps = () => {
    //  return [<One />, <Two />];
    return userType == strings.coach
      ? [<Two />, <Three />]
      : [<One />, <Three />];
  };

  const ViewPager = () => {
    return (
      <Animated.FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={getSteps()}
        renderItem={(item, index) => {
          return item.item;
        }}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
    );
  };
  return (
    <SafeAreaView
      style={[pallete.mainContainor, {backgroundColor: colors.black}]}>
      <PrimaryHeader onClick={() => navigation.goBack()}></PrimaryHeader>
      <ViewPager></ViewPager>
      <View style={style.absolute_v}>
        <PrimaryButton
          heading={strings.NEXT}
          onClick={() => animate(i++)}></PrimaryButton>
      </View>
    </SafeAreaView>
  );
};
export default WalkThrough;
