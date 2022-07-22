import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Text, View, TextInput, Modal } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator }from '@react-navigation/native-stack';
import { useState, useEffect, useContext } from 'react';
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

    


    return (

        <SafeAreaView>
            <View style={{flexDirection: "row"}}>
            <AntDesign
                            name="github"
                            color={'black'}
                            size={30}
                            style={{ textAlign:'left',alignSelf:'center',flex:1}} />
                <Text>Github</Text>
                <Text>https://github.com/jean-cq/my-first-project</Text>
            </View>

            <View style={{flexDirection: "row"}}>
            <MaterialIcons
                            name="mail"
                            color={'black'}
                            size={30}
                            style={{ textAlign:'left',alignSelf:'center',flex:1}} />
                <Text>Email</Text>
                <Text>justmakecents2022@gmail.com</Text>
            </View>

            <View style={{flexDirection: "row"}}>
            <AntDesign
                            name="youtube"
                            color={'black'}
                            size={30}
                            style={{ textAlign:'left',alignSelf:'center',flex:1}} />
                <Text>Youtube</Text>
                <Text>https://www.youtube.com/channel/UCLeKbEDS8hJwK1Obu9wNpEQ</Text>
            </View>

        </SafeAreaView>

        )
}
