import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, ListItem, ScrollView } from 'react-native';
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
import { doc, getDoc, getDocs, collection, query, where, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore";


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
    const [date, setDate] = useState('Select');
    const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users

    

    const showPicker = useCallback((value) => setShow(value), []);
    const onValueChange = useCallback(
        (newDate) => {
            const selectedDate = newDate || date;

            showPicker(false);
            setDate(selectedDate);
        },
        [date, showPicker],
    );

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
    
    const expRef = query(collection(db, "expenditure/" + userId + "/add_expenditure"));

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await onSnapshot(expRef, (refSnapshot) => {
                const expList = [];
                refSnapshot.forEach((doc) => {
                    expList.push(doc.data());
                });
                expList.push({})
                expList.push({})
                expList.push({})
                expList.push({})
            setExpenditureData(expList);
            });
        };
        getData();
    }, []);


    
    

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate ('Wallet')}>
                <View style={styles.button1}>
                        <Text style={styles.buttontext1} > Wallet </Text>
                </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginLeft: 50, fontSize: 16, fontWeight:'bold' }}>Budget</Text>

                    <TouchableOpacity style={{ marginLeft: 50}} onPress={() => navigation.navigate('Budget')}>

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
                
                <TouchableOpacity style={styles.picker} onPress={() => showPicker(true)}>
                    <Text style={{ color: 'C4C4C4', fontWeight:'bold' }}>Date: {date}</Text>
            </TouchableOpacity>
                {show && (
                    < DatePicker
                      
                    mode="monthYear"
                    selectorStartingYear={2000}
                    onMonthYearChange={onValueChange}
                />

                )}
            </View>
            <View style={{ height: 1, backgroundColor:'black' }}>
            </View>
            <View style={{ flexDirection: 'row', padding: 20 }}>
                <Text style={{ flex: 1.5 }}>Status</Text>
                <Text style={{ flex: 2, textAlign: 'center'}}>Date</Text>
                <Text style={{ flex: 2, textAlign: 'center'}}>Category</Text>
                <Text style={{ flex: 2, textAlign: 'center'}}>Method</Text>

                <Text style={{ flex: 2, textAlign: 'right' }}>Amount</Text>
                <Text style={{ flex: 3, textAlign: 'right'}}>Note</Text>
            </View>
            <View style={{ height: 1, backgroundColor: 'grey' }}>    
            </View>
            <FlatList
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                data={ ExpenditureData }
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
                                onPress={(value) => {
                                    setItems(items.map(itemm =>
                                        itemm.id === item.id
                                            ? { ...item, status: !value }
                                            : itemm))
                                }}

                            />
                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.date}</Text>
                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.category}</Text>
                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.card}</Text>
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
        </View>
        
        
        
        
        );


}



const styles = StyleSheet.create({

    container: {
        backgroundColor:'#EDE9FB',
        flexDirection: 'row',
        padding: 20,
        
    },
    button1: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
      
    },
    picker: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderColor: '#C4C4C4',
        borderWidth: 2,
        justifyContent: 'flex-start'

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