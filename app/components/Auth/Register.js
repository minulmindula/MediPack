/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, Linking } from 'react-native';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Register extends Component {

  constructor(props){
    super(props);

    this.state = {
      firstname: null,
      lastname: null,
      contact: null,
      email: null,
      password: null,
      passwordAgain: null
    };
    
  }

  _onRegisterPressed = () => {

    if(
        this.state.firstname != null &&
        this.state.lastname != null &&
        this.state.contact != null &&
        this.state.email != null &&
        this.state.password != null
    )
      {
          
        if(this.state.passwordAgain != null)
        {
          
          if(this.state.password == this.state.passwordAgain)
          {
            
            var object = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify( {
                "firstname":this.state.firstname,
                "lastname":this.state.lastname,
                "contact": this.state.contact,
                "email": this.state.email,
                "password": this.state.password
              })
            };
        
            fetch(APILinks.registerLink, object)
            .then((response) => response.json())
            .then((responseText) => {
        
              if(responseText.success == true){
              
                try {
                  alert('Successfully registerd! Please check your email to know your credentials');
                  // this.props.navigation.navigate("Login",{screen: "Login"});
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

          }else{
            alert('fiuck');
          }

        }else{
          alert('enter password again!');
        }

      }else{
      alert('please fill in all the details');
      }

  }


  _onLoginPressed = () => {
    this.props.navigation.navigate("Login",{screen: "Login"});
  }

  render() {

    return (
      <View style={styles.container}>
          <Image
            source={require('../../assets/images/Auth/logo.png')} 
            style={{width: width / 1.5, height: height / 5.5, resizeMode: 'contain'}}
          />
        
          <TextInput
            style={styles.textinputs}
            placeholder="First Name"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({firstname:text})}

          />

          <TextInput
            style={styles.textinputs}
            placeholder="Last Name"
            placeholderTextColor='grey'
            // value={this.state.password}
            onChangeText={(text) => this.setState({lastname:text})}
          />

          <TextInput
            style={styles.textinputs}
            placeholder="Mobile Number"
            placeholderTextColor='grey'
            // value={this.state.password}
            onChangeText={(text) => this.setState({contact:text})}
          />

          <TextInput
            style={styles.textinputs}
            placeholder="Email Address"
            placeholderTextColor='grey'
            // value={this.state.password}
            onChangeText={(text) => this.setState({email:text})}
          />

          <TextInput
            style={styles.textinputs}
            placeholder="Password"
            placeholderTextColor='grey'
            secureTextEntry={true}
            // value={this.state.password}
            onChangeText={(text) => this.setState({password:text})}
          />

          <TextInput
            style={styles.textinputs}
            placeholder="Re-enter Password"
            placeholderTextColor='grey'
            secureTextEntry={true}
            // value={this.state.password}
            onChangeText={(text) => this.setState({passwordAgain:text})}
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={this._onRegisterPressed}
          >
            <Text style={{textAlign: 'center', color: 'white', padding: 7, fontSize: 15}}>REGISTER</Text>
          </TouchableOpacity>

          
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: '5%'}}>Don't have an account?</Text>
            <Text style={{color: 'blue',marginTop: '5%', marginLeft: '1%'}}
            onPress={this._onLoginPressed}>Login here</Text>
          </View>
          {/* <TouchableOpacity
            onPress={this._onRegisterPressed}
            style={[styles.button, {width: '20%', marginTop: 5}]}
          >
          <Text style={{alignSelf: 'center',color: 'white'}}>Sign up</Text>
          </TouchableOpacity> */}

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
    backgroundColor: 'white',
    justifyContent: 'center'
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
    paddingTop: '0.5%',
    paddingBottom: '0.5%',
    paddingLeft: '4%',
    paddingRight: '4%',
    width: '90%',
    marginTop: '5%',
    color: 'grey',
    height: '5%', 
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  button: {
    width: '90%',
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#4460d6',
    alignSelf: 'center',
    marginTop: '5%'
  },
  buttonBottom: {
    marginTop: '2%',
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