

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView } from 'react-native';
import {Header, Card} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class PrivacyPolicy extends Component {


  render() {

    return (
      <View style={styles.container}>

        <Header
            leftComponent={{icon:'arrow-back', color:'#919191', onPress: () => this.props.navigation.goBack()}}
            // rightComponent={{icon: 'notifications', color: '#919191', onPress: () => alert('Hoi')}}
            backgroundColor='transparent'
            outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3, width: width}}
        />

        <Text style={{fontSize: RF(3.5)}}>Privacy Policy</Text>

        <ScrollView style={{paddingBottom: 5}}>

            <Card>
                <Text style={styles.lineSpace}>Built the MediPack app as a Free app. This SERVICE is provided by at no cost and is intended for use as is. </Text>
                <Text style={styles.lineSpace}>This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.</Text>
                <Text style={styles.lineSpace}>If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used 
                for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.</Text>
                <Text style={styles.lineSpace}>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at MediPack unless otherwise defined in this Privacy Policy. </Text>
            </Card>

            <Card>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Information Collection and Use</Text>
                <Text style={styles.lineSpace}>For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. 
                The information that I request will be retained on your device and is not collected by me in any way. </Text>
                <Text style={styles.lineSpace}>The app does use third party services that may collect information used to identify you.</Text>
                <Text style={styles.lineSpace}>Link to privacy policy of third party service providers used by the app</Text>
                <Text style={[styles.lineSpace, {marginLeft: 10, marginTop: 5}]}>Google Play Services</Text>
                <Text style={[styles.lineSpace, {marginLeft: 10}]}>Firebase Analytics</Text>
            </Card>

            <Card>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Log Data</Text>
                <Text style={styles.lineSpace}>I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) 
                on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, 
                device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics. </Text>
            </Card>

            <Card>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Cookies</Text>
                <Text style={styles.lineSpace}>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. 
                These are sent to your browser from the websites that you visit and are stored on your device's internal memory. </Text>
                <Text style={styles.lineSpace}>This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services.
                 You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service. </Text>
            </Card>

            <Card>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Service Providers</Text>
                <Text style={styles.lineSpace}>I may employ third-party companies and individuals due to the following reasons:</Text>
                <Text style={[styles.lineSpace, {marginLeft: 10, marginTop: 5}]}>To facilitate our Service;</Text>
                <Text style={[styles.lineSpace, {marginLeft: 10}]}>To provide the Service on our behalf;</Text>
                <Text style={[styles.lineSpace, {marginLeft: 10}]}>To perform Service-related services; or</Text>
                <Text style={[styles.lineSpace, {marginLeft: 10}]}>To assist us in analyzing how our Service is used.</Text>
                <Text style={styles.lineSpace}>I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. 
                However, they are obligated not to disclose or use the information for any other purpose. </Text>
            </Card>

            <Card>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Security</Text>
                <Text style={styles.lineSpace}>I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of 
                transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security. </Text>
            </Card>

            <Card>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Links to Other Sites</Text>
                <Text style={styles.lineSpace}>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. 
                Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. </Text>
            </Card>

            <Card>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Children’s Privacy</Text>
                <Text style={styles.lineSpace}>These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child 
                under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, 
                please contact me so that I will be able to do necessary actions. </Text>
            </Card>

            <Card>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Changes to This Privacy Policy</Text>
                <Text style={styles.lineSpace}>I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new 
                Privacy Policy on this page. These changes are effective immediately after they are posted on this page. </Text>
            </Card>

            <Card style={{marginBottom: 20}}>
                <Text style={[styles.lineSpace, {fontWeight: 'bold'}]}>Contact Us</Text>
                <Text style={styles.lineSpace}>If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me. </Text>
                <Text style={styles.lineSpace}>This privacy policy page was created at <Text style={{color: '#708BF0'}}>privacypolicytemplate.net</Text> and modified/generated by <Text style={{color: '#708BF0'}}>App Privacy Policy Generator</Text></Text>
            </Card>

            <Text></Text>

        </ScrollView>

        

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
  }, 
  lineSpace:{
      marginBottom: 5
  }
  
});