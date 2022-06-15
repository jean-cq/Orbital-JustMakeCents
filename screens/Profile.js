// JavaScript source codeimport { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, ScrollView} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';
import Fontisto from '../node_modules/@expo/vector-icons/Fontisto.js';
import Tips1 from '../screens/tips1'
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import { useTheme } from '@react-navigation/native';
import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Catebutton from '../components/Catebutton.js';
import PageControl from 'react-native-page-control';


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
   const onScroll = (e) => {
        //拿到x的偏移量
        let x = e.nativeEvent.contentOffset.x
        //用偏移量/宽度得到当前页数
        let currentPage = Math.round(x / screen.width)

        console.log('onScroll  ' + e.nativeEvent.contentOffset.x + '  page ' + currentPage + '  current ' + this.state.currentPage)
        if (this.state.currentPage != currentPage) {
            //改变状态机

            this.setState({
                currentPage: currentPage
            })
        }
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
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={(e) => onScroll(e)}
                >
                    <View style={styles.menuContainer}>
                        <View key={ 1} style={{ backgroundColor: '#C4C4C4', marginTop: 5, flexDirection: 'row', padding: 15, borderRadius: 20, borderColor: 'yellow', borderWidth: 1 }}>

                <View style={{ flexDirection: 'column', flex: 4 }} >
                    <Text style={{
                        justifyContent: 'center', fontSize: 20, fontWeight: 'bold', fontFamily: 'serif'
                    }} > Daliy Saving Tips </Text>



                    <Text style={{ alignSelf: 'center', fontSize: 15, marginVertical: 10 }} > Switch to supermarket-brand products </Text>
                </View>
                <Fontisto
                    name="shopping-bag-1"
                    color={'black'}
                    size={70}
                    style={{ flex: 1 }} />



            </View>
                    </View>
                </ScrollView>
            
            <PageControl
                style={{ left: 0, right: 0, bottom: 10 }}
                numberOfPages={3}
                currentPage={0}
                hidesForSinglePage
                pageIndicatorTintColor='gray'
                currentPageIndicatorTintColor='white'
                indicatorStyle={{ borderRadius: 5 }}
                currentIndicatorStyle={{ borderRadius: 5 }}
                indicatorSize={{ width: 8, height: 8 }}
                
                />
            </View>
            {/*button for badges*/}
            <View style={{marginTop: 5, flexDirection: 'column', padding: 10, borderRadius: 20}}>
                <TouchableOpacity onPress={() => Alert.alert("This is Badge.")}>


                    <View style={{ flexDirection: 'row' }}>
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

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > Date </Text>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1 }}> Incomes: $3000 </Text>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1 }}> Expenses: $250 </Text>

                </View>



            </View>
            {/*button for setting*/}
            <View style={{ backgroundColor: '#F1EFEF', marginTop: 5, borderRadius: 20}}>
                <TouchableOpacity onPress={() => Alert.alert("This is Setting.")}>
                    <Feather
                        name="settings"
                        color={'black'}
                        size={20}
                        style={{ textAlign: 'left'}} />

              
                    <Text style={{
                        textAlign: 'center', fontSize: 20, fontWeight: 'bold', fontFamily: 'serif'
                        }} > Setting </Text>

                    
                </TouchableOpacity>

               
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