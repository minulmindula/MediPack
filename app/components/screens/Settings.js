

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage } from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Settings extends Component {

    _logOut = () => 
    {
        AsyncStorage.removeItem('userID');
        this.props.navigation.navigate("Login");
    }

    _onProfile = () => 
    {
        this.props.navigation.navigate("Profile",{screen: "Profile"});
    }

    _onChangePassword = () => 
    {
        this.props.navigation.navigate("ChangePassword",{screen: "ChangePassword"});
    }

    _onPrivacyPolicy = () => 
    {
        this.props.navigation.navigate("PrivacyPolicy",{screen: "PrivacyPolicy"});
    }

    constructor(props){
        super(props);

        this.state = {
        };
        
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

        <Text style={{fontSize: RF(2.1), alignSelf: 'flex-start', marginLeft: 15, marginTop: 15, color: '#708BF0', fontWeight: 'bold'}}>
            Account
        </Text>

       
        <TouchableOpacity style={{marginVertical: 20}}
        onPress={this._onProfile}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: width, paddingHorizontal: 15}}>
                <Icon 
                    name='person'
                    color='#666666'
                    style={{width: width / 6}}
                />
                <Text style={{width: width / 1.3, marginLeft: 20, fontSize: RF(2.5), fontWeight: 'bold'}}>
                    Edit profile
                </Text>
                <Image 
                    source={require('../../assets/images/Settings/Icons/forward.png')}
                />
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._onChangePassword}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: width, paddingHorizontal: 15}}>
                <Icon 
                    name='lock'
                    color='#666666'
                    style={{width: width / 6}}
                />
                <Text style={{width: width / 1.3, marginLeft: 20, fontSize: RF(2.5), fontWeight: 'bold'}}>
                    Change password
                </Text>
                <Image 
                    source={require('../../assets/images/Settings/Icons/forward.png')}
                />
            </View>
        </TouchableOpacity>



        <Text style={{fontSize: RF(2.1), alignSelf: 'flex-start', marginLeft: 15, marginTop: 35, color: '#708BF0', fontWeight: 'bold'}}>
            Settings
        </Text>

       
        <TouchableOpacity style={{marginVertical: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: width, paddingHorizontal: 15}}>
                <Icon 
                    name='notifications'
                    color='#666666'
                    style={{width: width / 6}}
                />
                <Text style={{width: width / 1.3, marginLeft: 20, fontSize: RF(2.5), fontWeight: 'bold'}}>
                    Turn on/off notifications
                </Text>
                <Image 
                    source={require('../../assets/images/Settings/Icons/forward.png')}
                />
            </View>
        </TouchableOpacity>


        <Text style={{fontSize: RF(2.1), alignSelf: 'flex-start', marginLeft: 15, marginTop: 35, color: '#708BF0', fontWeight: 'bold'}}>
            About
        </Text>

        <TouchableOpacity style={{marginVertical: 20}}
        onPress={this._onPrivacyPolicy}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: width, paddingHorizontal: 15}}>
                <Icon 
                    name='notifications'
                    color='#666666'
                    style={{width: width / 6}}
                />
                <Text style={{width: width / 1.3, marginLeft: 20, fontSize: RF(2.5), fontWeight: 'bold'}}>
                    Privacy Policy
                </Text>
                <Image 
                    source={require('../../assets/images/Settings/Icons/forward.png')}
                />
            </View>
        </TouchableOpacity>



        <Button 
            title='Log out current user'
            buttonStyle={{marginTop: 30, backgroundColor: 'white', borderWidth: 0.9, borderRadius: 5, borderColor: '#708BF0'}}
            textStyle={{color: '#708BF0', fontWeight: 'bold'}}
            onPress={this._logOut}
        />

    

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
  }
  
});