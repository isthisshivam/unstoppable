/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
// import {withIAPContext} from 'react-native-iap';
AppRegistry.registerComponent(appName, () => App);
