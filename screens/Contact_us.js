import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Text, View, TextInput, Modal, Linking } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator }from '@react-navigation/native-stack';
import { useState, useEffect, useContext, useCallback } from 'react';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';
import UserPermissions from '../lib/UserPermissions.js';
import * as ImagePicker from 'expo-image-picker';
import { getDoc, runTransaction, doc, setDoc, updateDoc, query, collection, onSnapshot } from 'firebase/firestore';
import { db, authentication } from '../lib/firebase.js';
import { getAuth, updatePassword } from "firebase/auth";
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default Contact_us = () => {

    const urlYoutube = 'https://www.youtube.com/channel/UCLeKbEDS8hJwK1Obu9wNpEQ';
    const handleYoutube = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(urlYoutube);
    
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(urlYoutube);
        } else {
          Alert.alert(`Don't know how to open this URL: ${urlYoutube}`);
        }
      }, [urlYoutube]);

      const urlGithub = 'https://github.com/jean-cq/my-first-project';
      const handleGithub = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(urlGithub);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(urlGithub);
          } else {
            Alert.alert(`Don't know how to open this URL: ${urlGithub}`);
          }
        }, [urlGithub]);


    return (
        
        <SafeAreaView>

            <View style = {{height: HEIGHT * 0.1, marginTop:30 ,width:WIDTH}}>
            <Ionicons
                            name="md-logo-snapchat"
                            color={'black'}
                            size={50}
                            style={{ textAlign:'center',alignSelf:'center'}} />
            </View>
            <View style = {styles.line}>
            </View>
            <TouchableOpacity onPress={handleYoutube}>
            <View style={styles.sectionContainer}>
            <AntDesign
                            name="youtube"
                            color={'black'}
                            size={30}
                            style={styles.icons} />
                <Text style = {styles.text}>Our Youtube Channel</Text>
                
                <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={20}
                            style={styles.arrow} />
                </View>
            </TouchableOpacity>
            <View style = {styles.line}>
            </View>
            <TouchableOpacity onPress={handleGithub}>
            <View style={styles.sectionContainer}>
            <AntDesign
                            name="github"
                            color={'black'}
                            size={30}
                            style={styles.icons} />
                <Text style = {styles.text}>Our Github Repository</Text>
                <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={20}
                            style={styles.arrow} />
                </View>                
            </TouchableOpacity>
            <View style = {styles.line}>
            </View>

            <View style={styles.sectionContainer}>
            <MaterialIcons
                            name="mail"
                            color={'black'}
                            size={30}
                            style={styles.icons} />
                <Text style = {styles.text}>Our Email</Text>
                
                <Text style = {styles.linktext}>justmakecents2022@gmail.com</Text>
            </View>
            <View style = {styles.line}>
            </View>
            
            

        </SafeAreaView>

        )
}

const styles = StyleSheet.create({
    sectionContainer:{
        flexDirection: "row", 
        paddingVertical:10,
        paddingHorizontal:10,
        width:WIDTH,
        height: HEIGHT *0.09
        
    },
    text:{
        padding:10
    },
    linktext:{
        paddingVertical: 10,
        paddingHorizontal:WIDTH * 0.25
    },
    icons:{
        textAlign:'left',alignSelf:'center'
    },
    line:{
        height: 1,
        backgroundColor:'#c4c4c4'
    },
    arrow:{
        textAlign:'right', 
        paddingHorizontal:WIDTH *0.93, 
        paddingVertical: HEIGHT * 0.03, 
        position: 'absolute' 
    }




})
