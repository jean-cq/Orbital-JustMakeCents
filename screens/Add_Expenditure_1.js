// JavaScript source code
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, Modal, Text, View, FlatList, ListItem, Dimensions, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Catebutton from '../components/Catebutton.js';
import SimpleSelectButton from '../components/SimpleSelectButton.js';
import SimpleSelectIcon from '../components/SimpleSelectIcon.js';
import VirtualKeyboard from '../components/src/VirtualKeyboard.js';
import { authentication, db } from '../lib/firebase.js';
import { ref, set } from "firebase/database";
import { doc, setDoc, collection, addDoc,onSnapshot, query, getDoc, updateDoc, increment } from "firebase/firestore";
import moment from 'moment';
import DatePicker from 'react-native-modern-datepicker';
import CardModal from '../components/CardModal.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
    const [ExpenditureData, setExpenditureData] = useState([]);



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

    const walletRef = query(collection(db, "users/" + userId + "/payment"));
    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await onSnapshot(walletRef, (refSnapshot) => {
                const walletList = [];
                refSnapshot.forEach((doc) => {
                    walletList.push(doc.data().Name);
                });                
            setExpenditureData(walletList);
            });
        };
        getData();
        console.log(ExpenditureData);
    }, []);
    
    

    const create = async() => {
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
                id: unique_ref.toString(),
                status:choice == "Borrowing" ? false : true,
                category: chosen,
                date: date,
                month: moment(date).format('YYYY/MM'),
                displaydate: moment(date).format("Do MMM"),
                income: choice == "Income" ? true : false,
                bigcat: choice,
                expenditure: (choice === "Expenditure" || "Income") ? true : false,
                method: selectedPayment,
                year: moment(date).format('YYYY'),
            }).then(() => {
                alert('data submitted');
            }).catch((error) => {
                alert(error)
            })
            
            if (selectedPayment != "Card") {
                if (choice == "Expenditure") {
                    updateDoc(doc(db, "users/" + userId + "/payment/" + selectedPayment), {
                        Expenses: increment(num),
                        Balance: increment(-num),
                    }).catch((error) => {
                        alert(error)
                    })
                }
                else {
                    updateDoc(doc(db, "users/" + userId + "/payment/" + selectedPayment), {
                        Income: increment(num),
                        Balance: increment(num),
                    }).catch((error) => {
                        alert(error)
                    })
                }
            }

                
        


        const monthDocRef = doc(db, "users/" + userId + "/month/" + date.slice(0, 4) + date.slice(5, 7));
        const monthDoc = await getDoc(monthDocRef);

        if (choice == "Expenditure" || "Income") {
            if (monthDoc.exists() == false) {
                if (choice == "Expenditure") {
                    await setDoc(monthDocRef, {
                        expenditure: +num,
                        income: 0,
                        traffic: 0,
                        recreation: 0,
                        medical: 0,
                        beautify: 0,
                        diet: 0,
                        education: 0,
                        necessity:0,
                        others:0,
                        mon: date.slice(0, 7),
                    }).catch((error) => {
                        alert(error)
                    })
                    if (chosen == "Traffic") {
                        await updateDoc(monthDocRef, {
                            traffic: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Recreation") {
                        await updateDoc(monthDocRef, {
                            recreation: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Medical") {
                        await updateDoc(monthDocRef, {
                            medical: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Beautify") {
                        await updateDoc(monthDocRef, {
                            beautify: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Diet") {
                        await updateDoc(monthDocRef, {
                            diet: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Education") {
                        await updateDoc(monthDocRef, {
                            education: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Necessity") {
                        await updateDoc(monthDocRef, {
                            necessity: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Others") {
                        await updateDoc(monthDocRef, {
                            others: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                }
                else {
                    await setDoc(monthDocRef, {
                        expenditure: 0,
                        income: +num,
                        income: 0,
                        traffic: 0,
                        recreation: 0,
                        medical: 0,
                        beautify: 0,
                        diet: 0,
                        education: 0,
                        necessity:0,
                        others:0,
                        mon: date.slice(0, 7),
                    }).catch((error) => {
                        alert(error)
                    })
                }
            } 
            else {
                if (choice == "Expenditure") {
                    await updateDoc(monthDocRef, {
                        expenditure: increment(num),
                    }).catch((error) => {
                        alert(error)
                    })
                    if (chosen == "Traffic") {
                        await updateDoc(monthDocRef, {
                            traffic: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Recreation") {
                        await updateDoc(monthDocRef, {
                            recreation: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Medical") {
                        await updateDoc(monthDocRef, {
                            medical: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Beautify") {
                        await updateDoc(monthDocRef, {
                            beautify: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Diet") {
                        await updateDoc(monthDocRef, {
                            diet: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Education") {
                        await updateDoc(monthDocRef, {
                            education: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Necessity") {
                        await updateDoc(monthDocRef, {
                            necessity: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Others") {
                        await updateDoc(monthDocRef, {
                            others: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                }
                else {
                    await updateDoc(monthDocRef, {
                        income: increment(num),
                    }).catch((error) => {
                        alert(error)
                    })
                }
            }
        }

        const yearDocRef = doc(db, "users/" + userId + "/year/" + date.slice(0, 4));
        const yearDoc = await getDoc(yearDocRef);

        if (choice == "Expenditure" || "Income") {
            if (yearDoc.exists() == false) {
                if (choice == "Expenditure") {
                    await setDoc(yearDocRef, {
                        expenditure: +num,
                        income: 0,
                        traffic: 0,
                        recreation: 0,
                        medical: 0,
                        beautify: 0,
                        diet: 0,
                        education: 0,
                        necessity:0,
                        others:0,
                        year: date.slice(0, 4),
                    }).catch((error) => {
                        alert(error)
                    })
                    if (chosen == "Traffic") {
                        await updateDoc(yearDocRef, {
                            traffic: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Recreation") {
                        await updateDoc(yearDocRef, {
                            recreation: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Medical") {
                        await updateDoc(yearDocRef, {
                            medical: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Beautify") {
                        await updateDoc(yearDocRef, {
                            beautify: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Diet") {
                        await updateDoc(yearDocRef, {
                            diet: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Education") {
                        await updateDoc(yearDocRef, {
                            education: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Necessity") {
                        await updateDoc(yearDocRef, {
                            necessity: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Others") {
                        await updateDoc(yearDocRef, {
                            others: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                }
                else {
                    await setDoc(yearDocRef, {
                        expenditure: 0,
                        income: +num,
                        income: 0,
                        traffic: 0,
                        recreation: 0,
                        medical: 0,
                        beautify: 0,
                        diet: 0,
                        education: 0,
                        necessity:0,
                        others:0,
                        year: date.slice(0, 4),
                    }).catch((error) => {
                        alert(error)
                    })
                }
            } 
            else {
                if (choice == "Expenditure") {
                    await updateDoc(yearDocRef, {
                        expenditure: increment(num),
                    }).catch((error) => {
                        alert(error)
                    })
                    if (chosen == "Traffic") {
                        await updateDoc(yearDocRef, {
                            traffic: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Recreation") {
                        await updateDoc(yearDocRef, {
                            recreation: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Medical") {
                        await updateDoc(yearDocRef, {
                            medical: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Beautify") {
                        await updateDoc(yearDocRef, {
                            beautify: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Diet") {
                        await updateDoc(yearDocRef, {
                            diet: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Education") {
                        await updateDoc(yearDocRef, {
                            education: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Necessity") {
                        await updateDoc(yearDocRef, {
                            necessity: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Others") {
                        await updateDoc(yearDocRef, {
                            others: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                }
                else {
                    await updateDoc(yearDocRef, {
                        income: increment(num),
                    }).catch((error) => {
                        alert(error)
                    })
                }
            }
        }

        const entryDate = moment(date).format('YYYY-MM-DD');
        const m = new Date(entryDate).getMonth();
        const y = new Date(entryDate).getFullYear();
        const getDateMonth = (year, month, da) => {
           return new Date(year,month,da).getDate();
        };
        const getDayMonth = (year, month, da) => {
            return new Date(year,month,da).getDay();
         }
       
        const d = new Date(entryDate).getDay();
        const dt = new Date(entryDate).getDate();
        const week = () => {
                const firstdayMonth = getDayMonth(y, m, 1);
                if(firstdayMonth === 0){
                    const w = Math.ceil(dt/7);
                    return 'w' + w;
                }else{
                    const differ =  dt - ((6 - firstdayMonth) + 1) ;
                    const ww = Math.ceil(differ/7);
                    return 'w' + ww;
                }


        };
        const weekDocRef = doc(db, "users/" + userId + "/week/" + date.slice(0, 4) + date.slice(5, 7) + week());
        const weekDoc = await getDoc(weekDocRef);

        if (choice == "Expenditure" || "Income") {
            if (weekDoc.exists() == false) {
                if (choice == "Expenditure") {
                    await setDoc(weekDocRef, {
                        expenditure: +num,
                        income: 0,
                        traffic: 0,
                        recreation: 0,
                        medical: 0,
                        beautify: 0,
                        diet: 0,
                        education: 0,
                        necessity:0,
                        others:0,
                        week: date.slice(0, 7) + '/' + week(),
                    }).catch((error) => {
                        alert(error)
                    })
                    if (chosen == "Traffic") {
                        await updateDoc(weekDocRef, {
                            traffic: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Recreation") {
                        await updateDoc(weekDocRef, {
                            recreation: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Medical") {
                        await updateDoc(weekDocRef, {
                            medical: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Beautify") {
                        await updateDoc(weekDocRef, {
                            beautify: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Diet") {
                        await updateDoc(weekDocRef, {
                            diet: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Education") {
                        await updateDoc(weekDocRef, {
                            education: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Necessity") {
                        await updateDoc(weekDocRef, {
                            necessity: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Others") {
                        await updateDoc(weekDocRef, {
                            others: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                }
                else {
                    await setDoc(weekDocRef, {
                        expenditure: 0,
                        income: +num,
                        income: 0,
                        traffic: 0,
                        recreation: 0,
                        medical: 0,
                        beautify: 0,
                        diet: 0,
                        education: 0,
                        necessity:0,
                        others:0,
                        year: date.slice(0, 4),
                    }).catch((error) => {
                        alert(error)
                    })
                }
            } 
            else {
                if (choice == "Expenditure") {
                    await updateDoc(weekDocRef, {
                        expenditure: increment(num),
                    }).catch((error) => {
                        alert(error)
                    })
                    if (chosen == "Traffic") {
                        await updateDoc(weekDocRef, {
                            traffic: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Recreation") {
                        await updateDoc(weekDocRef, {
                            recreation: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Medical") {
                        await updateDoc(weekDocRef, {
                            medical: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Beautify") {
                        await updateDoc(weekDocRef, {
                            beautify: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Diet") {
                        await updateDoc(weekDocRef, {
                            diet: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Education") {
                        await updateDoc(weekDocRef, {
                            education: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Necessity") {
                        await updateDoc(weekDocRef, {
                            necessity: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                    else if (chosen == "Others") {
                        await updateDoc(weekDocRef, {
                            others: increment(num),
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                }
                else {
                    await updateDoc(weekDocRef, {
                        income: increment(num),
                    }).catch((error) => {
                        alert(error)
                    })
                }
            }
        }

    

    }}

    let NumAftDot = num.split('.')
    

    return (

        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{
                width: WIDTH,
                height: HEIGHT * 0.075,
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
                width: WIDTH * 0.9,
                height: HEIGHT * 0.35,
                alignContent:'center',
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
                                textSize={14}
                                buttonDefaultColor={item.value % 2 === 0 ? "#f5c900" : "yellow"}
                                buttonSelectedColor="#cdad7a"
                                textDefaultColor="black"
                                textSelectedColor="white"
                                iconName={item.icon}
                                iconColor="white"
                                iconSize={20}
                                ItemSeparatorComponent={ItemDivider}
                            />
                    }
                />
            </View>
            
            <View style={styles.keyboardContainer}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                    <Catebutton text={date ? moment(date).format("Do MMM YY") : 'Date'} onPress={() => toggleOpen(true)} />
                        

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
                                        onPress={() =>{ toggleOpen(false); console.log(date)}}>
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
                            data = {ExpenditureData}
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
            
            <View style = {
                {backgroundColor:  '#D1CFD7' , height: HEIGHT *0.5, width:WIDTH}
            }>
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
       
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: '#D1CFD7',
            paddingVertical: 10
    },
    textInput: {
        fontSize: 23,
        marginLeft:64
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