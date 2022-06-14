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
import { auth } from '../lib/firebase.js';


export default Profile = () => {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            navigation.replace("Starting_page")
        })
        .catch(error => alert(error.message))
    }
    

    return (
        <SafeAreaView>

                <View>
                    <TouchableOpacity onPress={handleSignOut}>

                        <View style={styles.button}>
                           
                                <Text style={styles.buttontext} > Sign Out </Text>
                          
                        </View>
                            </TouchableOpacity>
                            
        
                </View>
        </SafeAreaView>)}

const styles = StyleSheet.create({
    button: {
        
    },
    buttontext:{
        
    }
    },)