import React, {useState, useEffect, useRef} from 'react';

import {
  createStackNavigator,
  TransitionPreset,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Splash from '../screens/Spalsh/index';
import GetStarted from '../screens/GetStarted';
import GetVash from '../screens/GetVash';
import WhoisLogging from '../screens/WhoisLogginIn';
import Login from '../screens/Login';
import Register from '../screens/Register';
import EnterCode from '../screens/EnterCode';
import FoundProfile from '../screens/FoundProfile';
import CoachTeam from '../screens/CoachTeam';

import RegisterAthelete from '../screens/RegisterAthelete';
import AtheleteInformation from '../screens/AtheleteInformation';
import ConfirmAthelete from '../screens/ConfirmAthelete';
import Subscription from '../screens/Subscription';
import ChooseSport from '../screens/ChooseSport';
import EnterOrInviteTeam from '../screens/EnterOrInviteTeam';
import AtheleteStatistics from '../screens/AtheleteStatistics';
import InviteCoach from '../screens/InviteCoach';
import WalkThrough from '../screens/WalkThrough';
import Home from '../screens/Home';
import LearnV2 from '../screens/LearnV2';
import CoachCorner from '../screens/CoachCorner';
import AtheleteProfile from '../screens/AtheleteProfile';
import EditAtheleteProfile from '../screens/EditAtheleteProfile';
import MyPrograms from '../screens/MyPrograms';
import images from '../assests/images';
import {dH, dW} from '../utils/dynamicHeightWidth';
import colors from '../constants/colors';
import InBuildAppModal from '../components/AppModal';
import AddBottomSheet from '../components/AddBottomSheet';
import DirectMessages from '../screens/DirectMessages';
import SearchOrCreateChat from '../screens/SearchOrCreateChat';
import Message from '../screens/Message';
import ForgotPassword from '../screens/ForgotPassword';
import EditTeam from '../screens/EditTeam';
import MySchedule from '../screens/MySchedule';
import TeamFeed from '../screens/TeamFeed';
import SavedPrograms from '../screens/SavedPrograms';
import Store from '../screens/Store';
import CompletedWorkout from '../screens/CompletedWorkout';
import TermsAndCondition from '../screens/Tems&Conditions';
import CreatePost from '../screens/CreatePost';
import TeamFeedsComment from '../screens/TeamFeedComments';
const Root = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const HomeStack = createStackNavigator();
  const AuthStack = createStackNavigator();
  const WalkThroughStack = createStackNavigator();
  const navigation = useNavigation();

  const AddScreenComponent = () => {
    return null;
  };
  const HomeStackView = () => {
    return (
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen
          options={{headerShown: false}}
          component={Home}
          name="Home"></HomeStack.Screen>
        <HomeStack.Screen
          options={{headerShown: false}}
          component={EditAtheleteProfile}
          name={'EditAtheleteProfile'}></HomeStack.Screen>
      </HomeStack.Navigator>
    );
  };

  const Tab_Navigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          tabBarActiveTintColor: colors.orange,
          tabBarInactiveTintColor: 'white',
          headerShown: false,
          tabBarStyle: {backgroundColor: colors.blackShade_s, paddingBottom: 4},
        }}>
        <Tab.Screen
          name={'Home'}
          component={HomeStackView}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              fontSize: 9,
              fontFamily: 'Montserrat-SemiBold',
              letterSpacing: 0.1,
              lineHeight: 11,
            },

            tabBarIcon: ({color, size}) => (
              <Image
                resizeMode="contain"
                style={{
                  height: dH(23),
                  //   marginTop: 0,
                  width: dW(23),
                  tintColor: color,
                }}
                source={images.home}></Image>
            ),
          }}
        />
        <Tab.Screen
          name={'AtheleteProfile'}
          component={AtheleteProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {
              fontSize: 9,
              fontFamily: 'Montserrat-SemiBold',
              letterSpacing: 0.1,
              lineHeight: 11,
              marginRight: 20,
            },
            tabBarIcon: ({color, size}) => (
              <Image
                resizeMode="contain"
                style={{
                  height: dH(22),
                  marginRight: 20,
                  width: dW(22),
                  tintColor: color,
                }}
                source={images.profile}></Image>
            ),
          }}
        />
        <Tab.Screen
          name={'AddScreenComponent'}
          component={AddScreenComponent}
          options={{
            tabBarButton: () => <AddBottomSheet />,
            tabBarLabel: '',
            // presentation: 'modal',
            tabBarIcon: ({color, size}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: colors.white,
                  borderWidth: 2,
                  height: 39,
                  width: 39,
                  borderRadius: 15,
                  marginTop: 12,
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: dH(39),
                    resizeMode: 'contain',
                    width: dW(39),
                    //tintColor: color,
                  }}
                  source={images.plus}></Image>
              </View>
            ),
          }}
          // listeners={({navigation}) => ({
          //   tabPress: e => {
          //     e.preventDefault();
          //     setLogoutModalVisibility(true);
          //   },
          // })}
        />
        <Tab.Screen
          name={'LearnV2'}
          component={LearnV2}
          options={{
            tabBarLabel: 'Learn',
            tabBarLabelStyle: {
              fontSize: 9,
              fontFamily: 'Montserrat-SemiBold',
              letterSpacing: 0.1,
              lineHeight: 11,
              marginLeft: 20,
            },
            tabBarIcon: ({color, size}) => (
              <Image
                resizeMode="contain"
                style={{
                  height: dH(23),
                  marginLeft: 20,
                  width: dW(23),
                  tintColor: color,
                }}
                source={images.learn}></Image>
            ),
          }}
        />
        <Tab.Screen
          name={'Store'}
          component={Store}
          options={{
            tabBarLabel: 'Store',
            tabBarLabelStyle: {
              fontSize: 9,
              fontFamily: 'Montserrat-SemiBold',
              letterSpacing: 0.1,
              lineHeight: 11,
            },
            tabBarIcon: ({color, size}) => (
              <Image
                resizeMode="contain"
                style={{
                  height: dH(17),
                  marginTop: 0,
                  width: dW(17),
                  tintColor: color,
                }}
                source={images.store}></Image>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{headerShown: false}}
        component={Splash}
        name="Splash"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={GetStarted}
        name="GetStarted"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={WhoisLogging}
        name="WhoisLogging"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={Register}
        name="Register"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={WalkThrough}
        name="WalkThrough"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={ChooseSport}
        name="ChooseSport"></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={Login}
        name="Login"></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={Tab_Navigator}
        name={'Home'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={CreatePost}
        name={'CreatePost'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={RegisterAthelete}
        name={'RegisterAthelete'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={FoundProfile}
        name={'FoundProfile'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={EnterCode}
        name={'EnterCode'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={TeamFeed}
        name={'TeamFeed'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={DirectMessages}
        name={'DirectMessages'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={MySchedule}
        name={'MySchedule'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={CoachCorner}
        name={'CoachCorner'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={TermsAndCondition}
        name={'TermsAndCondition'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={ConfirmAthelete}
        name={'ConfirmAthelete'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={InviteCoach}
        name={'InviteCoach'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={AtheleteStatistics}
        name={'AtheleteStatistics'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={EnterOrInviteTeam}
        name={'EnterOrInviteTeam'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={AtheleteInformation}
        name={'AtheleteInformation'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={CompletedWorkout}
        name={'CompletedWorkout'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={AtheleteProfile}
        name={'AtheleteProfile'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={MyPrograms}
        name={'MyPrograms'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={Subscription}
        name={'Subscription'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={LearnV2}
        name={'LearnV2'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={GetVash}
        name={'GetVash'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={TeamFeedsComment}
        name={'TeamFeedsComment'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={SearchOrCreateChat}
        name={'SearchOrCreateChat'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={Message}
        name={'Message'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={ForgotPassword}
        name={'ForgotPassword'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={EditTeam}
        name={'EditTeam'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={SavedPrograms}
        name={'SavedPrograms'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={CoachTeam}
        name={'CoachTeam'}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default Root;
