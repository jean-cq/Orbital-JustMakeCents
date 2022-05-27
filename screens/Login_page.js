// JavaScript source code
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';

const Stack = createNativeStackNavigator();
export default Login_page = () => {
    //const { params } = useRoute();
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.action}>
            <TextInput
                placeholder="Your Email"
                    placeholderTextColor="grey"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />

            </View>
            <View style={styles.action}>
                <TextInput
                    placeholder="Your Password"
                    placeholderTextColor="grey"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />

            </View>
            <View style={styles.fixToText}>
                <Flatbutton text='Log In' onPress={() => Alert.alert('Simple Button pressed')} />
            </View>

        </SafeAreaView>
        
        
        
        )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        toppadding: 10,
        backgroundColor: 'gold',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'black',
    },
        action: {
            flexDirection: 'row',
            marginTop: 50,
            borderBottomWidth: 3,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5
    },
    textInput: {
        textAlign: 'left'

    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginVertical: 50,
        
    }

});
