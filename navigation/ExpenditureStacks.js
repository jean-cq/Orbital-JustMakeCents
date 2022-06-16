import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Flatbutton from '../components/Flatbutton.js';
import Login_page from '../screens/Login_page.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Expenditure from '../screens/Expenditure.js';
import Add_Expenditure_1 from '../screens/Add_Expenditure_1.js';
import { useState, useEffect } from 'react';
import Wallet from '../screens/Wallet.js';
import Budget from '../screens/Budget.js';


const Stack = createNativeStackNavigator();


export default ExpenditureStacks = () => {
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
                <Stack.Screen name="Expenditure" component={Expenditure} options={{
                title: "Expenditure",
                headerShown: true
                }}
            />

            <Stack.Screen name="Wallet" component={Wallet} options={{
                title: "Wallet",
                
            }}
            />

            <Stack.Screen name="Budget" component={Budget} options={{
                title: "Budget",
                
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

