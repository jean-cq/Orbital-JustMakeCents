import { Image, StyleSheet, Dimensions, TouchableOpacity, Text, View, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import UserPermissions from '../lib/UserPermissions.js';
import * as ImagePicker from 'expo-image-picker';
import { getDoc, runTransaction, doc, setDoc, updateDoc, query, collection, onSnapshot } from 'firebase/firestore';
import { db, authentication } from '../lib/firebase.js';
import { getAuth, updatePassword } from "firebase/auth";
import JMCICON from '../assets/JMC_Icon.png';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Iconjmc = Image.resolveAssetSource(JMCICON).uri;
export default Profile_edit = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(null);
    const [isModalNameVisible, setModalNameVisible] = useState(false);
    const [isModalPasswordVisible, setModalPasswordVisible] = useState(false);
    const [avatar, setAvatar] = useState(Iconjmc);

    /*useEffect(() => {
        console.log(avatar);
        }, [avatar])
    */
    const auth = getAuth();

    const user = auth.currentUser;

    const handlePasswordUpdate = () =>{
    updatePassword(user, password).then(() => {
        alert('Password is successfully updated!');
        changeModalPasswordVisibility(false);
  // Update successful.
    }).catch((error) => {
        alert(error)
  // An error ocurred
  // ...
});}

    const userId = authentication.currentUser.uid;

    const changeModalNameVisibility = (bool) =>{
        setModalNameVisible(bool)

    }
    const changeModalPasswordVisibility = (bool) =>{
        setModalPasswordVisible(bool)

    }
    const handlePickerAvatar = async() => {
        UserPermissions.getCameraPermission();

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[4, 3]
        });

        if (!result.cancelled){
            console.log(result.uri);
            
            setAvatar(result.uri);// action on update of movies
           
            createAvatar();
            
        }

    }
    const create = async() => {
        const sfDocRef = doc(db, "users/" + userId + "/profile" + '/userinfo' );
        const sfDoc = await getDoc(sfDocRef)
        
            
            if (sfDoc.exists() === false) {
                await setDoc(sfDocRef, {
                    name: username,
                    picture: avatar,
                
                }).then(() => {
                    alert('data submitted');
                    changeModalNameVisibility(false);
                    
                }).catch((error) => {
                    alert(error)
                })}
            
        
            else{
           await updateDoc(sfDocRef, {
                name: username                            
            }).then(() => {
                alert('data submitted');
                changeModalNameVisibility(false);
                
            }).catch((error) => {
                alert(error)
            })}
          
  

    }

    
    const createAvatar = async() => {
        
        
        const sfDocRef = doc(db, "users/" + userId + "/profile" + '/userinfo' );
        const sfDoc = await getDoc(sfDocRef)
        
            
            if (sfDoc.exists() === false) {
                setDoc(sfDocRef, {
                    name: username,
                    picture: avatar,
                
                }).then(() => {
                    alert('data submitted');
                    changeModalNameVisibility(false);
                    
                }).catch((error) => {
                    alert(error)
                })}
            
        
            else{
           updateDoc(sfDocRef, {                
                picture: avatar
            }).then(() => {
                alert('data submitted');
                changeModalNameVisibility(false);
                
            }).catch((error) => {
                alert(error)
            })}
          
  

    }
   
    
    



return (
<View>
                {/*<TouchableOpacity onPress={handlePickerAvatar}>
                    <View style={{
                            flexDirection: 'row', margin: WIDTH *0.01, justifyContent: 'center', height: HEIGHT *0.1 }}>
                        <Text style={{
                            textAlign:'left', alignSelf:'center', fontSize: 15, fontFamily: 'serif',flex:5
                        }} > Profile Photo </Text>
                        
                     
                    

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={30}
                            style={{ textAlign:'right',alignSelf:'center',flex:1}} />

                    </View>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>
                    */}
                        <TouchableOpacity onPress={() => changeModalNameVisibility(true)}>
                    <View style={{
                            flexDirection: 'row', margin: WIDTH *0.01, justifyContent: 'center', height: HEIGHT *0.1 }}>
                        <Text style={{
                            textAlign:'left', alignSelf:'center', fontSize: 15, fontFamily: 'serif',flex:5
                        }} > Name </Text>

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
                visible = {isModalNameVisible}
                onRequestClose = {() => changeModalNameVisibility(false)}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Your Name</Text>
                        
                        <TextInput
                            
                            marginHorizontal={10}
                            style={styles.textInput}
                            value={username}
                            onChangeText={(text) => setUsername(text)} />
                            
                            <View style={{ height: 2,width: WIDTH -160, backgroundColor: '#C4C4C4' }}>
                            </View>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={create}
                        >
                            <Text style={styles.buttontext1}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            
                <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>

                        <TouchableOpacity onPress={() => changeModalPasswordVisibility(true)}>
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
                        <Modal
                transparent={true}
                animationType = 'fade'
                visible = {isModalPasswordVisible}
                onRequestClose = {() => changeModalPasswordVisibility(false)}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>New Password</Text>
                        <TextInput
                            
                            marginHorizontal={10}
                            style={styles.textInput}
                            value={password}
                            onChangeText={(text) => setPassword(text)} />
                            <View style={{ height: 2,width: WIDTH -160, backgroundColor: '#C4C4C4' }}>
                            </View>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={handlePasswordUpdate}
                        >
                            <Text style={styles.buttontext1}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    button1: {
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: 'grey',
        marginTop: 35
    },

    buttontext1: {

        color: 'black',
        fontSize: 13,
        textAlign: 'center'
    },centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 120,
        backgroundColor: "white",
        width:WIDTH - 120,
        borderRadius: 20,
        paddingVertical:20,     
        paddingHorizontal:20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold'



    },
    textInput: {
        alignSelf:'flex-start',
        margin: 5
    
    } 

});
/*
const createAvatar = async() => {
        const sfDocRef = doc(db, "users/" + userId + "/profile" + '/userinfo' );
        const sfDoc = await getDoc(sfDocRef)
        
            
            if (sfDoc.exists() === false) {
                setDoc(sfDocRef, {
                    name: username,
                    picture: avatar,
                
                }).then(() => {
                    alert('data submitted');
                    changeModalNameVisibility(false);
                    
                }).catch((error) => {
                    alert(error)
                })}
            
        
            else{
           updateDoc(sfDocRef, {
                name: username,
                picture: avatar
            }).then(() => {
                alert('data submitted');
                changeModalNameVisibility(false);
                
            }).catch((error) => {
                alert(error)
            })}
       
    }

*/