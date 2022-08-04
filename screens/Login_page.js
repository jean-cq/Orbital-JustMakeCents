// JavaScript source code
import { Alert, TextInput, StyleSheet, Text, View } from 'react-native';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import { useTheme } from '@react-navigation/native';
// Set up a Login component
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { authentication } from "../lib/firebase.js";
import { signInWithEmailAndPassword, signInWithCredential } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';



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
    
    const [isSignedIn, setIsSignedIn] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const SignInUser = () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then((re)=>{
            setIsSignedIn(true);
            navigation.navigate('Home_navigation');
        })
            .catch((re) => {
                console.log(re);
            Alert.alert("Incorrect email or password");
        })
    }
  
    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home_navigation')
            }
        })
        return unsubscribe
    }, [])

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
                
            <Text style = {styles.forgetpassword}
            onPress={() => navigation.navigate('ForgetPassword')}>
                Forget your password?</Text>
                <View style={styles.icons}>
            </View>
            <View style={styles.fixToText}>
                <Flatbutton text='Log In' onPress={SignInUser} />
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
    },
    forgetpassword:{
        flexDirection: 'row',
        marginVertical:10,
        marginHorizontal:20,
        textDecorationLine:'underline',
        fontSize: 12,
        
       

    }, icons: {
     alignContent: 'flex-end',
     justifyContent:'flex-end',
     paddingLeft:300
     } 

});

