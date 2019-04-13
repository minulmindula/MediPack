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
    Text,
    View, 
    Image,
    ProgressBarAndroid,
    TouchableHighlight,
    Dimensions,
    ActivityIndicator,
    AsyncStorage } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Splash extends Component {

  // constructor(props){
  //   super(props);
  //   // this.state = {
  //   //   login: null,
  //   // }

  //   AsyncStorage.getItem('id_token').then((userToken) => {
  //     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  //  }

  // }

  getUserID = async () => {
    let userID = await AsyncStorage.getItem('userID');
    return userID;
  }


  componentWillMount(){
    // alert(value);
    let userID = AsyncStorage.getItem('userID');

    this.getUserID().then((userID) => {
      // alert(userID);

      if(userID != null)
      {
        setTimeout(() => {
          this.props.navigation.navigate("Drawer",{screen: "Drawer"});
        }, 3000); 
        
      }else{
        setTimeout(() => {
          this.props.navigation.navigate('Login');
        }, 3000); 
      }      

    })

  }

  _onGetStarted = () => {
    this.props.navigation.navigate("Register",{screen: "Register"});
  }

  _onLoginPressed = () => {
    this.props.navigation.navigate("Login",{screen: "Login"});
  }


  render() {
    return (
      <View style={styles.container}>

      <Image 
        source={require('../../assets/images/Auth/bg.png')}
        style={{width: width, height: height}}
      />
         
        <Image 
          source={require('../../assets/images/Auth/logo.png')}
          style={{position: 'absolute', width: width / 1.1, height: height / 3.7, paddingBottom: 15, resizeMode: 'contain'}}
        />

        <Text style={{position: 'absolute', bottom: 20, color: 'white'}}>MediPack Version1.0</Text>
        <Text style={{position: 'absolute', bottom: 5, color: 'white'}}>Developed by InnovM</Text>

       </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
  
});