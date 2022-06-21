import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, ListItem } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Progress } from '../node_modules/react-native-progress/Bar';
import ExpenditureStacks from '../navigation/ExpenditureStacks.js';
import Svg, { Circle, Rect } from 'react-native-svg';

export default Wallet = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([
        
        { id: '0', Type: 'Cash', Name: 'Cash', DueDate:null, Expenses: '13.50', Income:'20.00',  Balance:'6.50' },
        { id: '1', Type: 'Credit Card', Name: 'Visa', DueDate: '13 May',Expenses: '40.00', Income: '250.50',  Balance: '160.50' },
        ]);
    const [inputValue, setInputValue] = useState('');
    const [ExpenditureData, setExpenditureData] = useState([]);

    const deleteItem = id => {
        setItems(previousItems => {
            return previousItems.filter(item => item.id !== id);
        });
    };
    const status_change = () => {
        setItems(item => item.status = !item.status)
    }

    const loadAllExpenditure = async () => {

        const { Expenditure, error } = await supabase.getAllExpenditure();
        setExpenditureData(Expenditure)
    }
    useEffect(() => {
        loadAllExpenditure();

    }, [])

    return (
        <View style={{flexDirection:'column'}}>
        { /*Budget*/ }
           
            < View style={styles.container} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={{ marginLeft: 50, fontSize: 16, fontWeight: 'bold' }}>Budget</Text>

                    <TouchableOpacity style={{ marginLeft: 70 }} onPress={() => navigation.navigate('Budget')}>

                        <Svg width='300' height='30'>
                            <Rect
                                x="0"
                                y="10"
                                width="225"
                                height="15"
                                fill='#3C3056'
                                strokeWidth="3"

                            />
                            <Rect
                                x="0"
                                y="10"
                                width={0.75 * 225}
                                height="15"
                                fill='yellow'
                                strokeWidth="3"

                            />

                        </Svg>

                </TouchableOpacity>
                </View>
                <View >
                    <Text style={{ textAlign: 'right', marginRight: 40, fontSize: 10 }}>75%</Text>
                </View >
            </View>
            { /*Edit*/}
            
                <TouchableOpacity onPress={() => Alert.alert('This is edit.')}>
                    <View style={styles.editbutton} >
                        <Text>Edit</Text>
                    </View>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor:'#C4C4C4' }}>
            </View >
            
            <View style={{ flexDirection: 'row', padding: 20 }}>
                <Text style={{ marginRight: 35 }}> </Text>
                <Text style={{ flex: 2 }}>Type</Text>

                <Text style={{ flex: 2 }}>Name</Text>

                <Text style={{ flex: 3 }}>Due Date</Text>
                <Text style={{ flex: 3, textAlign: 'right' }}>Expenses</Text>

                <Text style={{ flex: 3, textAlign: 'right' }}>Income</Text>

                <Text style={{ flex: 3, textAlign: 'right' }}>Balance</Text>

            </View>
            <View style={{ height: 1, backgroundColor: 'grey' }}>
            </View>
            <FlatList
                showsVerticalScrollIndicator={true}
                data={items}
                //ExpenditureData
                deleteItem={deleteItem}
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row', padding: 20 }}>
                            <MaterialIcons
                                name='remove-circle'
                                size={20}
                                color='firebrick'
                                onPress={() => deleteItem(item.id)}
                                style={{ marginRight:20}}
                            />
                            <Text style={{ flex: 2 }}>{item.Type}</Text>

                            <Text style={{ flex: 2 }}>{item.Name}</Text>

                            <Text style={{ flex: 3 }}> {item.DueDate} </Text>
                            <Text style={{ flex: 3, textAlign: 'right' }}> {item.Expenses} </Text>

                            <Text style={{ flex: 3, textAlign: 'right' }}> {item.Income} </Text>

                            <Text style={{ flex: 3, textAlign: 'right' }}> {(item.Income > item.Expenses) ? '+' : '-'}{item.Balance} </Text>
                           
                        </View>
                        <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>

                    </View>
                )}
                keyExtractor={
                    (item) => item.id
                }
            />
            <View style={styles.buttonposition}>
            </View>
        </View>




    );


}



const styles = StyleSheet.create({

    container: {
        backgroundColor: '#C4C4C4',
        flexDirection: 'column',
        padding: 20,
        justifyContent:'center'
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
    editbutton: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginLeft: 20,
        marginRight: 325,
        marginVertical: 10,
        
        backgroundColor: 'orange',
       

    },





})