import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, Modal, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, is, ListItem, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { React, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Progress } from '../node_modules/react-native-progress/Bar';
import Svg, { Circle, Rect } from 'react-native-svg';
import DatePicker from 'react-native-modern-datepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { db, authentication } from '../lib/firebase.js';
import { ActivityIndicator } from 'react-native';
import {database} from 'firebase/database';
import { FirebaseError } from 'firebase/app';
import { ref, set, onValue, getDatabase } from "firebase/database";
import { doc, getDoc, getDocs, updateDoc, collection, query, where, onSnapshot, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import moment from 'moment';
import MonthPicker from 'react-native-month-picker';


const Stack = createNativeStackNavigator();


export default Expenditure = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([
        { id: '0', status: false, category: 'Beverage', name: 'Milk', income: false, amount: 5.00, note: null },
        { id: '1', status: false, category: 'Food', name: 'Chocolate', income: false, amount: 5.00, note: 'haha' },
        { id: '2', status: true, category: 'beauty', name: 'lipstick', income: false, amount: 25.00, note: 'lolll' },
        { id: '3', status: true, category: 'others', name: 'scholarship', income: true, amount: 300.00, note : 'qkym'},
    ]);
    const [inputValue, setInputValue] = useState('');
    const [ExpenditureData, setExpenditureData] = useState([]);

    const [show, setShow] = useState(false);
    const [isOpen, toggleOpen] = useState(false);
    const [month, setMonth] = useState(null);
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users

    

   

    const deleteItem = id => {
        setItems(previousItems => {
            return previousItems.filter(item => item.id !== id);
        });
    };
    const status_change = () => {
        setItems(item => item.status = !item.status)
    }

 /*   const loadAllExpenditure = async () => {

        const { Expenditure, error } = await supabase.getAllExpenditure();
        setExpenditureData(Expenditure)
    }
    useEffect(() => {
        loadAllExpenditure();

    },[]); */

    const userId = authentication.currentUser.uid;

    const datas = getDatabase();
    
    const expRef = query(collection(db, "users/" + userId + "/expenditure"), where("bigcat", "in", ["Expenditure", "Income"]), 
    where("month", "==", moment(month).format('YYYY/MM')));

    
    const display = () => {
        const getData = async() => {
            const querySnapshot = onSnapshot(expRef, (refSnapshot) => {
                const expList = [];
                refSnapshot.forEach((doc) => {
                    expList.push(doc.data());
                });
                expList.push({});
                expList.push({});
                expList.push({});
                expList.push({});
            setExpenditureData(expList);
            })
        };
        getData();
        toggleOpen(false);
        
    };

    const showBudget = async() => {
        const budgetWkDocRef = doc(db, "users/" + userId + "/budget/" + "week");
        const budgetMnDocRef = doc(db, "users/" + userId + "/budget/" + "month");
        const budgetYrDocRef = doc(db, "users/" + userId + "/budget/" + "year");
        const WkDoc = await getDoc(budgetWkDocRef);
        const MnDoc = await getDoc(budgetMnDocRef);
        const YrDoc = await getDoc(budgetYrDocRef);
        
        const budgetset = async() => {
            if (WkDoc.exists() === false) {
            await setDoc(budgetWkDocRef, {
                traffic: 0,
                recreation: 0,
                medical: 0,
                beautify: 0,
                diet: 0,
                education: 0,
                necessity:0,
                others:0,
            }).catch((error) => {
                alert(error)
            })
            await setDoc(budgetMnDocRef, {
                traffic: 0,
                recreation: 0,
                medical: 0,
                beautify: 0,
                diet: 0,
                education: 0,
                necessity:0,
                others:0,
            }).catch((error) => {
                alert(error)
            })
            await setDoc(budgetYrDocRef, {
                traffic: 0,
                recreation: 0,
                medical: 0,
                beautify: 0,
                diet: 0,
                education: 0,
                necessity:0,
                others:0,
            }).catch((error) => {
                alert(error)
            })
        }}
        budgetset().then(navigation.navigate('Budget'));
    }
    

    return (
        <SafeAreaView >
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate ('Wallet')}>
                <View style={styles.button1}>
                        <Text style={styles.buttontext1} > Wallet </Text>
                </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginLeft: 50, fontSize: 16, fontWeight:'bold' }}>Budget</Text>

                    <TouchableOpacity style={{ marginLeft: 50}} onPress={showBudget}>

                        <Svg width='300' height= '30'>
                            <Rect
                                x="0"
                                y="10"
                                width="225"
                                height="15"
                                fill= '#3C3056'
                                strokeWidth="3"
                                
                            />
                            <Rect
                                x="0"
                                y="10"
                                width={0.75 * 225}
                                height="15"
                                fill ='yellow'
                                strokeWidth="3"
                                
                            />
                           
                        </Svg>

                    </TouchableOpacity>
                    <Text style={{ textAlign: 'right', marginRight: 70,fontSize: 10 }}>75%</Text>
                    </View>
                    
            </View>
            { /* date*/}
            <View style={{ margin: 20}}>

                <View>
                    <TouchableOpacity onPress={() => toggleOpen(true)} style={styles.input}>
                        <Text style={styles.inputText}>
                            {month ? moment(month).format('YYYY/MM') : 'Month'}
                        </Text>
                    </TouchableOpacity>

                    <Modal
                        transparent
                        animationType="fade"
                        visible={isOpen}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={styles.contentContainer}>
                            <View style={styles.content}>
                                <MonthPicker
                                    selectedDate={month || new Date().getMonth}
                                    onMonthChange={setMonth}
                                />
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={display}>
                                    <Text>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                
            </View>
            <View style={{ height: 1, backgroundColor:'black' }}>
            </View>
            <View style={{ flexDirection: 'row', padding: 20 }}>
                <Text style={{ flex: 1.5 }}>Status</Text>
                <Text style={{ flex: 2, textAlign: 'center'}}>Date</Text>
                <Text style={{ flex: 2, textAlign: 'center'}}>Category</Text>

                <Text style={{ flex: 2, textAlign: 'right' }}>Amount</Text>
                <Text style={{ flex: 3, textAlign: 'right'}}>Note</Text>
            </View>
            <View style={{ height: 1, backgroundColor: 'grey' }}>    
            </View>
            <FlatList
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                data={ ExpenditureData}
                keyExtractor={(item)=>item.key}
                //ExpenditureData
                renderItem={({ item }) => (
                    <View>
                        <View style={{ flexDirection: 'row', padding: 20}}>
                            <BouncyCheckbox
                                style={{ flex: 1.5 }}
                                disableText={true}
                                disableBuiltInState
                                isChecked={item.status}
                                onPress={async() => {
                            
                                    const statusref = doc(db, "users/" + userId + "/expenditure/" + item.id);    
                                    const matches = await getDoc(statusref);                            
                                     await updateDoc(statusref, {
                                                status: !item.status
                                              })


                                }}

                            />
                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.displaydate}</Text>
                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.category}</Text>
                            <Text style={{ flex: 2, textAlign: 'right' }}> {item.income ? '+' : '-'}{item.amount} </Text>
                            <Text style={{ flex: 3, textAlign: 'right'}}> {item.note} </Text>
                        </View>
                        <View style={{ height: 1, backgroundColor:'grey' }}> 
                        </View>
                    </View>
                )}
                
      />
                 <View style={styles.buttonposition}>
                    
            </View>   
        </SafeAreaView>
        
        
        
        
        );


}



const styles = StyleSheet.create({

    container: {
        backgroundColor:'#EDE9FB',
        flexDirection: 'row',
        padding: 20,
        
    }, 
    input: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderWidth: 0.5,
        borderRadius: 5,
        width: '32%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
    },
    confirmButton: {
        borderWidth: 0.5,
        padding: 15,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button1: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
      
    },

    buttontext1: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center'
    },
    buttonposition: {
        position: 'absolute',
        justifyContent: 'flex-end',
        marginLeft: 320,
        marginTop: 500
        
    },
    




})

/*<View>

                            <ListItem item={item} />
                          <TouchableOpacity onPress={() => deleteItem = { deleteItem }} />
                        </View>*/