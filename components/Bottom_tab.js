import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

  function BookScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Books!</Text>
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

  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();
  
  export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="ShoppingList" component={ShoppingListScreen} />
          <Tab.Screen name="Analytics" component={AnanlyticsScreen} />
          <Tab.Screen name="Books" component={BookScreen}/>
          <Tab.Screen name="LendingAndBorrowing" component={LendingScreen}/>
          <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }