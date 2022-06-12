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
import SimpleSelectButton from '../node_modules/react-native-simple-select-button/index.js';
import SimpleSelectIcon from '../components/SimpleSelectIcon.js';
import VirtualKeyboard from 'react-native-virtual-keyboard';

export default Add_Expenditure_1 = () => {
    const [choice, setChoice] = useState('');
    const [chosen, setChosen] = useState('');
    const [text, setText] = useState('');
    const [note, setNote] = useState('');

    const button_list = [
        { label: "Expenditure   ", value: "1" },
        { label: "Income   ", value: "2" },
        { label: "Lendin   ", value: "3" },
        { label: "Borrowing   ", value: "4" },
    ];
    const icon_list = [
        { label: "Traffic", value: "1", icon: "car" },
        { label: "Recreation", value: "2", icon: "angellist" },
        { label: "Medical", value: "3", icon: "medkit" },
        { label: "Beautify", value: "4", icon: "scissors" },
        { label: "Diet", value: "5", icon: "cutlery" },
        { label: "Education", value: "6", icon: "book" },
        { label: "Necessity", value: "7", icon: "plug" },
        { label: "Others", value: "8", icon: "question" },
        { label: "Add", value: "999", icon: "plus" }
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

    const changeText = (newText) => {
       setText(newText)
    }

    /*orange: #f96300
    yellow:#f5c900
    Tan: #cdad7a*/
    return (

        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{
                marginVertical: 20,
                width: 400,
                height: 50,
                justifyContent: 'center',
            }}>
                <FlatList
                    scrollEnabled={false}
                    horizontal={true}
                    data={button_list}
                    keyExtractor={item => item.value}
                    extraData={choice}
                    renderItem={
                        ({ item }) =>
                            <SimpleSelectButton
                                onPress={() => {
                                    setChoice(item.value);
                                    return Alert.alert('hiii, ' + item.label + '.')
                                }}
                                isChecked={choice === item.value}
                                text={item.label}
                                textSize={14}
                                buttonDefaultColor="yellow"
                                buttonSelectedColor="#cdad7a"
                                textDefaultColor="grey"
                                textSelectedColor="white"
                            />
                    }
                />
            </View>
            <View style={{ height: 3, backgroundColor: '#EEE9BF', width: '100%' }}>
            </View>

            <View style={{
                marginTop: 1,
                width: (Dimensions.get('screen').width - 65),
                justifyContent: 'center',
            }}>
                <FlatList
                  scrollEnabled={false}
                    data={icon_list}
                    keyExtractor={item => item.value}
                    extraData={chosen}
                    numColumns={3}
                    renderItem={
                        ({ item }) =>
                            <SimpleSelectIcon
                                onPress={() => {
                                    setChosen(item.value);
                                    return Alert.alert('hiii, ' + item.label + '.')
                                }}
                                isChecked={chosen === item.value}
                                text={item.label}
                                textSize={20}
                                buttonDefaultColor={item.value % 2 === 0 ? "#f5c900" : "yellow"}
                                buttonSelectedColor="#cdad7a"
                                textDefaultColor="black"
                                textSelectedColor="white"
                                iconName={item.icon}
                                iconColor="white"
                                iconSize={30}
                                ItemSeparatorComponent={ItemDivider}
                            />
                    }
                />
            </View>
            <View style={styles.keyboardContainer}>
                <View style={{ flex: 1 }}>
                    <Catebutton text='Date' onPress={() => Alert.alert("This is date.")} />
                    <Catebutton text='Card' onPress={() => Alert.alert("This is card.")} />
                </View>
                <View style={{ flex: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder="Note"
                            placeholderTextColor="grey"
                            marginHorizontal={10}
                            style={styles.textInput}
                            value={note}
                            onChangeText={(text) => setNote(text)}                           
                        />
                        <Text style={{ fontSize: 23, textAlign: 'right', marginRight: 70 }}>{'$' + text}</Text>
                    </View>
                <VirtualKeyboard color='black' pressMode='string' onPress={(val) => changeText(val)} decimal={true} />
                </View>
                
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
    keyboardContainer: {
    marginTop: 460,
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#D1CFD7',
            paddingVertical: 20
    },
    textInput: {
        fontSize: 23,
        marginLeft:64
    }
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