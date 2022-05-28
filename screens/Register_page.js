// JavaScript source code
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import {
    Alert, TouchableOpacity, TextInput, Button, Image, StyleSheet, SafeAreaView, Text, View
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { supabase } from '../lib/supabase'

const Stack = createNativeStackNavigator();
export default Register_page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const { colors } = useTheme();
    //const { params } = useRoute();

    const handleLogin = async (type, email, password) => {
        setLoading(type)
        const { error, user } =
          type === 'LOGIN'
            ? await supabase.auth.signIn({ email, password })
            : await supabase.auth.signUp({ email, password })
        if (!error && !user) Alert.alert('Check your email for the login link!')
        if (error) Alert.alert(error.message)
        setLoading('')
      }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text_footer, {
                marginTop: 35, marginLeft: 10, marginBottom: 10
            }]}>Email</Text>
            <View style={styles.action}>
                
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                <TextInput
                    placeholder="Your Email"
                    placeholderTextColor="grey"
                    marginHorizontal={10}
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />

            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35, marginLeft: 10, marginBottom: 10
            }]}>Password</Text>
           
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color={colors.text}
                    size={20}

                />
                <TextInput
                    placeholder="Your Password"
                    placeholderTextColor="grey"
                    style={styles.textInput}
                    marginHorizontal={10}
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                    onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />

            </View>
           
            <Text style={[styles.text_footer, {
                marginTop: 35, marginLeft: 10, marginBottom: 10
            }]}>Confirmation</Text>
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color={colors.text}
                    size={20}

                />
                <TextInput
                    placeholder="Confirm Your Password"
                    placeholderTextColor="grey"
                    marginHorizontal={10}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                    onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />

            </View>
            <View style={styles.fixToText}>
                <Flatbutton text='Register' onPress={() => handleLogin('SIGNUP', email, password)} />
            </View>
           
        </SafeAreaView>



    )

}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            toppadding: 10,
        backgroundColor: 'gold',
        alignItems: 'stretch',

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
        alignConent: 'stretch',
        marginHorizontal: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        textAlign: 'left',
        fontSize: 15

    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginVertical: 50,
    },
        text_footer: {
            color: '#05375a',
            fontSize: 18
    }

});