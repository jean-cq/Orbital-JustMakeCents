import { StyleSheet } from 'react-native';
import Login_page from '../screens/Login_page.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Starting_page from '../screens/Starting_page.js';
import Register_page from '../screens/Register_page.js';
import Home_navigation from './Home_navigation.js';
import ForgetPassword from '../screens/ForgetPassword.js';


const Stack = createNativeStackNavigator();


export default AuthStacks = () => {
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
                <Stack.Screen name="Starting_page" component={Starting_page} options={{
                    headerShown:false
                }}
                />
                <Stack.Screen name="Login_page" component={Login_page} options={{
                    title: 'Log In'
                }} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{
                    title: 'Forget Password?'
                }} />
                <Stack.Screen name="Register_page" component={Register_page} options={{
                    title: 'Register'
                }} />
                

            <Stack.Screen options={{headerShown: false}} name="Home_navigation" component={Home_navigation} />
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

