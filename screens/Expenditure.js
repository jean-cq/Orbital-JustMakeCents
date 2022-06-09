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
            
            <TouchableOpacity onPress={() => navigation.navigate('Add_Expenditure')} style={styles.navi}/>

            <FlatList
                showsVerticalScrollIndicator={true}
                data={ExpenditureData}
                renderItem={({ item }) => (
                    <SafeAreaView>
                        <View>
                            <Text> {item.name} </Text>
                        </View>
                        <View>

                            <ListItem item={item} />
                            <TouchableOpacity onPress={() => deleteItem = { deleteItem }} />
                        </View>
                    </SafeAreaView>
                )}
                keyExtractor={
                    (item) => item.id
                }
      />
                    
        </SafeAreaView>
        
        
        
        
        );


}



const styles = StyleSheet.create({
    navi: {
        borderRadius: 30,
        color: yellow
        
    }




})