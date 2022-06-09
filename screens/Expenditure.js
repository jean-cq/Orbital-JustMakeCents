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

const Stack = createNativeStackNavigator();

export default Expenditure = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([
        { id: '1', status: false, category: 'Beverage', name: 'Milk' },
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
        <SafeAreaView>
            <View style={styles.container}>
            <TouchableOpacity onPress={() => Alert.alert('this is wallet')}>
                <View style={styles.button1}>
                        <Text style={styles.buttontext} > Wallet </Text>
                </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Text>Budget</Text>
                    <Progress.Bar progress={0.3} width={200} />
                    </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={true}
                data={ExpenditureData}
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 1 }}>{item.status}</Text>

                            <Text style={{ flex: 2 }}>{item.category}</Text>

                            <Text style={{ flex: 2 }}> {item.name} </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}> {item.income ? '+' : '-'}{item.amount} </Text>
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
        </SafeAreaView>
        
        
        
        
        );


}



const styles = StyleSheet.create({

    container: {
        backgroundColor:'grey',
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
        borderRadius: 70,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
        marginHorizontal: 50
    },
    buttontext: {
        color: 'grey',
        fontSize: 20,
        textAlign: 'center'
    },
    buttonposition: {
        position: 'absolute',
        justifyContent: 'flex-end',
        marginLeft: 350,
        marginTop: 500
        
    },
    




})

/*<View>

                            <ListItem item={item} />
                          <TouchableOpacity onPress={() => deleteItem = { deleteItem }} />
                        </View>*/