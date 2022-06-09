import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Flatbutton from '../components/Flatbutton.js';
import Login_page from '../screens/Login_page.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Expenditure from '../screens/Expenditure.js';
import Add_Expenditure from '../screens/Add_Expenditure.js';
import { useState, useEffect } from 'react';
import Books from '../screens/Books.js'
import Home_navigation from './Home_navigation.js';


const Stack = createNativeStackNavigator();


export default ExpenditureStacks = () => {
    return (
        
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'gold',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            >
                <Stack.Screen name="Expenditure" component={Expenditure} options={{
                headerShown: false,
            }}
                />
            <Stack.Screen name="Add_Expenditure" component={Add_Expenditure} options={{
                title: 'Add_Expenditure'
                }}/>
            </Stack.Navigator>
        )
      
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

    }
});

