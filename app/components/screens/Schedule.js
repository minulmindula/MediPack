import React, {Component} from 'react';
import {
    View,
    Dimensions, 
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Picker,
    AsyncStorage
} from 'react-native';
import {Header, Card} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = new Date().getDay();

export default class Schedule extends Component {

    getNextDay = () =>
    {
        // alert(day);
        if(this.state.currentDay == 'Saturday')
        {
            this.setState({nextDay: 'Sunday'});

        }else{
            this.setState({nextDay: names[day + 1]});
        }

    }

    constructor(props){
        super(props);
        this.state = {
            userid: '',
            currentDay: names[day],
            nextDay: null,

            today_m: false,
            today_a: false,
            today_n: false,

            tomo_m: false,
            tomo_a: false,
            tomo_n: false,

            loadCard: true,
            filteredCard: false,
            emptyCard: false,

            filterSchedule_m: false,
            filterSchedule_a: false,
            filterSchedule_n: false,

            dayFromPicker: '',
            timeFromPicker: ''

        };
      

    }

    filterSchedule = () => {
// alert('hi');
        this.setState({loadCard: false});
        this.setState({filteredCard: true});

        var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
              "userid": this.state.userid,
              "day": this.state.dayFromPicker
            })
          };
      
          fetch(APILinks.singleDaySchedule, object)
          .then((response) => response.json())
          .then((responseText) => {
      
            if(responseText.success == true){
      
            //   alert(responseText.data[0].day);

            if(responseText.data[0].morning == 1)
            {
                this.setState({filterSchedule_m: true});
            }

            if(responseText.data[0].afternoon == 1)
            {
                this.setState({filterSchedule_a: true});
            }

            if(responseText.data[0].night == 1)
            {
                this.setState({filterSchedule_n: true});
            }
             
            }else{
              alert('No data retrieved');
            }
      
          })
          .catch((error) => {
            alert("error");
          })
    }

    getUserID = async () => {
        let userID = await AsyncStorage.getItem('userID');
        return userID;
    }

    async getTodaySchedule(userID)
    {
        
        let uid = JSON.parse(userID);

        var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
              "userid": uid,
              "day": this.state.currentDay
            })
          };
      
          fetch(APILinks.singleDaySchedule, object)
          .then((response) => response.json())
          .then((responseText) => {
      
            if(responseText.success == true){
      
            //   alert(responseText.data[0].day);

            if(responseText.data[0].morning == 1)
            {
                this.setState({today_m: true});
            }

            if(responseText.data[0].afternoon == 1)
            {
                this.setState({today_a: true});
            }

            if(responseText.data[0].night == 1)
            {
                this.setState({today_n: true});
            }
             
            }else{
              alert('Today schedule error');
            }
      
          })
          .catch((error) => {
            alert("error");
          })
    }

    async getTomorrowSchedule(userID)
    {
        let uid = JSON.parse(userID);

        var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
              "userid": uid,
              "day": this.state.nextDay
            })
          };
      
          fetch(APILinks.singleDaySchedule, object)
          .then((response) => response.json())
          .then((responseText) => {
      
            if(responseText.success == true){
      
            //   alert(responseText.data[0].day);

            if(responseText.data[0].morning == 1)
            {
                this.setState({tomo_m: true});
            }

            if(responseText.data[0].afternoon == 1)
            {
                this.setState({tomo_a: true});
            }

            if(responseText.data[0].night == 1)
            {
                this.setState({tomo_n: true});
            }
             
            }else{
              alert('Tomorrow schedule error');
            }
      
          })
          .catch((error) => {
            alert("error");
          })
    }



    componentDidMount() {


        this.getUserID().then((userID) => {
            this.getTodaySchedule(userID);
            this.getTomorrowSchedule(userID);
            this.setState({
                userid: JSON.parse(userID)
            });
        })

        this.getNextDay();
        this.getTodaySchedule();
        this.getTomorrowSchedule();
        this.setState({dayFromPicker: this.state.currentDay});

    }

    render() {
        return(

            <View style={styles.container}>
                <Header
                    leftComponent={{icon:'menu', color:'#919191', onPress: () => this.props.navigation.openDrawer()}}
                    centerComponent={{text: 'Schedule'}}
                    rightComponent={{icon: 'notifications', color: '#919191', onPress: () => alert('Hoi')}}
                    backgroundColor='transparent'
                    outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
                />

                <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 5, justifyContent: 'center', alignItems: 'center'}}>
                    
                    <Picker
                        selectedValue={this.state.dayFromPicker}
                        style={{width: width / 2.5}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({dayFromPicker: itemValue})
                    }>
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>

                    <TouchableOpacity
                        style={{width: width / 8, backgroundColor: '#32539a', padding: 7, alignSelf: 'center', alignItems: 'center', marginHorizontal: 10, borderRadius: 5}}
                        onPress={this.filterSchedule}
                    >
                        <Text style={{ color: 'white'}}>Filter</Text>
                    </TouchableOpacity>
                   
                    {/* <Picker
                        selectedValue={this.state.timeFromPicker}
                        style={{height: 50, width: width / 3, color: 'grey'}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({timeFromPicker: itemValue})
                        }>
                        <Picker.Item label="Morning" value="Morning" />
                        <Picker.Item label="Afternoon" value="Afternoon" />
                        <Picker.Item label="Night" value="Night" />
                    </Picker> */}

                </View>

               {/* <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                   

                    <TouchableOpacity
                        style={{width: width / 4, backgroundColor: '#FF8E8E', padding: 7, alignSelf: 'center', alignItems: 'center'}}
                    >
                        <Text>Cancel Filter</Text>
                    </TouchableOpacity>
               </View> */}
               

                <View style={styles.bgBox}>
                {
                    this.state.loadCard ? 
                    <View>
                        <Card title='Today Schedule' containerStyle={styles.cardStyle}>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Text style={{fontWeight: 'bold', width: width / 6}}>7:00 AM</Text>
                                {
                                    this.state.today_m ? 
                                    <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                    <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                                }
                            </View>
                            
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Text style={{fontWeight: 'bold', width: width / 6}}>12:00 PM</Text>
                                {
                                    this.state.today_a ? 
                                    <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                    <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                                }
                            </View>

                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Text style={{fontWeight: 'bold', width: width / 6}}>7:00 PM</Text>
                                {
                                    this.state.today_n ? 
                                    <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                    <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                                } 
                            </View>
                        </Card>

                        <Card title='Tomorrow Schedule' containerStyle={styles.cardStyle}>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Text style={{fontWeight: 'bold', width: width / 6}}>7:00 AM</Text>
                                {
                                    this.state.tomo_m ? 
                                    <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                    <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                                }
                            </View>
                            
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Text style={{fontWeight: 'bold', width: width / 6}}>12:00 PM</Text>
                                {
                                    this.state.tomo_a ? 
                                    <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                    <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                                }
                            </View>

                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Text style={{fontWeight: 'bold', width: width / 6}}>7:00 PM</Text>
                                {
                                    this.state.tomo_n ? 
                                    <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                    <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                                } 
                            </View>
                        </Card>
                    </View>

                    :

                    <Card title='Filtered Schedule' containerStyle={styles.cardStyle}>
                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                            <Text style={{fontWeight: 'bold', width: width / 6}}>7:00 AM</Text>
                            {
                                this.state.filterSchedule_m ? 
                                <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                            }
                        </View>
                        
                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                            <Text style={{fontWeight: 'bold', width: width / 6}}>12:00 PM</Text>
                            {
                                this.state.filterSchedule_a ? 
                                <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                            }
                        </View>

                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                            <Text style={{fontWeight: 'bold', width: width / 6}}>7:00 PM</Text>
                            {
                                this.state.filterSchedule_n ? 
                                <Text style={{marginLeft: 30, color: 'green'}}>Medication available</Text> : 
                                <Text style={{marginLeft: 30, color: 'red'}}>No medication</Text>
                            } 
                        </View>
                    </Card>

                }
                   
                   
                </View>

               
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    icon: {
        width: width / 14,
        height: height / 28,
        marginBottom: 10
    },
    topDayButtons: {
        width: width / 15,
        height: height / 25,
        resizeMode: 'contain',
        backgroundColor: 'lightgrey',
        borderRadius: 50,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    textInDayBtn:{
        alignSelf: 'center',
        fontSize: RF(1.5),
        color: 'grey'
    },
    TimeButtons:{
        width: width / 6,
        height: height / 20,
        resizeMode: 'contain',
        backgroundColor: 'lightgrey',
        borderRadius: 50,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    textInTimeBtn:{
        alignSelf: 'center',
        fontSize: RF(1.8),
        color: 'grey'
    },
    bgBox: {
        marginTop: 15, 
        backgroundColor: '#6971a3', 
        height: height / 1.2,
        width: width
    },
    cardStyle:{
        borderRadius: 5,
        elevation: 5
    }
})