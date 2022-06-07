import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, ListItem } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Shopping_list_a from './Shopping_list_a'

const Stack = createNativeStackNavigator();

export default Expenditure = () => {

    const [items, setItems] = useState([
        { id: '1', status: false, category: 'Beverage', name: 'Milk' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const deleteItem = id => {
        setItems(previousItems => {
            return previousItems.filter(item => item.id !== id);
        });
    };
    const status_change = () => {
        setItems(item => item.status = !item.status)
    }

  
    return (
        <SafeAreaView>
            
            <TouchableOpacity onPress={() => navigation.navigate('Add_Expenditure')} style={styles.navi}/>

            <FlatList
            
            data={items}
            renderItem={({ item }) => (
                <View>

                    <ListItem item={item} />
                    <TouchableOpacity onPress={() => deleteItem = { deleteItem }} />
                </View>
            )}
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