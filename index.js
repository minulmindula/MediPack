/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Navigation from './app/Navigation/MainContainer';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigation);
console.disableYellowBox = true;