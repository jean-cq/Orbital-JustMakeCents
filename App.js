import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Flatbutton from './components/Flatbutton.js';
import DefaultImage from './assets/starting_page.png';
import Login_page from './screens/Login_page.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Starting_page from './screens/Starting_page.js';

//import Navigator from './Navigation/HomeStack.js'

const Stack = createNativeStackNavigator();


export default App = () => {
    
    return (
        <NavigationContainer>

            <Stack.Navigator style={styles.navigator}>
                <Stack.Screen name="Welcome" component={Starting_page} options={{
                    title: 'Awesome app'
                }}
                />
                <Stack.Screen name="Login_page" component={Login_page} options={{
                    title: 'Log In',
                    backgroundColor:'gold'
                }}/>
                    </Stack.Navigator>
            
           </NavigationContainer>
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

    },
    navigator: {
        flex: 1,
        backgroundColor:'gold'
    }
});

