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
import { PERMISSIONS, check, request } from 'react-native-permissions';



const Stack = createNativeStackNavigator();


export default App = ({ navigation }) => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [cameraGranted, setCameraGranted] = useState(false);
  const handleCameraPermission = async () => {
    const res = await check(PERMISSIONS.IOS.CAMERA);
    
    if (res === RESULTS.GRANTED) {
      setCameraGranted(true);
    } else if (res === RESULTS.DENIED) {
      const res2 = await request(PERMISSIONS.IOS.CAMERA);
      res2 === RESULTS.GRANTED 
        ? setCameraGranted(true)
        : setCameraGranted(false);
    }
 };
  
  useEffect(() => {
    handleCameraPermission(); 
  }, []);

    useEffect(() => {
        setAuth(supabase.auth.session());
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log(session);
            setAuth(session);

        })
    });
    return (<View>
        <NavigationContainer>
            {auth ? <Home_navigation/> : <AuthStacks/>}
        </NavigationContainer>
        {cameraGranted 
            ? <Text>Camera Granted! Display in-app camera...</Text> 
            : <Text>Camera Disallowed</Text>
          }
          </View>)
}


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

