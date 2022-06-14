// JavaScript source codeimport { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';
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
            <View style={{ flexDirection: 'column', marginTop: 10, marginRight: 10 }}>
            <Catebutton onPress={() => Alert.alert("This is date.")} />
                <Ionicons
                    name="ios-person-circle"
                    color={'black'}
                    size={150}
                    style={{ alignSelf: 'center', marginLeft: 25 }}
                />
                <Text style={{ fontSize: 30, textAlign:'center' }}>Ashley Wang</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#F9C70D', borderTopLeftRadius: 10 }}>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: '#979C9E', textAlign: 'center', paddingTop: 5 }}>
                        30
                    </Text>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: '#979C9E', textAlign: 'center', paddingBottom: 5 }}>
                        Days recorded
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#cdad7a' }}>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: 'white', textAlign: 'center', paddingTop: 5   }}>
                        5
                    </Text>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: 'white', textAlign: 'center', paddingBottom: 5  }}>
                        Days continuing
                    </Text>
                </View><View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#F9C70D', borderTopRightRadius: 10 }}>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: '#979C9E', textAlign: 'center', paddingTop: 5 }}>
                        40
                    </Text>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: '#979C9E', textAlign: 'center', paddingBottom: 5 }}>
                        Days joined
                    </Text>
                </View>
                </View>
            <View style={{ height: 1, backgroundColor: '#EEE9BF', width: '100%' }}>
            </View>
            {/*button for sign out*/}
            <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={() => handleLogOut()}>

                        <View style={styles.button}>
                           
                                <Text style={styles.buttontext} > Sign Out </Text>
                          
                        </View>
                            </TouchableOpacity>
                            
        
                </View>
        </SafeAreaView>)}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 5,
        backgroundColor: 'yellow',
        marginHorizontal: 100
    },
    buttontext: {
        textAlign: 'center'
    }
    },)

            /*avatar& username
               <View style={{ flexDirection: 'column', flex: 50 }}>
                 
                       <Catebutton test='Edit your porfile' onPress={() => Alert.alert("This is date.")} />
                  
                   <FontAwesome
                       name="user-o"
                       color={'black'}
                       size={20}
                       style={{ flex: 5, alignItems: 'center' }}
                   />
                   <Text style={{ flex: 2, textAlign: 'center' }}>Username</Text>
               </View>
               */