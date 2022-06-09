import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Flatbutton from './components/Flatbutton.js';
import Login_page from './screens/Login_page.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator }from '@react-navigation/native-stack';
import  AuthStacks  from './navigation/AuthStacks.js';
import Home_navigation  from './navigation/Home_navigation.js';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import supabaseClient from './lib/supabase.ts';


const Stack = createNativeStackNavigator();


export default App = ({ navigation }) => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAuth(supabase.supabaseClient.auth.session());
        supabase.supabaseClient.auth.onAuthStateChange((_event, session) => {
        setLoading(false);
        supabase.supabaseClient.auth.onAuthStateChange((_event, session) => {
            console.log(session);
            setAuth(session);

        })
    });
    return (
        <NavigationContainer>
            {auth ? <Home_navigation/> : <AuthStacks/>}
        </NavigationContainer>)
})}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        toppadding: 10,
        backgroundColor: '#EBECF0',
        alignItems: 'center',
       justifyContent: 'flex-start'
    }, image: {
        width: 500,
        height: 800,
        justifyContent: "flex-start"
    }, fixToText: {
        flexDirection: 'row',
        justifyContent: "space-around"
    }, separator: {
        marginVertical: 8,
        orderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
});

