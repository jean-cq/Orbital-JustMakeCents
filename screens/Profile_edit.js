import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Text, View, TextInput, Modal } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator }from '@react-navigation/native-stack';
import { useState, useEffect, useContext } from 'react';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default Profile_edit = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(null);
    const [isModalVisible, setisModalVisible] = useState(false);

    const changeModalVisibility = (bool) =>{
        setisModalVisible(bool)

    }


return (
<View>
                <TouchableOpacity onPress={() => changeModalVisibility(true)}>
                    <View style={{
                            flexDirection: 'row', margin: WIDTH *0.01, justifyContent: 'center', height: HEIGHT *0.1 }}>
                        <Text style={{
                            textAlign:'left', alignSelf:'center', fontSize: 15, fontFamily: 'serif',flex:5
                        }} > Profile Photo </Text>
                <Ionicons           
                    name="ios-person-circle"
                    color={'black'}
                    size={50}
                    style={{ textAlign:'right',alignSelf:'center', flex:1}}                
                    />
                     
                    

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={30}
                            style={{ textAlign:'right',alignSelf:'center',flex:1}} />

                    </View>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>

                        <TouchableOpacity onPress={() => changeModalVisibility(true)}>
                    <View style={{
                            flexDirection: 'row', margin: WIDTH *0.01, justifyContent: 'center', height: HEIGHT *0.1 }}>
                        <Text style={{
                            textAlign:'left', alignSelf:'center', fontSize: 15, fontFamily: 'serif',flex:5
                        }} > Name </Text>

                        <Text style={{ textAlign:'right',alignSelf:'center', flex:1}}>{username}</Text>
            
                     
                    

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={30}
                            style={{ textAlign:'right',alignSelf:'center',flex:1}} />

                    </View>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>
                <Modal
                transparent={true}
                animationType = 'fade'
                visible = {isModalVisible}
                onRequestClose = {() => changeModalVisibility(false)}>
                    <View style = {{flexDirection: 'column', marginHorizontal: 40, borderBottomWidth: 3, borderBottomColor: 'black'}}>
                <Text style={{ fontSize: 20}}>Your Name : </Text>
                <TextInput
                marginHorizontal={10}
                style={styles.textInput}
                autoCapitalize="none"
                value={username}
                onChangeText={(text) => setUsername(text)}
                
            />
            </View>
            </Modal>

            <TouchableOpacity onPress={() => changeModalVisibility(true)}>
                    <View style={{
                            flexDirection: 'row', margin: WIDTH *0.01, justifyContent: 'center', height: HEIGHT *0.1 }}>
                        <Text style={{
                            textAlign:'left', alignSelf:'center', fontSize: 15, fontFamily: 'serif',flex:5
                        }} > Email </Text>

                        <Text style={{ textAlign:'right',alignSelf:'center', flex:1}}>{email}</Text>
            
                     
                    

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={30}
                            style={{ textAlign:'right',alignSelf:'center',flex:1}} />

                    </View>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>

                        <TouchableOpacity onPress={() => changeModalVisibility(true)}>
                    <View style={{
                            flexDirection: 'row', margin: WIDTH *0.01, justifyContent: 'center', height: HEIGHT *0.1 }}>
                        <Text style={{
                            textAlign:'left', alignSelf:'center', fontSize: 15, fontFamily: 'serif',flex:5
                        }} > Change Password </Text>

                       

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={30}
                            style={{ textAlign:'right',alignSelf:'center',flex:1}} />

                    </View>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: 'grey' }}>
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