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
    Alert,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage,
    ActivityIndicator,
    BackHandler } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import Loader from '../src/Loader';
import AwesomeAlert from 'react-native-awesome-alerts';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = new Date().getDay();

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      userID: null,
      time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}),
      dayName: names[day],
      date: new Date().toLocaleDateString(),
      dayHours: new Date().getHours(),
      mainClockAP: "",
      username: null,
      morningStat: 0,
      afternoonStat: 0,
      nightStat: 0,
      nextTime: "00",
      timeAP: "",
      nextMedDay: ""
    };
  }


  //Get user ID  - Akila
  getUserID = async () => {
    let userID = await AsyncStorage.getItem('userID');
    return userID;
  }

  //Get Username - Akila
  getUserName = async () => {
    let uname = await AsyncStorage.getItem('uname');
    return uname;
  }

  _OpenDrawer = () => {
    this.props.navigation.openDrawer();
  }

  async getSummaryOfDay(userID) {

    let uid = JSON.parse(userID);

    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        "userid": uid,
        "dow": day,
        "currentTimeHrs": this.state.dayHours
      })
    };

    fetch(APILinks.summaryOfDay, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){

        try{
          const morningStatus = responseText.data.morning;
          const afternoonStatus = responseText.data.afternoon;
          const nightStatus = responseText.data.night;

          this.setState({morningStat: morningStatus});
          this.setState({afternoonStat: afternoonStatus});
          this.setState({nightStat: nightStatus});
  
        }catch{
          alert("Error encounted!");
        }
       
      }else{
        alert('Invalid credentials');
      }

    })
    .catch((error) => {
      alert("error");
    })
    
  }


  async nextMedTime(userID)
  {

    let uid = JSON.parse(userID);

    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        "userid": uid,
        "currentTime": this.state.dayHours
      })
    };

    fetch(APILinks.nextmedTime, object)
    .then((response) => response.json())
    .then((responseText) => {

      if(responseText.success == true){

        try{
          const nextTime = responseText.data.time;

          if(nextTime != null){
            if(nextTime > 9)
            {
              this.setState({nextTime: nextTime});
            }else{
              this.setState({nextTime: '0' + nextTime});
            }
            
            if(nextTime > 0 && nextTime < 12)
            {
              this.setState({timeAP: 'AM'});
            }else{
              this.setState({timeAP: 'PM'});
            }


          }else{
            alert("Error");
          }
          
  
        }catch{
          alert("Error encounted!");
        }
       
      }else{
        alert('Error in getting NextTime');
      }

    })
    .catch((error) => {
      alert("error");
    })

  }


  componentDidMount() {

    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

     //New methods
    this.getUserID().then((userID) => {
      this.nextMedTime(userID);
      this.getSummaryOfDay(userID);
      this.setState({
        userID: JSON.parse(userID)
      });
    })

    this.timer = setInterval(() => {
      this.getUserID().then((userID) => {
        this.nextMedTime(userID);
        this.getSummaryOfDay(userID);
        this.setState({
          userID: JSON.parse(userID)
        });
      })
    }, 3000);

    // this.getUserName().then((uname) => {
    //   this.setState({
    //     uname:JSON.parse(uname)
    //   });
    // })

    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );

    if(this.state.dayHours >= 0 && this.state.dayHours < 12)
    {
      this.setState({mainClockAP: 'AM'});

    }else if(this.state.dayHours >= 12)
    {
      this.setState({mainClockAP: 'PM'});
    }

    if(this.state.dayHours > 19){
      this.setState({nextMedDay: 'Tomorrow'})
    }else{
      this.setState({nextMedDay: 'Today'})
    }

  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }

  summaryOfDay_images_morning(){

    if(this.state.morningStat == 1)
    {
      return (
        <Image
          source={require('../../assets/images/Home/OnTime.png')}
          style={{width: width / 4.8, height: height / 42.5, resizeMode: 'contain'}}
        />
      );
    }else if(this.state.morningStat == 0)
    {
      return (
        <Image
          source={require('../../assets/images/Home/Missed.png')}
          style={{width: width / 4.8, height: height / 42.5, resizeMode: 'contain'}}
        />
      );
    }else if(this.state.morningStat == 2)
    {
      return (
        <Image
          source={require('../../assets/images/Home/pending.png')}
          style={{width: width / 4.8, height: height / 42.5, resizeMode: 'contain'}}
        />
      );
    }

  }


  summaryOfDay_images_afternoon(){

    if(this.state.afternoonStat == 1)
    {
      return (
        <Image
          source={require('../../assets/images/Home/OnTime.png')}
          style={{width: width / 4.8, height: height / 42.5, marginTop: 18, resizeMode: 'contain'}}
        />
      );
    }else if(this.state.afternoonStat == 0)
    {
      return (
        <Image
          source={require('../../assets/images/Home/Missed.png')}
          style={{width: width / 4.8, height: height / 42.5, marginTop: 18, resizeMode: 'contain'}}
        />
      );
    }else if(this.state.afternoonStat == 2)
    {
      return (
        <Image
          source={require('../../assets/images/Home/pending.png')}
          style={{width: width / 4.8, height: height / 42.5, marginTop: 18, resizeMode: 'contain'}}
        />
      );
    }

  }


  summaryOfDay_images_night()
  {

    if(this.state.nightStat == 1)
    {
      return (
        <Image
          source={require('../../assets/images/Home/OnTime.png')}
          style={{width: width / 4.8, height: height / 42.5, marginTop: 18, resizeMode: 'contain'}}
        />
      );
    }else if(this.state.nightStat == 0)
    {
      return (
        <Image
          source={require('../../assets/images/Home/Missed.png')}
          style={{width: width / 4.8, height: height / 42.5, marginTop: 18, resizeMode: 'contain'}}
        />
      );
    }else if(this.state.nightStat == 2)
    {
      return (
        <Image
          source={require('../../assets/images/Home/pending.png')}
          style={{width: width / 4.8, height: height / 42.5, marginTop: 18, resizeMode: 'contain'}}
        />
      );
    }

  }

  render() {


    return (
       <View style={styles.container}>


          <Header
            leftComponent={{icon:'menu', color:'#919191', onPress: () => this._OpenDrawer()}}
            rightComponent={{icon: 'notifications', color: '#919191', onPress: () => alert('Hoi')}}
            backgroundColor='transparent'
            outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
          />

          <View style={styles.digitalClock}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: RF(10)}}>{this.state.time}</Text>
            </View>
            <Text style={{fontSize: RF(3)}}>{this.state.dayName} {this.state.date}</Text>
          </View>
          

          <View style={styles.nextReminderCard}>
            <Image
              source={require('../../assets/images/Home/ReminderTimeClock.png')}
              style={{flex:1, resizeMode: 'center', position: 'absolute', width: width / 1.1, height: height / 3.6, resizeMode: 'contain'}}
            />

            <Text style={{color: 'white', fontSize: RF(4.2)}}>Next pill reminder time</Text>

            <View style={{flexDirection: 'row', width: width / 2}}><Text style={{color: 'white', fontSize: RF(10)}}>{this.state.nextTime} : 00</Text></View>
            <Text style={{color: 'white', fontSize: RF(2.6)}}>{this.state.nextMedDay}</Text>
            
            {/* <View style={{alignSelf: 'flex-end', backgroundColor: '#708BF0', borderRadius: 50, padding: 3, position: 'absolute'}}>
              <Icon
                name='arrow-forward'
                color='#273D92'
              />
            </View>

            <View style={{position:'absolute', alignSelf: 'flex-start', backgroundColor: '#708BF0', borderRadius: 50, padding: 3}}>
              <Icon
                name='arrow-back'
                color='#273D92'
              />
            </View> */}

          </View>

          <View style={styles.summaryCard}>
            <Image
              source={require('../../assets/images/Home/SummeryRectangle.png')}
              style={{flex:1, width: width, height: height / 2.5}}
            />
          </View>

          {/* <TouchableOpacity
            // onPress={this.props.navigation.navigate("Schedule", {screen: "Schedule"})}
            style={{width: width / 4.9, alignSelf: 'center'}}
          >
            <Image
              source={require('../../assets/images/Home/summary_icon_header.png')}
              style={{width: width / 4.9, height: height / 11, alignSelf: 'center', marginTop: 28, resizeMode: 'contain'}}
            />
          </TouchableOpacity> */}
          
            <Text style={{color: 'white', fontSize: RF(3), alignSelf: 'center', marginTop: 100}}>
              Summary Of the Day
            </Text>

            <View style={{height: height / 4.2, alignItems: 'center', marginTop: 25}}>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>

                <View style={[ {flexDirection: 'column', width: width / 2.5}]}>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/Home/morning.png')}
                      style={styles.icon}
                    />
                    <Text style={{marginLeft: 15, fontSize: RF(2.4), color: 'white'}}>Morning</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/Home/afternoon.png')}
                      style={styles.icon}
                    />
                    <Text style={{marginLeft: 15, fontSize: RF(2.4), color: 'white'}}>Afternoon</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/Home/night.png')}
                      style={styles.icon}
                    />
                    <Text style={{marginLeft: 15, fontSize: RF(2.4), color: 'white'}}>Night</Text>
                  </View>

                </View> 

                <View style={{flexDirection: 'column'}}>

                  {this.summaryOfDay_images_morning()}
                  {this.summaryOfDay_images_afternoon()}
                  {this.summaryOfDay_images_night()}
                
                </View>

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
    width: width,
    backgroundColor: 'white',
  },
  nextReminderCard: {
    backgroundColor: 'transparent',
    height: height / 5,
    width: width / 1.05,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 10
  },
  summaryCard: {
    height: height / 2.9,
    width: width,
    position: 'absolute',
    bottom:0,
    left:0,
  },
  digitalClock:{
    backgroundColor: 'transparent',
    height: height / 4.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
    width: width / 1.3,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  icon: {
    width: width / 12,
    height: height / 26,
    marginBottom: 10
  }
});

