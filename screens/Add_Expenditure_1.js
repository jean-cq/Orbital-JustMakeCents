// JavaScript source code
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
import Catebutton from '../components/Catebutton.js';
import Cateunbutton from '../components/Catebutton.js';

export default Add_Expenditure_1 = () => {
    [pressstatus1, SetPressstatus1] = useState(false)
    const press = (text) => {
        SetPressstatus1 = !pressstatus1;
        return Alert.alert(text)

    }
    return (
        <SafeAreaView style={{ flexDirection : 'column' }}>
            <View style={{ flexDirection: 'row' }}>
                {pressstatus1 ? <Catebutton text='Expenditure' onPress={press('this is expenditure')} />
                    : <Cateunbutton text='Expenditure' onPress={press('this is spam')} />}
           
            <Catebutton text='Income' onPress={() => Alert.alert('this is income')} />
            <Catebutton text='Lending' onPress={() => Alert.alert('this is lending')} />
                <Catebutton text='Borrowing' onPress={() => Alert.alert('this is borrowing')} />
            </View>
            <View>
                <Text>haha</Text>
            </View>
        </SafeAreaView>
    )
}