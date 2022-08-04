import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile.js';
import Profile_edit from '../screens/Profile_edit.js';
import Contact_us from '../screens/Contact_us.js';

const Stack = createNativeStackNavigator();


export default ProfileStacks = () => {
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
                <Stack.Screen name="Profile" component={Profile} options={{
                title: "Profile",
               
                }}
            />
            
                <Stack.Screen name="Profile_edit" component={Profile_edit} options={{
                title: "My Profile"
                
            }}
            />

                <Stack.Screen name="Contact_us" component={Contact_us} options={{
                title: "Contact us"
                
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

