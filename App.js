import { StatusBar } from 'expo-status-bar';
import {Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Flatbutton from './components/Flatbutton.js';
import DefaultImage from './assets/starting_page.png';

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const Separator = () => (
  <View style={styles.separator} />
);

export default App = () => {
    return (
        <NavigationContainer>
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: DEFAULT_IMAGE }}
                    style={styles.image} />
            </View>
            <Separator />
            <View style={styles.fixToText}>
                <Flatbutton text='Log In' onPress={() => Alert.alert('Simple Button pressed')} />
                <Flatbutton text='Register' onPress={() => Alert.alert('Simple Button pressed')} color = 'maroon' />
                </View>
                <StatusBar style ='auto'/>
            </SafeAreaView>
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
});

