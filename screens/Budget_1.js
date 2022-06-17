import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, ListItem } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Progress } from '../node_modules/react-native-progress/Bar';
import Svg, { Circle, Rect } from 'react-native-svg';
import BudgetStacks from '../navigation/BudgetStack.js';


export default Budget = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([
        { id: '1', status: false, category: 'Beverage', name: 'Milk', income: false, amount: 5.00, note: null },
        { id: '2', status: false, category: 'Food', name: 'Chocolate', income: false, amount: 5.00, note: 'haha' },
        { id: '3', status: true, category: 'beauty', name: 'lipstick', income: false, amount: 25.00, note: 'lolll' },
        { id: '4', status: true, category: 'others', name: 'scholarship', income: true, amount: 300.00, note: 'qkym' },
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
        <View>
            { /*Budget*/ }
            <View style={styles.container}>           
                
                    <Text style={{ marginLeft: 50, fontSize: 16, fontWeight: 'bold' }}>Budget</Text>

                    
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

                    
                    <Text style={{ textAlign: 'right', marginRight: 70, fontSize: 10 }}>75%</Text>
            </View>

            {/*navigation bar*/}
            
        
            <FlatList
                showsVerticalScrollIndicator={true}
                data={ExpenditureData}
                //ExpenditureData
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row', padding: 20 }}>
                            <Text style={{ flex: 1 }}>{item.status}</Text>

                            <Text style={{ flex: 2 }}>{item.category}</Text>

                            <Text style={{ flex: 2 }}> {item.name} </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}> {item.income ? '+' : '-'}{item.amount} </Text>
                            <Text style={{ flex: 3, textAlign: 'right', marginRight: 10 }}> {item.note} </Text>
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
        padding: 20
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