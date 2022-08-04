import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions } from 'react-native';

import B_month from '../screens/B_month.js';
import B_year from '../screens/B_year.js';

const Tab = createMaterialTopTabNavigator();
const WIDTH = Dimensions.get('window').width;

export default function BudgetStacks() {
    return (


      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: WIDTH/2 },
          tabBarStyle: { backgroundColor: 'yellow' },
        }}
      >
        
        <Tab.Screen name="Month" component={B_month}/>
        <Tab.Screen name="Year" component={B_year}/>
      </Tab.Navigator>
  );
}