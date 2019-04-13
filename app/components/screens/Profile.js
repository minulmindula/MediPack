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
    Image,
    TextInput,
    AsyncStorage } from 'react-native';
import {Header, Card, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class Profile extends Component {

  getUserID = async () => {
    let userID = await AsyncStorage.getItem('userID');
    return userID;
  }


  _saveChanges = () => 
  {

    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        "userid": this.state.userID,
        "username": this.state.username,
        "firstname": this.state.firstname,
        "lastname": this.state.lastname,
        "email": this.state.email,
        "contact": this.state.contact
      })
    };

    fetch(APILinks.updateUserDetails, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){
      
        alert('Your changes have been saved!');
       
      }else{
        alert('Entered data already exists. Please try again!');
      }

    })
    .catch((error) => {
      alert("error");
    })

  }



  async _getUserDetails(userId)
  {
    let uid = JSON.parse(userId);

    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        "userid": uid,
      })
    };

    fetch(APILinks.getUserDetails, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){
      
        try {
          // alert(responseText.data[0].username);
          this.setState({username: responseText.data[0].username});
          this.setState({firstname: responseText.data[0].firstname});
          this.setState({lastname: responseText.data[0].lastname});
          this.setState({email: responseText.data[0].email});
          this.setState({contact: responseText.data[0].contact});
          
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

  constructor(){
    super();
    this.state={
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      userID: ''
    }
  }

  componentDidMount()
  {
    // this._getUserDetails();

    this.getUserID().then((userID) => {
      this._getUserDetails(userID);
      this.setState({
        userID: JSON.parse(userID)
      });
    })
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={{backgroundColor: '#708BF0'}}>

         {/* <TouchableOpacity
         style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15, zIndex: 1}}
         onPress={this._saveChanges}>
            <Text style={{marginRight: 15, color: 'white'}}>
              Done
            </Text>
         </TouchableOpacity> */}

          <Header
            leftComponent={{icon:'arrow-back', color:'white', onPress: () => this.props.navigation.goBack()}}
            // rightComponent={{icon: 'notifications', color: '#919191', onPress: () => alert('Hoi')}}
            backgroundColor='transparent'
            outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3, width: width}}
          />


          <Image 
            source={require('../../assets/images/Settings/Icons/profile.png')}
            style={{width: width / 3, height: height / 8, resizeMode: 'contain', alignSelf: 'center'}}
          />

          <TextInput
            style={styles.textinputsTop}
            placeholder="Username"
            placeholderTextColor='white'
            value={this.state.username}
            onChangeText={(text) => this.setState({username:text})}
          />

        </View>

        <View style={{marginTop: 10}}> 

          <Text style={{marginLeft: 20, marginTop: 10}}>Firstname</Text>
          <TextInput
            style={styles.textinputsBottom}
            placeholder="Firstname"
            placeholderTextColor='white'
            value={this.state.firstname}
            onChangeText={(text) => this.setState({firstname:text})}
          />

          <Text style={{marginLeft: 20, marginTop: 10}}>Lastname</Text>
          <TextInput
            style={styles.textinputsBottom}
            placeholder="Lastname"
            placeholderTextColor='white'
            value={this.state.lastname}
            onChangeText={(text) => this.setState({lastname:text})}
          />

          <Text style={{marginLeft: 20, marginTop: 10}}>E-mail</Text>
          <TextInput
            style={styles.textinputsBottom}
            placeholder="E-mail"
            placeholderTextColor='white'
            value={this.state.email}
            onChangeText={(text) => this.setState({email:text})}
          />

          <Text style={{marginLeft: 20, marginTop: 10}}>Contact number</Text>
          <TextInput
            style={styles.textinputsBottom}
            placeholder="Contact"
            placeholderTextColor='white'
            value={this.state.contact}
            onChangeText={(text) => this.setState({contact:text})}
          />

        </View>

        <TouchableOpacity style={styles.saveBtn} onPress= {this._saveChanges}>
          <Text style={{fontWeight: 'bold', color: '#708BF0'}}>Save</Text>
        </TouchableOpacity>

      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'white'
  },
  textinputsTop: {
    height: height / 19,
    alignSelf: 'center',
    width: width / 2.6,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop: 10,
    paddingBottom: 5,
    fontSize: RF(2.2),
    color: 'white'
  },
  textinputsBottom: {
    height: height / 19,
    alignSelf: 'center',
    width: width / 1.1,
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 10,
    fontSize: RF(2.2),
    borderRadius: 5,
    padding: 10
  },
  saveBtn: {
    padding: 10, 
    borderWidth: 1, 
    width: width / 6, 
    alignItems: 'center', 
    borderRadius: 5, 
    borderColor: '#708BF0', 
    alignSelf: 'center', 
    marginTop: 20,
    marginBottom: 5
  }
});

