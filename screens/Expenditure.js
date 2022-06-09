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

const Stack = createNativeStackNavigator();

export default Expenditure = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([
        { id: '1', status: false, category: 'Beverage', name: 'Milk', income: false, amount: 5.00, note: null },
        { id: '2', status: false, category: 'Food', name: 'Chocolate', income: false, amount: 5.00, note: 'haha' },
        { id: '3', status: true, category: 'beauty', name: 'lipstick', income: false, amount: 25.00, note: 'lolll' },
        { id: '4', status: true, category: 'others', name: 'scholarship', income: true, amount: 300.00, note : 'qkym'},
    ]);
    const [inputValue, setInputValue] = useState('');
    const [ExpenditureData, setExpenditureData] = useState('');

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
        loadAllExpenditure()

    })
  
    return (
        <View>
            <View style={styles.container}>
            <TouchableOpacity onPress={() => Alert.alert('this is wallet')}>
                <View style={styles.button1}>
                        <Text style={styles.buttontext1} > Wallet </Text>
                </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{marginLeft: 25, fontSize: 16}}>Budget</Text>
                    
                    </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={true}
                data={ items }
                //ExpenditureData
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 1 }}>{item.status}</Text>

                            <Text style={{ flex: 2 }}>{item.category}</Text>

                            <Text style={{ flex: 2 }}> {item.name} </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}> {item.income ? '+' : '-'}{item.amount} </Text>
                            <Text> style={{ flex: 2 }}> {item.note} </Text>
                        </View>
                        <View style={{ height: 1, backgroundColor:'grey' }}> </View>
                      
                    </View>
                )}
                keyExtractor={
                    (item) => item.id
                }
      />
                 <View style={styles.buttonposition}>
            <TouchableOpacity onPress={() => navigation.navigate('Add_Expenditure_1')}>
                <View style={styles.button2}>
                    <Text style={styles.buttontext} > + </Text>
                </View>
                </TouchableOpacity>
            </View>   
        </View>
        
        
        
        
        );


}



const styles = StyleSheet.create({

    container: {
        backgroundColor:'#C4C4C4',
        flexDirection: 'row',
         padding: 20
    },
    button1: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
      
    },
    button2: {
        borderRadius: 100,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'yellow',
    },
    buttontext: {
        color: 'grey',
        fontSize: 30,
        textAlign: 'center'
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
        marginTop: 640
        
    },
    




})

/*<View>

                            <ListItem item={item} />
                          <TouchableOpacity onPress={() => deleteItem = { deleteItem }} />
                        </View>*/