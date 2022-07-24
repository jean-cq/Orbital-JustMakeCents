import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Animated, View, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import A_week from '../screens/A_week.js';
import A_month from '../screens/A_month.js';
import A_year from '../screens/A_year.js';

const Tab = createMaterialTopTabNavigator();
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function AnalyticsStacks() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: WIDTH/3 },
          tabBarStyle: { backgroundColor: 'yellow' },
        }}
      >
        <Tab.Screen name="Week" component={A_week} />
        <Tab.Screen name="Month" component={A_month}/>
        <Tab.Screen name="Year" component={A_year}/>
      </Tab.Navigator>
  );
}