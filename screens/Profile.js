// JavaScript source codeimport { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';
import Fontisto from '../node_modules/@expo/vector-icons/Fontisto.js';
import Tips1 from '../screens/tips1'
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Catebutton from '../components/Catebutton.js';
import PagerView from 'react-native-pager-view';



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
            {/*avatar*/}
            <View style={{ flexDirection: 'column', marginTop: 10, marginRight: 10 }}>
            <Catebutton text= "Edit your profile" onPress={() => Alert.alert("This is Edit your profile.")} />
                <Ionicons
                    name="ios-person-circle"
                    color={'black'}
                    size={150}
                    style={{ alignSelf: 'center', marginLeft: 25 }}/>
                <Text style={{ fontSize: 30, textAlign:'center' }}>Ashley Wang</Text>
            </View>

            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#F9C70D', borderTopLeftRadius: 20 }}>
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
                </View><View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#F9C70D', borderTopRightRadius: 20 }}>
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
            <View style={{ height: 3, backgroundColor: '#EEE9BF', width: '100%' }}>
            </View>

            { /*Bill*/}
            <View style={{ backgroundColor: '#F9C70D', marginTop: 5, flexDirection: 'column', padding: 10, borderRadius: 20, borderColor:'yellow',borderWidth: 1}}>
                <TouchableOpacity onPress={() => Alert.alert("This is Bill.")}>


                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            justifyContent: 'center', fontSize: 20, marginRight: 315, fontWeight: 'bold', fontFamily:'serif' }} > Bill </Text>
                        
                    <MaterialIcons
                    name="keyboard-arrow-right"
                    color={'black'}
                    size={30}
                    style={{ alignSelf: 'flex-end' }} />
                       
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > Date </Text>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1 }}> Incomes: $3000 </Text>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1}}> Expenses: $250 </Text>

                </View>

                
                
            </View>
            { /*tips*/}
            <PagerView style={{ backgroundColor: '#C4C4C4', marginTop: 5, flexDirection: 'row', padding: 15, borderRadius: 20, borderColor: 'yellow', borderWidth: 1 }} initialPage={0}>

                <View key="1">
                    <Text style={{
                        justifyContent: 'center', fontSize: 20, fontWeight: 'bold', fontFamily: 'serif'
                    }} > Daliy Saving Tips </Text>

                    <Text style={{ alignSelf: 'center', fontSize: 15, marginVertical: 10 }} > Switch to supermarket-brand products </Text>
                </View>
                
                <View key="2">
                    <Text>Second page</Text>
                </View>
            </PagerView>
            
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