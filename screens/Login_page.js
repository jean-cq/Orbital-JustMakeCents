// JavaScript source code
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
// Set up a Login component
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';



export default Login_page = () => {
    const navigation = useNavigation();
    const [data, setData] =useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry : !data.secureTextEntry
        });
    }

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
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
  
    const handleLogin = async (type, email, password) => {
        setLoading(type)
        const { error, user } =
          type === 'LOGIN'
                ? await supabase.auth.signIn({ email, password })
             
            : await supabase.auth.signUp({ email, password })
        if (!error && !user) Alert.alert('Check your email for the login link!')
        if (error) Alert.alert(error.message)
        else navigation.navigate('Books')

        setLoading('')
      }
    /* const handleTwitterLogin = async (type) => {
        setLoading(type)
        const { user, session, error } =
            await supabase.auth.signIn({
                provider: 'twitter'
            }, {
                redirectTo: 'https://xlmxiwbuyvnpmipnzzfy.supabase.co/auth/v1/authorize?provider=twitter'
            })
       

        setLoading('')
    }*/
/*    const handleGoogleLogin = async (type) => {
        setLoading(type)
        const { user, session, error } =
            type === 'LOGIN'
                ? await supabase.auth.signIn({
                    provider: 'google'
                }, {
                    redirectTo: 'https://xlmxiwbuyvnpmipnzzfy.supabase.co/auth/v1/authorize?provider=google'})
                : await supabase.auth.signUp({
                    provider: 'google'
                }, {
                    redirectTo: 'https://xlmxiwbuyvnpmipnzzfy.supabase.co/auth/v1/authorize?provider=google'})
        setLoading('')
    }
*/

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text_footer, {
                marginTop: 35, marginLeft: 10, marginBottom: 10
            }]}>Username</Text>
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
                    marginHorizontal={ 10 }
                    secureTextEntry={true}
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                </View>
            
            <View style={styles.fixToText}>
                <Flatbutton text='Log In' onPress={() => handleLogin('LOGIN', email, password)} />
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
            marginHorizontal: 10,
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
        
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    }/*, icons: {
        marginTop:20,
        marginLeft:300
    }
     icons: {
        flexDirection: 'row',
        alignItems:'flex-end'

        <View style={styles.icons}>
            <TouchableOpacity onPress={() => handleGoogleLogin('LOGIN')}>
            <AntDesign
                name="google"
                color={colors.text}
                size={20}

                />
            </TouchableOpacity>
            </View>
    } */

});
/*   {data.secureTextEntry ?
               <Feather
                   name="eye-off"
                   color="grey"
                   size={20}
               />
               :
               <Feather
                   name="eye"
                   color="grey"
                   size={20}
               />
           }
           */
/*
const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
});

        const { colors } = useTheme();

        const { signIn } = React.useContext(AuthContext);

        const textInputChange = (val) => {
            if (val.trim().length >= 4) {
                setData({
                    ...data,
                    username: val,
                    check_textInputChange: true,
                    isValidUser: true
                });
            } else {
                setData({
                    ...data,
                    username: val,
                    check_textInputChange: false,
                    isValidUser: false
                });
            }
        }

        const handlePasswordChange = (val) => {
            if (val.trim().length >= 8) {
                setData({
                    ...data,
                    password: val,
                    isValidPassword: true
                });
            } else {
                setData({
                    ...data,
                    password: val,
                    isValidPassword: false
                });
            }
        }

        const updateSecureTextEntry = () => {
            setData({
                ...data,
                secureTextEntry: !data.secureTextEntry
            });
        }

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

        const loginHandle = (userName, password) => {

            const foundUser = Users.filter(item => {
                return userName == item.username && password == item.password;
            });

            if (data.username.length == 0 || data.password.length == 0) {
                Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                    { text: 'Okay' }
                ]);
                return;
            }

            if (foundUser.length == 0) {
                Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                    { text: 'Okay' }
                ]);
                return;
            }
            signIn(foundUser);
          
        }//const {params} = useRoute();
            </View>
            <View style={styles.icons}>
                <TouchableOpacity onPress={() => handleTwitterLogin('LOGIN')}>
                    <AntDesign
                        name="twitter"
                        color={colors.text}
                        size={20}

                    />
                </TouchableOpacity>
            </View>*/
