// JavaScript source code
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Text, View, FlatList, ListItem, Dimensions } from 'react-native';
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
import SimpleSelectButton from '../components/SimpleSelectButton.js';
import SimpleSelectIcon from '../components/SimpleSelectIcon.js';
import VirtualKeyboard from '../components/src/VirtualKeyboard.js';
import { authentication, db } from '../lib/firebase.js';
import { ref, set } from "firebase/database";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import moment from 'moment';
import DatePicker from 'react-native-modern-datepicker';
import CardModal from '../components/CardModal.js';


export default Add_Expenditure_1 = () => {
    const [choice, setChoice] = useState('');
    const [chosen, setChosen] = useState('');
    const [num, setNum] = useState('');
    const [note, setNote] = useState('');
    const [isOpen, toggleOpen] = useState(false);
    const [date, setDate] = useState(null);
    const [displaydate, 
        Displaydate] = useState(null);
    const [isModalVisible, setisModalVisible] = useState(false);
    const [card, setCard] = useState( [
        'cash', 'visa','master'
]);
    const [selectedPayment, setSelectedPayment] = useState('Card');

    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;


    const button_list = [
        { label: "Expenditure", value: "1" },
        { label: "Income", value: "2" },
        { label: "Lending", value: "3" },
        { label: "Borrowing", value: "4" },
    ];
    const icon_list = [
        { label: "Traffic", value: "1", icon: "car" },
        { label: "Recreation", value: "2", icon: "angellist" },
        { label: "Medical", value: "3", icon: "medkit" },
        { label: "Beautify", value: "4", icon: "scissors" },
        { label: "Diet", value: "5", icon: "cutlery" },
        { label: "Education", value: "6", icon: "book" },
        { label: "Necessity", value: "7", icon: "plug" },
        { label: "Others", value: "8", icon: "question" }
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

    const changeNum = (newNum) => {
        setNum(newNum);
    }

    const changeModalVisibility = (bool) =>{
        setisModalVisible(bool)

    }
    
    const setData = (data) => {
        setSelectedPayment(data)
    }

    /*orange: #f96300
    yellow:#f5c900
    Tan: #cdad7a*/

    const userId = authentication.currentUser.uid;

    const create = () => {
        if ((num[0] ===  '0' && num[1] !== '.') || 
        (NumAftDot[1] && (NumAftDot[1].length > 2 || 
            NumAftDot.length > 2))) {
                Alert.alert('Invalid amount keyed in.')
            }
        else if ((note == "") || (num == "")) {
            Alert.alert('Note or amount cannot be empty.')
        }
        else if ((choice == "") || (chosen == "")) {
            Alert.alert("Categories cannot be empty.")
        }
        else if (date == null) {
            Alert.alert("Date cannot be empty.")
        }
        else {
            const unique_ref = new Date().valueOf();
            setDoc(doc(db, "users/" + userId + "/expenditure/" + unique_ref), {
                note: note,
                amount: +num,
                id: "2",
                status:choice == "Borrowing   " ? false : true,
                category: chosen,
                date: date,
                displaydate: moment(date).format("Do MMM"),
                income: choice == "Income   " ? true : false,
                bigcat: choice,
                expenditure: (choice === "Expenditure   " || "Income   ") ? true : false,
            }).then(() => {
                alert('data submitted');
            }).catch((error) => {
                alert(error)
            })
    }}

    let NumAftDot = num.split('.')
    

    return (
        

        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{
                marginVertical: 20,
                width: WIDTH * 0.9,
                height: HEIGHT * 0.1,
                alignItems:'center',
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
                                    setChoice(item.label);
                                }}
                                isChecked={choice === item.label}
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
                width: (WIDTH *0.9 ),
                height: HEIGHT * 0.5,

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
                                    setChosen(item.label);
                                }}
                                isChecked={chosen === item.label}
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
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                        <TouchableOpacity onPress={() => toggleOpen(true)} style={styles.input}>
                            <Text style={styles.inputText}>
                                {date ? moment(date).format("Do MMM YY") : '  Date'}
                            </Text>
                        </TouchableOpacity>

                        <Modal
                            transparent
                            animationType="fade"
                            visible={isOpen}
                            onRequestClose={() => {
                            null
                            }}>
                            <View style={styles.contentContainer}>
                                <View style={styles.content}>

                                    <DatePicker

                                        mode="calendar"
                                        onSelectedChange={setDate}

                                    />

                                    <TouchableOpacity
                                        style={styles.confirmButton}
                                        onPress={() => toggleOpen(false)}>
                                        <Text>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Catebutton text={selectedPayment} onPress={() => changeModalVisibility(true)} />
                    <Modal
                        transparent={true}
                        animationType = 'fade'
                        visible = {isModalVisible}
                        onRequestClose = {() => changeModalVisibility(false)}
                        >
                            <CardModal
                            changeModalVisibility = {changeModalVisibility}
                            data = {card}
                            setData = {setData}
                            />
                    </Modal>
                    <Catebutton text='Enter' onPress={create} />
                </View>
                <View style={{ flex: 4 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder="Note"
                            placeholderTextColor="grey"
                            marginHorizontal={10}
                            style={styles.textInput}
                            value={note}
                            onChangeText={(text) => setNote(text)}                           
                        />
                        <Text style={{ fontSize: 23, textAlign: 'right', marginRight: 70 }}>{'$' + num}</Text>
                    </View>
                <VirtualKeyboard color='black' pressMode='string' onPress={(val) => changeNum(val)} decimal={true} />
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
    },
    input: {
        backgroundColor: 'orange',
        paddingVertical: 5,
        paddingHorizontal: 8,

        borderRadius: 10,
        marginLeft: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 13,

        textAlign: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
    },
    confirmButton: {
        borderWidth: 0.5,
        padding: 15,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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