import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  AuthStacks  from './navigation/AuthStacks.js';
import Home_navigation  from './navigation/Home_navigation.js';
import { authentication } from './lib/firebase.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default App = ({ navigation }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            {authentication.currentUser === null ? 
            <Stack.Screen name="AuthStacks" component={AuthStacks} options={{
                    headerShown: false
                }} />
            :<Stack.Screen name="Home_navigation" component={Home_navigation} options={{
                    headerShown: false
                }} />
                }
           
           </Stack.Navigator>
           
        </NavigationContainer>
        
        )
}