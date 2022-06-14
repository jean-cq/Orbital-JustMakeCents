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
import Catebutton from '../components/Catebutton.js';


export default Profile = () => {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    //gonna change to firebase
    const handleLogOut = async () => {
        setLoading('SIGNOUT')
        const { error, session, user } =
            await supabase.supabaseClient.auth.signOut()
        if (error) Alert.alert(error.message)
        else navigation.navigate('Starting_page')
        setLoading('')
    }
    return (
        <SafeAreaView style={{ flexDirection: 'column' }}>
            {/*avatar& username*/}
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Catebutton test='Edit your porfile' onPress={() => Alert.alert("This is date.")} />
                </View>
                <FontAwesome
                    name="user-o"
                    color={colors.text}
                    size={20}
                    style={{ flex: 5, alignItems: 'center' }}
                />
                <Text style={{ flex: 2, textAlign: 'center' }}>Username</Text>
            </View>
            <View style={{ height: 3, backgroundColor: '#EEE9BF', width: '100%' }}>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor:'#F9C70D' }}>
                    <Text
                        style={{ fontSize: 5, color: '#979C9E' }}>
                        5
                    </Text>
                    <Text
                        style={{ fontSize: 5, color: '#979C9E'}}>
                        Days continuing
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#979C9E' }}>
                    <Text
                        style={{ fontSize: 5, color: '#E6DC14' }}>
                        30
                    </Text>
                    <Text
                        style={{ fontSize: 5, color: '#E6DC14' }}>
                        Days recorded
                    </Text>
                </View><View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#E6DC14' }}>
                    <Text
                        style={{ fontSize: 5, color: '#F9C70D' }}>
                        40
                    </Text>
                    <Text
                        style={{ fontSize: 5, color: '#F9C70D' }}>
                        Days joined
                    </Text>
                </View>
                </View>
            <View style={{ height: 3, backgroundColor: '#EEE9BF', width: '100%' }}>
            </View>
            {/*button for sign out*/}
                <View>
                    <TouchableOpacity onPress={() => handleLogOut()}>

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