import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  AuthStacks  from './navigation/AuthStacks.js';
import Home_navigation  from './navigation/Home_navigation.js';
import { authentication } from './lib/firebase.js';


export default App = ({ navigation }) => {
    return (
        <NavigationContainer>
           {authentication.currentUser !== null ? <Home_navigation /> : <AuthStacks />}
        </NavigationContainer>)
}