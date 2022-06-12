// JavaScript source code
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, ListItem, Dimensions } from 'react-native';
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
import SimpleSelectButton from 'react-native-simple-select-button';
import SimpleSelectIcon from '../components/SimpleSelectIcon.js';


export default Add_Expenditure_1 = () => {
    const [choice, setChoice] = useState('');
    const [chosen, setChosen] = useState('');
    const button_list = [
        { label: "Expenditure   ", value: "1" },
        { label: "Income   ", value: "2" },
        { label: "Lendin   ", value: "3" },
        { label: "Borrowing   ", value: "4" },
    ];
    const icon_list = [
        { label: "Diet", value: "1", icon: "cutlery" },
        { label: "Traffic", value: "2", icon:"car" },
        { label: "Recreation", value: "3", icon:"angellist" },
        { label: "Education", value: "4", icon:"book" },
        { label: "Beautify", value: "5", icon:"scissors" },
        { label: "Medical", value: "6", icon: "medkit" },
        { label: "Necessity", value: "7", icon:"plug" },
        { label: "Others", value: "8", icon: "question" },
        { label: "Add", value: "100", icon: "plus" }
    ]

    const ItemDivider = () => {
        return (
            <View style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "grey",
                }}
            />
        );
    }
    return (
       
        <View style={styles.container}>
            <StatusBar style="auto" />
                <View style={{
                marginVertical: 5,
                width: (Dimensions.get('screen').width - 65),
                justifyContent: 'center',
            }}>
                <FlatList  contentInset={{ right: 20, top: 0, left: 0, bottom: 0 }}
                    horizontal={true} 
                    data={button_list}
                    keyExtractor={item => item.value}
                    extraData={choice}
                    renderItem={
                        ({ item }) =>
                            <SimpleSelectButton
                                onPress={() => {
                                    setChoice(item.value);
                                     return Alert.alert('hiii, '+item.label + '.')}}
                                isChecked={choice === item.value}
                                text={item.label}
                                textSize={14}
                                buttonDefaultColor="yellow"
                                buttonSelectedColor="orange"
                                textDefaultColor="grey"
                                textSelectedColor="black"
                            />
                    }
                />
            </View>
            
            <View style={{
                marginTop: 100,
                width: (Dimensions.get('screen').width - 65),
                justifyContent: 'center',
            }}>
                <FlatList
                    horizontal={true}
                    data={icon_list}
                    keyExtractor={item => item.value}
                    extraData={chosen}
                    renderItem={
                        ({ item }) =>
                            <SimpleSelectIcon
                                onPress={() => {
                                    setChosen(item.value);
                                    return Alert.alert('hiii, ' + item.label + '.')
                                }}
                                numColumns={4}
                                isChecked={chosen === item.value}
                                text={item.label}
                                textSize={14}
                                buttonDefaultColor="yellow"
                                buttonSelectedColor="orange"
                                textDefaultColor="#fff"
                                textSelectedColor="#fff"
                                iconName={item.icon}
                                iconColor="#fff"
                                iconSize={14}
                                ItemSeparatorComponent={ItemDivider}
                            />
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 1
    },
});
/*
    return (
        <SafeAreaView style={{ flexDirection : 'column' }}>
            <View style={{ flexDirection: 'row' }}>
                <SimpleSelectButton
                    text="Expenditure"
                    textSize={14}
                    iconName="checkcircleo"
                    iconColor="#fff"
                    iconSize={14}
                    buttonDefaultColor="yellow"
                    buttonSelectedColor="orange"
                    textDefaultColor="#333"
                    textSelectedColor="#fff"
                    isChecked={true}
                    onPress={() => Alert.alert('this is expenditure')}
                    style={{marginVertical: 20}}
                />
              
                <SimpleSelectButton
                    text="Income"
                    textSize={14}
                    iconName="checkcircleo"
                    iconColor="#fff"
                    iconSize={14}
                    buttonDefaultColor="yellow"
                    buttonSelectedColor="orange"
                    textDefaultColor="#333"
                    textSelectedColor="#fff"
                    isChecked={true}
                    onPress={() => Alert.alert('this is income')}
                    style={{ marginVertical: 20 }}
                /><SimpleSelectButton
                    text="Lending"
                    textSize={14}
                    iconName="checkcircleo"
                    iconColor="#fff"
                    iconSize={14}
                    buttonDefaultColor="yellow"
                    buttonSelectedColor="orange"
                    textDefaultColor="#333"
                    textSelectedColor="#fff"
                    isChecked={true}
                    onPress={() => Alert.alert('this is lending')}
                    style={{ marginVertical: 20 }}
                /><SimpleSelectButton
                    text="Borrowing"
                    textSize={14}
                    iconName="checkcircleo"
                    iconColor="#fff"
                    iconSize={14}
                    buttonDefaultColor="yellow"
                    buttonSelectedColor="orange"
                    textDefaultColor="#333"
                    textSelectedColor="#fff"
                    isChecked={true}
                    onPress={() => Alert.alert('this is borrowing')}
                    style={{ marginVertical: 20 }}
                />
            
            </View>
            <View>
                <Text>haha</Text>
            </View>
        </SafeAreaView>
    )
}*/