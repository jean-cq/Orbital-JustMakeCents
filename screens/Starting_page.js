// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Dimensions, Text, View } from 'react-native';
import Flatbutton from '../components/Flatbutton.js';
import DefaultImage from '../assets/starting_page.png';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
//import Navigator from './Navigation/HomeStack.js'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

const Separator = () => (
    <View style={styles.separator} />
);

export default Starting_page = () => {
    const navigation = useNavigation();
    return (

            <View style={styles.container}>
                <View>
                    <Image source={{ uri: DEFAULT_IMAGE }}
                        style={styles.image} />

                </View>
                <Separator />
                

                    <View style={styles.fixToText}>
                        <Flatbutton text='Log In' onPress={() => navigation.navigate('Login_page')} />
                <Flatbutton text='Register' onPress={() => navigation.navigate('Register_page')} />
                    </View>
                    <StatusBar style='auto' />
                 
            </View>

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
        width: WIDTH,
        height:HEIGHT ,
        justifyContent: "flex-start"
    }, fixToText: {
        height:HEIGHT * 0.1,
        marginTop: HEIGHT * 0.8,
        position:'absolute',
        flexDirection: 'row',
        textAlign:'center',
        justifyContent: "center"
    }, separator: {
        marginVertical: 8,
        orderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
});

