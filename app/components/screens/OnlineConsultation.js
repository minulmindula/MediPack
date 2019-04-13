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
  FlatList,
  ScrollView } from 'react-native';
import { createStackNavigator, navigate, navigation, DrawerNavigator } from 'react-navigation';
import {Header, SearchBar, Card} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class OnlineConsultation extends Component {

  constructor(){
    super();

    this.state = {
      data: []
    }

  }


  async getDoctors(){
    
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    fetch(APILinks.onlineDocs, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){
        
        this.setState({data: responseText.data});

      }else{
        // alert('Invalid credentials');
      }

    })
    .catch((error) => {
      // alert("error");
    })
  }

  componentDidMount(){
    this.getDoctors();

    this.timer = setInterval(() => {
      this.getDoctors();
    }, 10000);

  }

  

  render() {

    const {navigate} = this.props.navigation

    return (
       <View style={styles.container}>

        <Header
          leftComponent={{icon:'menu', color:'#919191', onPress: () => this.props.navigation.openDrawer()}}
          centerComponent={{text: 'Online Consultation', style: {color: 'grey'}}}
          rightComponent={{icon: 'notifications', color: '#919191', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
        />

        <SearchBar 
          lightTheme
          platform='android'
          searchIcon={false}
          placeholder='Search for Doctor'
          placeholderTextColor='white'
          containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent', marginTop: 5}}
          inputStyle={{backgroundColor: '#4a5ea7', borderColor: 'white', borderRadius: 50, marginBottom: 15}}
        />

        {/* <Text style={[styles.subTopic, {marginTop: 5}]}>FAVOURITES</Text> */}


        {/* <Text style={styles.subTopic}>ALL</Text> */}

        <ScrollView style={styles.bgBox}>

        {this.state.data.map(function(item, index){
              return (
               <Card containerStyle={{width: width, paddingVertical: 12, margin: 0 , marginVertical: 8, elevation: 3}}>
                <TouchableOpacity
                    onPress={() => navigate('ChatScreen', {chatUsername: ['Dr.', ' ', item.firstname, ' ', item.lastname], status: [item.status], docID: [item.docID]})}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={item.URL != '' ? {uri: item.URL} : require('../../assets/images/Chat/icon.png')}
                        style={{height: height / 10, width: width / 5, resizeMode: 'contain'}}
                      />
                      <View style={{width: width / 1.6, justifyContent: 'center'}}>
                        <Text key={index} style={{marginLeft: 10, fontSize: RF(2.5)}}>Dr. {item.firstname} {item.lastname}</Text>
                      </View>

                      <View style={{justifyContent: 'center'}}>
                        {
                          
                          item.status == 1
                          ? 
                            <Image 
                              source={require('../../assets/images/Chat/online.png')}
                              style={{height: height / 35, width: width / 10, resizeMode: 'contain'}}
                            />

                          :

                          <Image 
                            source={require('../../assets/images/Chat/offline.png')}
                            style={{height: height / 35, width: width / 10, resizeMode: 'contain'}}
                          />

                        }
                      </View>

                    </View>
                  </TouchableOpacity>
               </Card>
              );
            })}
      
        </ScrollView>
        

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
  subTopic: {
    color: '#4a5ea7',
    marginLeft: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20
  },
  bgBox: {
    marginTop: 10, 
    backgroundColor: '#6971a3', 
    height: height / 1.2,
    width: width,
    paddingTop: 5
},

});

