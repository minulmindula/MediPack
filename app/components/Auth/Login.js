

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      username:'minulmindula',
      password:'1234'
    };
    
  }

  _onRegisterPressed = () => {
    this.props.navigation.navigate("Register",{screen: "Register"});
  }

  _onLoginPressed = () => {

    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        "username":this.state.username,
        "password":this.state.password,
      })
    };

    fetch(APILinks.loginLink, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){


        const userID = responseText.data[0].userid;
      
        try {
          AsyncStorage.setItem('userID', JSON.stringify(userID));

          this.props.navigation.navigate("Drawer",{screen: "Drawer"});
        }
        catch (e) {
          console.log('caught error', e);
        }


       
      }else{
        alert('Invalid credentials');
      }

    })
    .catch((error) => {
      alert("error");
    })
  
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.innerContainer}>

          <Image
            source={require('../../assets/images/Auth/logo.png')} 
            style={{width: width / 1.2, height: height / 3.5, resizeMode: 'contain'}}
          />
        
          <TextInput
            style={styles.textinputs}
            placeholder="Username"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({username:text})}

          />

          <TextInput
            style={styles.textinputs}
            placeholder="Password"
            placeholderTextColor='grey'
            secureTextEntry={true}
            // value={this.state.password}
            onChangeText={(text) => this.setState({password:text})}
          />

          <View style={{flexDirection: 'row', width: '90%'}}>
            <View style={{alignSelf: 'flex-start', width: '66%', flexDirection: 'row'}}>
              <Icon 
                name='check'
                color='blue'
              />
              <Text style={{marginLeft: '2%'}}>Remember Me</Text>
            </View>
            <View style={{alignContent: 'flex-end'}}>
              <Text style={{color: 'blue'}}>Forgot Password?</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={this._onLoginPressed}
          >
            <Text style={{textAlign: 'center', color: 'white', padding: 7, fontSize: 15}}>LOGIN</Text>
          </TouchableOpacity>

          {/* <Text style={{alignSelf: 'center', marginBottom: 5, marginTop: 30}}>Don't have an account?</Text>
          <TouchableHighlight>
            <Text>Signup here</Text>
          </TouchableHighlight> */}

          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: '5%'}}>Don't have an account?</Text>
            <Text style={{color: 'blue',marginTop: '5%', marginLeft: '1%'}}
            onPress={this._onRegisterPressed}>Signup here</Text>
            {/* this.props.navigation.navigate("Register",{screen: "Register"}); */}
          </View>

          {/* <TouchableOpacity
            onPress={this._onRegisterPressed}
            style={[styles.button, {width: '20%', marginTop: 5}]}
          >
          <Text style={{alignSelf: 'center',color: 'white'}}>Sign up</Text>
          </TouchableOpacity> */}

        </View>
          

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: height,
    width: width,
    backgroundColor: 'white'
  },
  screenSize:{
    flex: 1,
    width: width,
    height: height,
    position: 'absolute'
  },
  innerContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgImages: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  logo: {
    width: '20%',
    height: '20%',
    flex: 1,
    resizeMode: 'contain', 
    marginBottom: '2%',
  },
  textinputs: {
    backgroundColor: 'white',
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '4%',
    paddingRight: '4%',
    width: '90%',
    margin: '3%',
    color: 'grey',
    height: '8%', 
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  button: {
    marginTop: '4%',
    width: '90%',
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#4460d6',
    alignSelf: 'center',
    marginTop: '10%'
  },
  buttonBottom: {
    marginTop: '4%',
    width: 100,
    borderRadius: 50,
    backgroundColor: '#387EE9'
  },
  bottomFlexRight:{
    position: 'absolute',
    bottom: 40,
    width: '45%',
    alignSelf: 'flex-start'
  },
  bottomFlexLeft:{
    position: 'absolute',
    bottom: 40,
    width: '40%',
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  roundButton:{
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20
  }
  
});