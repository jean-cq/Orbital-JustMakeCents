// JavaScript source codeimport { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


export default Profile = () => {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleLogOut = async () => {
        setLoading('SIGNOUT')
        const { error, session, user } =
            await supabase.supabaseClient.auth.signOut()
        if (error) Alert.alert(error.message)
        else navigation.navigate('Starting_page')
        setLoading('')
    }
    return (
        <SafeAreaView>
<<<<<<< Updated upstream

                <View>
                    <TouchableOpacity onPress={() => handleLogOut()}>

                        <View style={styles.button}>
                           
                                <Text style={styles.buttontext} > Sign Out </Text>
                          
                        </View>
                            </TouchableOpacity>
                            
        
                </View>
=======
            <View style={styles.container1}>
                <View style={styles.edit}>
                    <TouchableOpacity onPress={() => Alert.alert('This is edit profile')}>
                        <View style={styles.button1}>
                            <Text style={styles.buttontext} > {text} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text} > Avatar </Text>
            </View>
            <View stlyle={styles.signout}>
            <TouchableOpacity onPress={() => handleLogOut()}>

                <View style={styles.button2}>
                    <Text style={styles.buttontext} > Sign Out </Text>
                </View>
                  

            </TouchableOpacity>
        </View>  
>>>>>>> Stashed changes
        </SafeAreaView>
                )}

const styles = StyleSheet.create({

<<<<<<< Updated upstream
    button: {
=======
    },
    button1: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
        marginHorizontal: 50,
        marginVertical: 30
    },
    button2: {
>>>>>>> Stashed changes
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
        marginHorizontal: 50,
        marginVertical: 30
    },
<<<<<<< Updated upstream
       buttontext: {
                color: 'grey',
                fontSize: 20,
                textAlign: 'center'
=======
    buttontext: {

        color: 'grey',
        fontSize: 20,
        textAlign: 'center'
    },
    signout: {
        marginTop: 500,
        justifyContent:'center'

    },
    container1: {

    },
    edit: {

>>>>>>> Stashed changes
    }
   

})