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


export default class ChangePassword extends Component {

  getUserID = async () => {
    let userID = await AsyncStorage.getItem('userID');
    return userID;
  }

  _goBack()
  {
      alert('ok');
    this.props.navigation.navigate.goBack();
  }


  _changePassword = () =>
  {

    if(this.state.newPw == this.state.reNewPw)
    {

        this.setState({oldPw: ''});
        this.setState({newPw: ''});
        this.setState({reNewPw: ''});

        var object = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
                "userid": this.state.userID,
                "oldPassword": this.state.oldPw,
                "newPassword": this.state.newPw,
            })
        };
      
        fetch(APILinks.changePassword, object)
        .then((response) => response.json())
        .then((responseText) => {
    
        if(responseText.success == true){
        
           
            this.setState({pwSuccess: true});
            this.setState({msg: true});
            
        }else{
            // this.setState({oldPw: null});
            // this.setState({newPw: ''});
            // this.setState({reNewPw: ''});
            this.setState({pwSuccess: false});
            this.setState({msg: true});
        }
    
        })
        .catch((error) => {
        alert("error");
        })
    }else {
        alert('Please enter correct password');
    }

    
  }

  constructor(){
    super();

    this.state={
        userID: '',
        oldPw: '',
        newPw: '',
        reNewPw: '',
        pwSuccess: false,
        msg: false
    }

  }

  componentDidMount()
  {

    this.getUserID().then((userID) => {
      this.setState({
        userID: JSON.parse(userID)
      });
    })

  }

  render() {

    return (
      <View style={styles.container}>

        <Header
            leftComponent={{icon:'arrow-back', color:'#919191', onPress: () => this.props.navigation.goBack()}}
            // rightComponent={{icon: 'notifications', color: '#919191', onPress: () => alert('Hoi')}}
            backgroundColor='transparent'
            outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3, width: width}}
        />


        <Text style={{marginLeft: 20, marginTop: 10}}>Enter old password</Text>
        <TextInput
            style={styles.textinputs}
            placeholder="Enter old password"
            placeholderTextColor='white'
            // value={this.state.firstname}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({oldPw:text})}
        />

        <Text style={{marginLeft: 20, marginTop: 10}}>Enter new password</Text>
        <TextInput
            style={styles.textinputs}
            placeholder="Enter new password"
            placeholderTextColor='white'
            // value={this.state.lastname}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({newPw:text})}
        />

        <Text style={{marginLeft: 20, marginTop: 10}}>Re-enter new password</Text>
        <TextInput
            style={styles.textinputs}
            placeholder="Re-enter new password"
            placeholderTextColor='white'
            // value={this.state.email}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({reNewPw:text})}
        />

        {

            this.state.msg ? 

           
               this.state.pwSuccess 
                    
                    ? 

                    <Text style={{color: 'green', fontWeight: 'bold', fontSize: RF(2.5), alignSelf: 'center', marginVertical: 20}}>Your password has been changed successfully</Text>

                    :

                    <View>
                        <Text style={{color: 'red', fontWeight: 'bold', fontSize: RF(2.5), alignSelf: 'center', marginTop: 20}}>An error occured changing your password. </Text>
                        <Text style={{color: 'red', fontWeight: 'bold', fontSize: RF(2.5), alignSelf: 'center', marginBottom: 20}}>Please try again!</Text>
                    </View>
                

            :

            <View></View>
           
        }


        <TouchableOpacity style={styles.saveBtn} onPress= {this._changePassword}>
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
  textinputs: {
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

