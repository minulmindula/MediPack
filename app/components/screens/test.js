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
import firebase from 'firebase';

import APILinks from '../../config/API';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ChatScreen extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            chatUsername: this.props.navigation.state.params.chatUsername,
            status: this.props.navigation.state.params.status,
            docID: this.props.navigation.state.params.docID,
            textMessage: '',
            messageList: [],
            userid: '',
            time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
        }

    }

    sendMessage = async() => {
        if(this.state.textMessage.length > 0){
            let msgId=firebase.database().ref('messages').child(this.state.userid).child(this.state.docID);
            let updates = {};
            let messages = {
                message: this.state.textMessage,
                time: this.state.time,
                from: this.state.docID
            }
            updates['messages/'+this.state.userid+'/'+this.state.docID+'/'+msgId] = messages;
            updates['messages/'+this.state.docID+'/'+this.state.userid+'/'+msgId] = messages;
            firebase.database().ref().update(updates);
            this.setState({textMessage: ''});
        }
    }

    getUserID = async () => {
        let userID = await AsyncStorage.getItem('userID');
        return userID;
    }
    

    componentDidMount()
    {
        this.getUserID().then((userID) => {
            this.getMessages(userID, this.state.docID);
            this.setState({
                userid: JSON.parse(userID)
            });
        })

        // this.getMessagesIncoming(this.state.docID);
    }

    componentWillMount()
    {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCOasJv0oU-jjM-AG0WOWYjFm94ZgOfaXU",
            authDomain: "medipack-fp-nsbm117.firebaseapp.com",
            databaseURL: "https://medipack-fp-nsbm117.firebaseio.com",
            projectId: "medipack-fp-nsbm117",
            storageBucket: "medipack-fp-nsbm117.appspot.com",
            messagingSenderId: "349539410755"
        };
        firebase.initializeApp(config);

    }

    renderRow = ({item}) => {
        return(
            <View style={{
                flexDirection: 'row',
                width: width / 1.2
            }}>

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

                <FlatList
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={styles.messageBox}
                        placeholder="Enter message ..."
                        placeholderTextColor='grey'
                        // value={this.state.mobileNumber}
                        onChangeText={(text) => this.setState({message:text})}
                    />
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Image 
                            source={require('../../assets/images/Chat/send.png')}
                            style={{width: width / 10, height: height / 15, resizeMode: 'contain', marginLeft: 10}}
                        />
                    </TouchableOpacity>
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
messageBox: {
    width: width / 1.2,
    height: height / 20,
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