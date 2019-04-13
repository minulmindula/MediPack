/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, 
    Text, 
    View, 
    Alert,
    Dimensions,
    TouchableOpacity,
    Image } from 'react-native';
import { createStackNavigator, navigate, navigation, DrawerNavigator } from 'react-navigation';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class DoctorAvailability extends Component {

  constructor(){
    super();
  }

  render() {

    return (
       <View style={styles.container}>

         <Text>Doctor Availability</Text>

       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width
  },
  top: {
    backgroundColor: '#F0EFEF',
    height: '10%',
    flexDirection: 'row',
    padding: '4%'
  },
  topBarIcons: {
    width: 25,
    height: 25
  },
  middle: {
    backgroundColor: '#F0EFEF',
    height: '80%'
  },
  bottom: {
    backgroundColor: '#F0EFEF',
    flexDirection: 'row',
    height: '10%',
    padding: '4%'
  },
});

