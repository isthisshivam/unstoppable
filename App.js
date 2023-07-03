/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AppState,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Root from './src/root/root';
import {NavigationContainer} from '@react-navigation/native';
import {PortalProvider} from '@gorhom/portal';
import firebase from '@react-native-firebase/app';
import secrets from './src/constants/secrets';
import auth from '@react-native-firebase/auth';
import colors from './src/constants/colors';
import {removeStoreData, setStoreData} from './src/utils/utilities';
import {differenceInSeconds} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
let appStartTime = new Date();
const App = () => {
  useEffect(() => {
    saveStartTime();
  });
  const saveStartTime = async () => {
    let start_time = new Date();
    await setStoreData('start_time', start_time);
    console.log('savinnn start_time: ', start_time);
  };

  //const appState = useRef(AppState.currentState);
  // React.useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);
  // const handleAppStateChange = nextAppState => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     appStartTime = new Date();
  //   } else {
  //     const viewSessionDuration = differenceInSeconds(new Date(), appStartTime);
  //     console.log({viewSessionDuration});
  //     // you would then take the viewSessionDuration and do whatever you want with it. Save it to your local app DB, or send it off to an API.
  //   }
  // };

  // const saveSpentTime=async()=>{

  // }
  // AsyncStorage.clear();
  useEffect(() => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: secrets.apiKey,
        authDomain: secrets.authDomain,
        projectId: secrets.projectId,
        storageBucket: secrets.storageBucket,
        messagingSenderId: secrets.messagingSenderId,
        appId: secrets.appId,
        measurementId: secrets.measurementId,
      };

      firebase.initalizing(firebaseConfig);
    }
  }, []);
  useEffect(() => {
    console.log('App');
    signInAnonymously();
  }, []);
  signInAnonymously = async () => {
    try {
      await auth().signInAnonymously();
    } catch (e) {
      console.error(e);
    }
  };

  const backgroundStyle = {
    backgroundColor: colors.blackShade_s,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer
      //onStateChange={e => console.log('onStateChange==', e.routes)}
      >
        <StatusBar barStyle={'light-content'} />
        <PortalProvider>
          <Root />
        </PortalProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
