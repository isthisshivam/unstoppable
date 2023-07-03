import BottomSheet from '@gorhom/bottom-sheet';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Portal, PortalHost} from '@gorhom/portal';
import images from '../assests/images';
import {useNavigation} from '@react-navigation/native';
import strings from '../constants/strings';
import colors from '../constants/colors';
import {dH, dW} from '../utils/dynamicHeightWidth';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ExploreLane from './ExploreLane';
import useStyle from '../constants/style';
const AddBottomSheet = () => {
  const styles = useStyle();
  // Creates a reference to the DOM element that we can interact with
  const bottomSheetRef = useRef();
  const navigation = useNavigation();
  // Setting the points to which we want the bottom sheet to be set to
  // Using '-30' here so that it is not seen when it is not presented
  const snapPoints = React.useMemo(() => [-30, '80%'], []);

  // Callback function that gets called when the bottom sheet changes
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Expands the bottom sheet when our button is pressed
  const onAddButtonPress = () => {
    bottomSheetRef?.current?.open();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onAddButtonPress}>
        <View style={styles.bottom}>
          <Image
            resizeMode="contain"
            style={styles.bottom_img}
            source={images.plus}></Image>
        </View>
      </TouchableWithoutFeedback>
      <Portal>
        <RBSheet
          height={320}
          openDuration={250}
          closeonDrag={true}
          ref={bottomSheetRef}
          customStyles={{
            container: {borderRadius: 19},
            draggableIcon: {
              backgroundColor: colors.black,
            },
          }}>
          <View style={styles.contentContainer}>
            <>
              <View style={styles.laeg}>
                <Text style={styles.explore}>Explore</Text>
                <TouchableOpacity
                  onPress={() => bottomSheetRef.current.close()}
                  style={styles.close}>
                  <Image style={styles.close_img} source={images.cross}></Image>
                </TouchableOpacity>
              </View>

              <ExploreLane
                onClick={() => [
                  bottomSheetRef.current.close(),
                  navigation.navigate('SavedPrograms'),
                ]}
                heading={'My programs'}
                icon={images.myprogram}></ExploreLane>
              <ExploreLane
                onClick={() => [
                  navigation.navigate('MySchedule'),
                  bottomSheetRef.current.close(),
                ]}
                heading={'My schedule'}
                icon={images.schedule}></ExploreLane>
              <ExploreLane
                onClick={() => [
                  bottomSheetRef.current.close(),
                  navigation.navigate('CompletedWorkout'),
                ]}
                heading={'Completed workouts'}
                icon={images.completeworkout}></ExploreLane>
              {/* {global.UserType == strings.athletew && (
                <ExploreLane
                  onClick={() => [
                    bottomSheetRef.current.close(),
                    navigation.navigate('DirectMessages'),
                  ]}
                  heading={'Message my coach'}
                  icon={images.messagechat}></ExploreLane>
              )} */}
              {global.UserType == strings.coach && (
                <ExploreLane
                  onClick={() => [
                    bottomSheetRef.current.close(),
                    navigation.navigate('EnterOrInviteTeam'),
                  ]}
                  heading={'My Team'}
                  icon={images.myprogram}></ExploreLane>
              )}
            </>
          </View>
        </RBSheet>
      </Portal>
    </>
  );
};

export default AddBottomSheet;
