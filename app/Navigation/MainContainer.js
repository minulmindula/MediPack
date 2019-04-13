/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions, 
    Image,
    ScrollView 
} from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';

import Splash from '../components/Auth/Splash';
import Login from '../components/Auth/Login';
import Home from '../components/screens/Home';
import Register from '../components/Auth/Register';
import OnlineConsultation from '../components/screens/OnlineConsultation';
import Locator from '../components/screens/Locator';
import DoctorAvailability from '../components/screens/DoctorAvailability';
import Emergency from '../components/screens/Emergency';
import ChatScreen from '../components/screens/ChatScreen';
import Schedule from '../components/screens/Schedule';
import Profile from '../components/screens/Profile';
import Settings from '../components/screens/Settings';
import PrivacyPolicy from '../components/screens/PrivacyPolicy';
import ChangePassword from '../components/screens/ChangePassword';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CustomeDrawerImage = (props) => (

  <View style={{width: width/1.3, height: 190}}>
  
    <Image
      style={styles.drawerHeaderImage}
      source={require('../assets/images/Auth/logo.png')}
    />
      
      <View >
        <ScrollView style={{width:width/1.3,height:height/1.4, backgroundColor: '#d9e2fc'}}>
          <DrawerItems
            {...props}
          />
        </ScrollView>
      </View>
  </View>

);

const Drawer = DrawerNavigator({
  "Home":{
    screen: Home,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../assets/images/DrawerIcons/home.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20}}
        />
      )
    }
  },
  "Online Consultation":{
    screen: OnlineConsultation,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../assets/images/DrawerIcons/chat.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20}}
        />
      )
    }
  },
  "Hospital/Pharmacy Locator":{
    screen: Locator,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../assets/images/DrawerIcons/locator.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20}}
        />
      )
    }
  },
  // "Doctor Availability":{
  //   screen: DoctorAvailability,
  //   navigationOptions: {
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
  //         resizeMode="contain"
  //         style={{ width: 20, height: 20}}
  //       />
  //     )
  //   }
  // },
  "Emergency":{
    screen: Emergency,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../assets/images/DrawerIcons/emergency.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20}}
        />
      )
    }
  },
"Schedule":{
  screen: Schedule,
  navigationOptions: {
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../assets/images/DrawerIcons/schedule.png")}
        resizeMode="contain"
        style={{ width: 20, height: 20}}
      />
    )
  }
},
"Settings":{
  screen: Settings,
  navigationOptions: {
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../assets/images/DrawerIcons/settings.png")}
        resizeMode="contain"
        style={{ width: 20, height: 20}}
      />
    )
  }
},},
{
drawerWidth: width/1.3,
drawerPosition: 'left',
contentComponent: CustomeDrawerImage,
drawerOpenRoute: 'DrawerOpen',
drawerCloseRoute: 'DrawerClose',
drawerToggleRoute: 'DrawerToggle',
drawerBackgroundColor: '#708BF0',
contentOptions: {
  activeTintColor: '#0a40db',
  inactiveTintColor: 'grey',
  labelStyle: {
  }
}
});

const NavigationApp = StackNavigator({

  //UI Navigation Map For All
  Splash:{ screen: Splash, navigationOptions: { title: 'SplashScreen', header: null ,gesturesEnabled:false},},
  Login:{ screen: Login, navigationOptions: { title: 'Login', header: null ,gesturesEnabled:false},},
  Register:{ screen: Register, navigationOptions: { title: 'Register', header: null ,gesturesEnabled:false},},
  Drawer:{screen: Drawer, navigationOptions: { title: 'Drawer', header: null, gesturesEnabled: false},},
  Home:{ screen: Home, navigationOptions: { title: 'Home', header: null ,gesturesEnabled:false},},
  Emergency:{screen: Emergency, navigationOptions: {title: 'Emergency', header: null, gesturesEnabled: false},},
  OnlineConsultation: {screen: OnlineConsultation, navigationOptions: {title: 'Online Consultation', header: null, gesturesEnabled: false},},
  Locator: {screen: Locator, navigationOptions: {title: 'Locator', header: null, gesturesEnabled: false},},
  ChatScreen: {screen: ChatScreen, navigationOptions: {title: 'ChatScreen', header: null, gesturesEnabled: false},},
  Schedule:{ screen: Schedule, navigationOptions: { title: 'Schedule', header: null ,gesturesEnabled:false},},
  Profile:{ screen: Profile, navigationOptions: { title: 'Profile', header: null ,gesturesEnabled:false},},
  Settings: { screen: Settings, navigationOptions: { title: 'Settings', header: null ,gesturesEnabled:false},},
  PrivacyPolicy: { screen: PrivacyPolicy, navigationOptions: { title: 'PrivacyPolicy', header: null ,gesturesEnabled:false},},
  ChangePassword: { screen: ChangePassword, navigationOptions: { title: 'ChangePassword', header: null ,gesturesEnabled:false},},
});

  

export default class MainContainer extends Component{

  constructor(props){
  super(props);

  }

  render() {
    return (
      <NavigationApp />
    );
  }
}

const styles = StyleSheet.create({
  drawerHeaderImage:{
    width: 250,
    height: 190,
    resizeMode: 'contain',
    marginLeft:width/13
  }
});