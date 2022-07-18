import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Flatbutton from '../components/Flatbutton.js';
import Login_page from '../screens/Login_page.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Expenditure from '../screens/Expenditure.js';
import Add_Expenditure_1 from '../screens/Add_Expenditure_1.js';
import { useState, useEffect } from 'react';
import Profile from '../screens/Profile.js';
import Starting_page from '../screens/Starting_page.js';
import Profile_edit from '../screens/Profile_edit.js';

const Stack = createNativeStackNavigator();


export default ProfileStacks = () => {
    return (
        
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            >
                <Stack.Screen name="Profile" component={Profile} options={{
                title: "Profile",
               
                }}
            />
                <Stack.Screen name="Profile_edit" component={Profile_edit} options={{
                title: "My Profile"
                
            }}
            />
            </Stack.Navigator>
        )
      
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        toppadding: 10,
        backgroundColor: 'white',
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

    }
});

