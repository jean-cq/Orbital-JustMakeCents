import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import B_borrowing from '../screens/B_borrowing.js';
import B_lending from '../screens/B_lending.js'

const Tab = createMaterialTopTabNavigator();

export default function LendingStacks() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 220 },
          tabBarStyle: { backgroundColor: 'yellow' },
        }}
      >
        <Tab.Screen name="Lending" component={B_lending}/>
        <Tab.Screen name="Borrowing" component={B_borrowing}/>
      </Tab.Navigator>
  );
}