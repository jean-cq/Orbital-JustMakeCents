import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View, TextInput } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator }from '@react-navigation/native-stack';
import { useState, useEffect, useContext } from 'react';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';

export default Profile_edit = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


return (
<View>
                
                <Ionicons           
                    name="ios-person-circle"
                    color={'black'}
                    size={150}
                    style={{ alignSelf: 'center', marginLeft: 25 }}
                    onPress={() => Alert.alert('Edit your Profile Photo')}
                    />
                    <View style = {{flexDirection: 'row', marginHorizontal: 40,borderBottomWidth: 3, borderBottomColor: 'black'}}>
                <Text style={{ fontSize: 20}}>Your Name : </Text>
                <TextInput
                placeholder='hii'
                marginHorizontal={10}
                style={styles.textInput}
                autoCapitalize="none"
                value={username}
                onChangeText={(text) => setUsername(text)}
                
            />
            </View>
</View>
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
     
        
        

       /* <View style={styles.icons}>
            <TouchableOpacity onPress={() => handleGoogleLogin('LOGIN')}>
            <AntDesign
                name="google"
                color={colors.text}
                size={20}

                />
            </TouchableOpacity>
            </View>*/
    } 

});