// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Flatbutton from '../components/Flatbutton.js';
import DefaultImage from '../assets/starting_page.png';
import Login_page from '../screens/Login_page.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
//import Navigator from './Navigation/HomeStack.js'

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

const Separator = () => (
    <View style={styles.separator} />
);

export default Starting_page = () => {
    const navigation = useNavigation();
    return (
        //<NavigationContainer>
            <SafeAreaView style={styles.container}>
                <View>
                    <Image source={{ uri: DEFAULT_IMAGE }}
                        style={styles.image} />

                </View>
                <Separator />
                

                    <View style={styles.fixToText}>
                        <Flatbutton text='Log In' onPress={() => navigation.navigate('Login_page')} />
                        <Flatbutton text='Register' onPress={() => Alert.alert('Simple Button pressed')} />
                    </View>
                    <StatusBar style='auto' />
                 
            </SafeAreaView>
       // </NavigationContainer> 
        // <Stack.Navigator>
        // <Stack.Screen name="Login_page" component={Login_page} />
               // </Stack.Navigator>
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
        height:700,
        justifyContent: "flex-start"
    }, fixToText: {
        flexDirection: 'row',
        justifyContent: "space-around"
    }, separator: {
        marginVertical: 8,
        orderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
});

