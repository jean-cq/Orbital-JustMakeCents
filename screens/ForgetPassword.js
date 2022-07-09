// JavaScript source code
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
// Set up a Login component
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { authentication } from "../lib/firebase.js";
import { sendPasswordResetEmail, getAuth} from 'firebase/auth';
import { usePasswordReset } from '../lib/usePasswordReset.js';
import Home_navigation from '../navigation/Home_navigation.js';
import Login_page from './Login_page.js';

export default ForgetPassword = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [isSignedIn, setIsSignedIn] = useState(false);

    const [email, setEmail] = useState('')
    const actionCodeSettings = {
        url: 'https://my-first-project-29287.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
        //This domain must be verified in your Firebase Console
        // 'Authentication -> Templates -> Password reset -> Edit Template -> Customize domain'
      /*
        handleCodeInApp: undefined,
        iOS: {
          bundleId: undefined,
        },
        android: {
          packageName: undefined,
          installApp: undefined,
          minimumVersion: undefined,
        },
        dynamicLinkDomain: undefined,*/
      };

    const handlePasswordReset = async (email) => {
        await sendPasswordResetEmail(authentication, email, actionCodeSettings)
        .then(()=>{
            Alert.alert("Email sent");
            navigation.goBack();
        })
            .catch((re) => {
                console.log(re);
            Alert.alert("Incorrect email");
        })
    }
  
   
 

  

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text_footer, {
                marginTop: 35, marginLeft: 10, marginBottom: 10
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
            <TextInput
                placeholder="Your Email"
                placeholderTextColor="grey"
                marginHorizontal={10}
                style={styles.textInput}
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
                
            />

            </View>
            
            
            <View style={styles.fixToText}>
                <Flatbutton text='Send Email' onPress={() => handlePasswordReset(email)} />
            </View>
            
        </SafeAreaView>
        
        
        
        )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        toppadding: 10,
        backgroundColor: 'gold',
        alignItems: 'stretch',

        justifyContent: 'flex-start'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'black',
    },
        action: {
            flexDirection: 'row',
            marginHorizontal: 10,
            borderBottomWidth: 3,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5
    },
    textInput: {
        textAlign: 'left'

    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginVertical: 50,
        
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    }

});