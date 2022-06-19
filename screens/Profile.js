// JavaScript source codeimport { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, ScrollView} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
import MaterialCommunityIcons from '../node_modules/@expo/vector-icons/MaterialCommunityIcons.js';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import Tips1 from '../screens/tips1'
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import { useTheme } from '@react-navigation/native';
import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Catebutton from '../components/Catebutton.js';
import PageControl from 'react-native-page-control';
import PagerView from 'react-native-pager-view';
import { authentication } from "../lib/firebase.js";
import { signOut } from "firebase/auth";


export default Profile = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState([
        { key: 0, imagename: 'shopping-bag-1', tip: 'Switch to supermarket-brand products' },
        { key: 1, imagename: 'podcast', tip: 'Cancel automatic subscriptions and memberships.' },
        { key: 2, imagename: 'wind', tip:'Reduce energy costs' }
    ]);
    const [current, setCurrent] = useState(0)
    const navigation = useNavigation();
    const [isSignedIn, setIsSignedIn] = useState(false);


    const SignOutUser = () => {
        signOut(authentication)
        .then((re)=>{
            setIsSignedIn(false);
            navigation.navigate("Starting_page")
        })
        .catch((re)=>{
            console.log(re)
        })
    }
    const viewPagerSelectCurrent = (tag) => {
        setCurrent(+tag.nativeEvent.position);
    }

    return (
        <SafeAreaView style={{ flexDirection: 'column' }}>
            <ScrollView>
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
                <PagerView initialPage={0}
                    orientation={'horizontal'} style={{ backgroundColor: '#C4C4C4', marginTop: 6, padding: 57, flexDirection: 'column', borderRadius: 50 }} onPageSelected={viewPagerSelectCurrent}>
                   

                        <View key = '0'>
                 <Tips1 text={page[0].tip} imagename={page[0].imagename} key={page[0].key} />

                        
                    </View>
                    <View key='1'>
                        <Tips1 text={page[1].tip} imagename={page[1].imagename} key={page[1].key} />


                    </View>
                    <View key='2'>
                        <Tips1 text={page[2].tip} imagename={page[2].imagename} key={page[2].key} />


                    </View>

                </PagerView>

                
                <PageControl
                    style={{ left: 0, right: 0, bottom: 15 }}
                    numberOfPages={3}
                    currentPage={current}
                    hidesForSinglePage
                    pageIndicatorTintColor='gray'
                    currentPageIndicatorTintColor='white'
                    indicatorStyle={{ borderRadius: 5 }}
                    currentIndicatorStyle={{ borderRadius: 5 }}
                    indicatorSize={{ width: 8, height: 8 }}

                />

            {/*button for badges*/}
            <View style={{marginTop: 10, flexDirection: 'column', padding: 10, borderRadius: 20}}>
                <TouchableOpacity onPress={() => Alert.alert("This is Badge.")}>


                        <View style={{
                            flexDirection: 'row', backgroundColor: '#F1EFEF' }}>
                        <Text style={{
                            justifyContent: 'center', fontSize: 20, marginRight: 290, fontWeight: 'bold', fontFamily: 'serif'
                        }} > Badge </Text>

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={30}
                            style={{ alignSelf: 'flex-end' }} />

                    </View>
                </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop:20 }}>
                        <View style={{ flexDirection: 'column',flex: 1 }} >
                        <FontAwesome
                            name="certificate"
                            color={'black'}
                            size={30}
                            style={{ alignSelf: 'center' }}
                        />
                        
                            <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > 5-day challenge </Text>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }} >
                            <MaterialCommunityIcons
                                name="check-decagram"
                                color={'black'}
                                size={30}
                                style={{ alignSelf: 'center' }}
                            />

                            <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > 30-day record </Text>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }} >
                            <MaterialCommunityIcons
                                name="food"
                                color={'black'}
                                size={30}
                                style={{ alignSelf: 'center' }}
                            />

                            <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > Dining Master </Text>
                        </View>
                        
                </View>



            </View>
            {/*button for setting*/}
             
                <TouchableOpacity style={{
                    backgroundColor: '#C4C4C4', marginTop: 5, padding: 13, borderRadius: 20, flexDiection: 'row', justifyContent: 'space-between'
                }} onPress={() => Alert.alert("This is Setting.")}>
                    <Text style={{
                        textAlign: 'left', padding: 10, position: 'absolute', paddingTop: 13
                    }} >
                        <Ionicons
                        name="settings"
                        color={'black'}
                            size={25}
                           /></Text>

              
                    <Text style={{
                        textAlign: 'center', fontSize: 20
                        }} > Setting </Text>

                    
                </TouchableOpacity>

                {/*button for FAQ*/}

                <TouchableOpacity style={{
                    backgroundColor: '#C4C4C4', marginTop: 5, padding: 13, borderRadius: 20, flexDiection: 'row', justifyContent: 'space-between'
                }} onPress={() => Alert.alert("This is FAQ.")}>
                    <Text style={{
                        textAlign: 'left', padding: 10, position: 'absolute', paddingTop: 13
                    }} >
                        <MaterialCommunityIcons
                            name="message-question"
                            color={'black'}
                            size={25}
                        /></Text>


                    <Text style={{
                        textAlign: 'center', fontSize: 20
                    }} > FAQ </Text>


                </TouchableOpacity>
                
           
            {/*button for sign out*/}
            <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={SignOutUser}>

                        <View style={styles.button}>
                           
                                <Text style={styles.buttontext} > Sign Out </Text>
                          
                        </View>
                            </TouchableOpacity>
                            
        
            </View>
        </ScrollView>
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
        textAlign: 'center',
        fontWeight: 'bold'
    }
    })

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