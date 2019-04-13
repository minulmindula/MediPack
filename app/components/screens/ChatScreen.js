
import React, {Component} from 'react';
import {StyleSheet, 
    Text, 
    View, 
    Alert,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    ListView,
    FlatList,
    AsyncStorage,
    KeyboardAvoidingView } from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ChatScreen extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            chatUsername: this.props.navigation.state.params.chatUsername,
            status: this.props.navigation.state.params.status,
            docID: this.props.navigation.state.params.docID,
            userid: '',
            messages: [],
            message: ''
        };

    }

    getUserID = async () => {
        let userID = await AsyncStorage.getItem('userID');
        return userID;
    }
    
    async getMessages(userID, docID){

        let uid = JSON.parse(userID);
        let did = JSON.parse(docID);

        var object = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify( {
            "userid": uid,
            "docid": did
          })
        };
    
        fetch(APILinks.getMessages, object)
        .then((response) => response.json())
        .then((responseText) => {
    
          if(responseText.success == true){
            
            this.setState({messages: responseText.data});
            
            // alert(responseText.data[0].Chat_Message);

    
          }else{
            // alert('Invalid credentials');
          }
    
        })
        .catch((error) => {
          // alert("error");
        })
    }


      _sendMessage = () => {

        // alert(this.state.message);
        var sender = this.state.userid;
        var reciever = this.state.docID;
        var message = this.state.message;


        var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
              "senderID": sender,
              "recieverID": reciever,
              "message": message
            })
          };
    
        fetch(APILinks.sendMessage, object)
        .then((response) => response.json())
        .then((responseText) => {
            
          if(responseText.success == true){
            
            alert(responseText.data);
    
          }else{
            alert('Invalid credentials');
          }
    
        })
        .catch((error) => {
          alert(error);
        })
    }


    componentDidMount()
    {
        this.getUserID().then((userID) => {
            this.getMessages(userID, this.state.docID);
            this.setState({
                userid: JSON.parse(userID)
            });
        })

        this.timer = setInterval(() => {
            this.getUserID().then((userID) => {
                this.getMessages(userID, this.state.docID);
            })
          }, 3000);

        // alert(this.doctorID())3

        // this.getMessagesIncoming(this.state.docID);
    }

    doctorID ()
    {
        return this.state.docID;
    }


    addMessages = () =>
    {
        alert(this.state.docID);
    }

    renderRow = ({item}) => {
        return (
            <View style={{
                maxWidth: width / 2, 
                minHeight: height / 30, 
                backgroundColor: item.Chat_UserID === this.state.userid ? '#32539a' : 'white' , 
                padding: 3, 
                borderRadius: 5, 
                alignSelf: item.Chat_UserID === this.state.userid ? 'flex-end' : 'flex-start', 
                marginLeft: 18, 
                marginRight: 18,
                marginTop: 10, 
                marginBottom: 3,
                elevation: 5}}>
                <Text style={{color: item.Chat_UserID === this.state.userid ? 'white' : '#686868', padding: 6}}>
                    {item.Chat_Message}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: item.Chat_UserID === this.state.userid ? '#C6C6C6' : '#A2A2A2', padding: 6, fontSize: RF(1.4)}}>
                        {item.Chat_MessageTime}
                    </Text>
                    <Text style={{color: item.Chat_UserID === this.state.userid ? '#C6C6C6' : '#A2A2A2', padding: 6, fontSize: RF(1.4)}}>
                        {item.Chat_MessageDate}
                    </Text>
                </View>
                

            </View>
        );
    }

    render() {
        return(
            <View>
            

                <Header
                    leftComponent={{icon:'arrow-back', color:'#ACACAC', onPress: () => this.props.navigation.goBack()}}
                    centerComponent={{text: this.state.chatUsername, style: {color: 'grey'}}}
                    // rightComponent={{text: this.state.status, color: '#ACACAC', onPress: () => alert('Hoi')}}
                    backgroundColor='transparent'
                    outerContainerStyles={{height: 70 - 18, borderBottomColor: 'lightgrey'}}
                />


                <ScrollView 
                    style={styles.chatArea}
                    ref="scrollView"
                    onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>

                    <FlatList
                        data = {this.state.messages}
                        renderItem = {this.renderRow}
                        keyExtractor = {(item, index) => index.toString()}
                    />


                </ScrollView>

                <KeyboardAvoidingView behavior='position' enabled>

                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.messageBox}
                            placeholder="Enter message ..."
                            placeholderTextColor='grey'
                            // value={this.state.mobileNumber}
                            onChangeText={(text) => this.setState({message: text})}
                        />
                        <TouchableOpacity onPress={this._sendMessage}>
                            <Image 
                                source={require('../../assets/images/Chat/send.png')}
                                style={{width: width / 10, height: height / 15, resizeMode: 'contain', marginLeft: 10}}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
               
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
messageBox: {
    width: width / 1.2,
    height: height / 18,
    marginLeft: 10,
    marginTop: 10,
    paddingLeft: 5,
},
chatArea: {
    width: width,
    height: height / 1.23,
    backgroundColor: 'lightgrey'
}
});