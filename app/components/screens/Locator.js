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
import {Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class Locator extends Component {

   getHospitalLocations = () => 
  {
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(APILinks.getHospitalLocations, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){

        this.setState({places: responseText.data});
        // alert(responseText.data);
       
      }else{
        alert('No hospital records found');
      }

    })
    .catch((error) => {
      alert("error");
    })
  }

  getPharmacyLocations = () => 
  {
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(APILinks.getPharmacyLocations, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){

        this.setState({places: responseText.data});
        // alert(responseText.data);
       
      }else{
        alert('No hospital records found');
      }

    })
    .catch((error) => {
      alert("error");
    })
  }


  PharmacyTab = () => (
    <View style={{
      ...StyleSheet.absoluteFillObject
    }}>
      <MapView
      style={{...StyleSheet.absoluteFillObject}}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 6.927079,
        longitude: 79.861244,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
    </View>
  );

  HospitalTab = () => (
    <View style={{
      ...StyleSheet.absoluteFillObject
    }}>
      <MapView
        style={{...StyleSheet.absoluteFillObject}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.927079,
          longitude: 79.861244,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

      {
        this.state.hospitalPlaces.map(marker => (
          <MapView.Marker
              coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude
                }}
              title={marker.name}
              description={marker.address}
            />
        ))
      }
        
      </MapView>
    </View>
  );

 
  constructor(){
    super();
    
    this.state = {
      places: [],
      topBtnColorHospital: '#32539a',
      topBtnColorPharmacy: '#9B9B9B'
     
    }
    
  }

  hospitalView = () => 
  {
    this.getHospitalLocations();
    this.setState({topBtnColorHospital: '#32539a'})
    this.setState({topBtnColorPharmacy: '#9B9B9B'});
  }

  pharmacyView = () => 
  {
    this.getPharmacyLocations();
    this.setState({topBtnColorPharmacy: '#32539a'});
    this.setState({topBtnColorHospital: '#9B9B9B'});
  }


  state1 = {
    index: 0,
    routes: [
      { key: 'hospital', title: 'Hospital'},
      { key: 'pharmacy', title: 'Pharmacy'},
    ],
  }


  componentDidMount()
  {
    this.getHospitalLocations();
  }

  render() {

 
    return (
       <View style={styles.container}>

        <Header
          leftComponent={{icon:'menu', color:'#919191', onPress: () => this.props.navigation.openDrawer()}}
          // centerComponent={{text: 'Locator', style: {color: '#919191'}}}
          // rightComponent={{icon: 'notifications', color: '#919191', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3, position: 'absolute'}}
        />

        
        <View style={{position: 'absolute', alignSelf: 'center', justifyContent: 'center', marginTop: 15, flexDirection: 'row'}}>
          <Button
            title='Hospital'
            buttonStyle={[styles.topBtns, {backgroundColor: this.state.topBtnColorHospital}]}
            onPress={this.hospitalView}
          />
          <Button
            title='Pharmacy'
            buttonStyle={[styles.topBtns, {backgroundColor: this.state.topBtnColorPharmacy}]}
            onPress={this.pharmacyView}
          />
        </View>

        {/* <TabView
          navigationState={this.state1}
          renderScene={SceneMap({
            hospital: this.HospitalTab,
            pharmacy: this.PharmacyTab,
          })}
          onIndexChange={index => this.setState({index})}
          initialLayout={{width: width, height: height, backgroundColor: 'transparent'}}
          indicatorStyle={{ backgroundColor: 'white'}}
          style={{backgroundColor: 'transparent'}}
        /> */}

        <View style={{height: height}}>

          <View style={{
            ...StyleSheet.absoluteFillObject, zIndex: -1
            }}>
              <MapView
                style={{...StyleSheet.absoluteFillObject}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 6.927079,
                  longitude: 79.861244,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >

              {
                this.state.places.map(marker => (
                  <MapView.Marker
                      coordinate={{
                          latitude: marker.latitude,
                          longitude: marker.longitude
                        }}
                      title={marker.name}
                      description={marker.address}
                    />
                ))
              }
                
              </MapView>
            </View>

        </View>

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
  topBtns: {
  }
});

