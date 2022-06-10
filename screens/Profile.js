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
            await supabase.auth.signOut()
        if (error) Alert.alert(error.message)
        else navigation.navigate('Starting_page')
        setLoading('')
    }
    return (
        <SafeAreaView>
          
                <View style={styles.container1}>
                    <View style={styles.edit}>
                        <TouchableOpacity onPress={() => Alert.alert('This is edit profile')}>
                            <View style={styles.button1}>
                                <Text style={styles.buttontext1} > Edit My Profile </Text>
                            </View>
                    </TouchableOpacity>
                    <View style={{ flex: 7, justifyContent:'center' }}>
                    <FontAwesome
                    name={
                        focused
                            ? 'user'
                            : 'user-o'
                    }
                    size={size}
                    color={color}
                        />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text> Username </Text>
                    </View>
                </View>
            </View>
                <View style={{ height: 0.5, backgroundColor: 'light grey'  }}>
                </View>
                <View style={{ flexDirection: 'column', justifyContent:'flex-end' }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-end'
                    }} >

                            <Text> Days Continuing</Text>
                        </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-end'
                    }} >

                            <Text> Days Recorded</Text>
                        </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-end'
                    }} >

                            <Text> Days Joined</Text>
                        </View>
                </View>

                   
              

                <View stlyle={styles.signout}>
                    <TouchableOpacity onPress={() => handleLogOut()}>

                        <View style={styles.button}>
                            <View style={styles.button2}>
                                <Text style={styles.buttontext2} > Sign Out </Text>
                            </View>
                        </View>
                            </TouchableOpacity>
                            
        
                </View>
        </SafeAreaView>
                )}

const styles = StyleSheet.create({
       button1 : {
                borderRadius: 20,
                paddingVertical: 5,
                paddingHorizontal: 10,
                backgroundColor: 'orange',
                marginHorizontal: 50,
                marginVertical: 30
    },
    buttontext1: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center'
    },
    button2: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
        marginHorizontal: 50,
        marginVertical: 30
    },
       buttontext2: {
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
        marginLeft: 200,
        flex: 1

                }

})