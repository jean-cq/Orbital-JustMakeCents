import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile.js';
import ProfileStacks from './ProfileStacks.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';
import MaterialCommunityIcons from '../node_modules/@expo/vector-icons/MaterialCommunityIcons.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js'

import ExpenditureStacks from '../navigation/ExpenditureStacks.js';
import Expenditure from '../screens/Expenditure.js';
import BudgetStacks from './BudgetStack.js';
import AnalyticsStacks from './AnalyticsStacks.js';
import LendingStacks from './LendingStacks.js';

import Add_Expenditure_1 from '../screens/Add_Expenditure_1.js';

function ShoppingListScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Shopping List!</Text>
      </View>
    );
  }
  
  function AnanlyticsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Analytics!</Text>
      </View>
    );
  }
  
  function LendingScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Lending and Borrowing!</Text>
      </View>
    );
  }


  const Tab = createBottomTabNavigator();
  
  export default function Home_navigation() {
    return (
  
      <Tab.Navigator
        screenOptions={({ route }) => ({
           headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Analytics') {
              return (
                <Ionicons
                name={
                  focused
                    ? 'bar-chart'
                    : 'bar-chart-outline'
                }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Expenditure') {
              return (
                <MaterialCommunityIcons
                name={
                  focused
                    ? 'book-open-page-variant'
                    : 'book-open-page-variant-outline'
                }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'New Entry') {
            return (
              <Ionicons
              name={
                focused
                  ? 'add-circle'
                  : 'add-circle-outline'
              }
                size={size}
                color={color}
              />
            );
          }
            else if (route.name === 'Lending & Borrowing') {
              return (
                <MaterialCommunityIcons
                name={
                  focused
                    ? 'account-switch'
                    : 'account-switch-outline'
                }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <FontAwesome
                name={
                  focused
                    ? 'user'
                    : 'user-o'
                }
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'orange',
        })}
      >
        <Tab.Screen name="New Entry" component={Add_Expenditure_1}/>
          <Tab.Screen name="Analytics" component={AnalyticsStacks} />
            <Tab.Screen name="Expenditure" component={ExpenditureStacks} options={{
                headerShown: false
            }}/>
          
          <Tab.Screen name="Lending & Borrowing" component={LendingStacks}/>
          <Tab.Screen name="Profile" component={ProfileStacks} options={{
                headerShown: false}}
                />
        </Tab.Navigator>
    
    );
  }