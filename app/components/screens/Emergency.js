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
    KeyboardAvoidingView,
    ScrollView,
    Linking  } from 'react-native';
import { createStackNavigator, navigate, navigation, DrawerNavigator } from 'react-navigation';
import {SearchBar, Header, Card, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class Emergency extends Component {

  constructor(){
    super();
   
    this.state = {
      data: []
    }

  }

  getHospitalDetails()
  {
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(APILinks.getHospitalDetailsEmg, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){

        this.setState({data: responseText.data});
       
      }else{
        alert('No hospital records found');
      }

    })
    .catch((error) => {
      alert("error");
    })
  }

  componentDidMount(){
    this.getHospitalDetails();
  }

  render() {

    return (
       <View style={styles.container}>

        <Header
          leftComponent={{icon:'menu', color:'#919191', onPress: () => this.props.navigation.openDrawer()}}
          centerComponent={{text: 'Emergency', style: {color: '#919191'}}}
          rightComponent={{icon: 'notifications', color: '#595959', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
        />

        <SearchBar 
          lightTheme
          platform='android'
          searchIcon={false}
          placeholder='Search for hospital'
          placeholderTextColor='white'
          containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent', marginTop: 5}}
          inputStyle={{backgroundColor: '#4a5ea7', borderColor: 'white', borderRadius: 50, marginBottom: 15}}
        />

        <View style={styles.box}>

          <ScrollView style={{marginBottom: 30}}>

          {
            this.state.data.map(function(item, index){
              const url = item.logoURL;
              return (

                    <View style={[styles.card, {marginTop: 25, marginBottom: 5}]}> 
                      <View style={{width: '25%', backgroundColor: '#23448b', height: '100%', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center'}}>
                        <Image 
                          source={{uri: url}}
                          style={{width: '70%', resizeMode: 'contain', height: '75%', marginLeft: 10}}
                        />
                      </View>
                      <View style={{width: '55%', justifyContent: 'center', marginLeft: 8}}>
                        <Text key={index} style={{fontSize: RF(3.2), color: 'white'}}>{item.name}</Text>
                      </View>
                      <View style={{width: '12%', justifyContent:'center', marginRight: 22, alignItems: 'flex-end'}}>
                        <TouchableOpacity 
                          style={{width: '100%'}}
                          onPress={()=>{Linking.openURL('tel:'+item.emergencyContact)}}
                        >
                          <Image
                              source={require('../../assets/images/Emergency/call_icon.png')}
                              style={{width: '80%', resizeMode: 'contain'}}
                            />
                        </TouchableOpacity>
                      </View>
                    </View>

                   
              );
          })
          }

          </ScrollView>

        </View>

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
  box:{
    backgroundColor: '#6971a3',
    width: width,
    height: height / 1.2,
    marginBottom: 0,
  },
  card:{
    width: width / 1.1,
    height: height / 9.5,
    backgroundColor: '#32539a',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: RF(1.7),
    flexDirection: 'row',
    elevation: 3
  }
});

