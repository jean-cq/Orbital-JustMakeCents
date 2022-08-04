import { Alert, TextInput, StyleSheet, TouchableOpacity, Modal, Text, View, FlatList } from 'react-native';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Svg, { Rect } from 'react-native-svg';
import { db, authentication } from '../lib/firebase.js';
import { doc, deleteDoc, collection, query, onSnapshot, setDoc } from "firebase/firestore";

export default Wallet = () => {
    const userId = authentication.currentUser.uid;
    const walletRef = query(collection(db, "users/" + userId + "/payment"));
    useEffect(() => {
        const getData = async () => {
            const querySnapshot = onSnapshot(walletRef, (refSnapshot) => {
                const walletList = [];
                refSnapshot.forEach((doc) => {
                    walletList.push(doc.data());
                });  
            setExpenditureData(walletList);
            });
        };
        getData();
    }, []);
    const navigation = useNavigation();
    const [ExpenditureData, setExpenditureData] = useState([]);
    const [show, setShow] = useState(false)
    const [add, setAdd] = useState(false)
    const [name, setName] = useState('');
    const [due, setDue] = useState('');

    const create = () => {
        if (name == "" || due == "") {
            Alert.alert("Invalid input")
        } else {
        setDoc(doc(db, "users/" + userId + "/payment/" + name), {
            Name: name,
            DueDate: due,
            Expenses: 0,
            Income: 0,
            Balance: 0,
        }).then(() => {
            alert('data submitted');
            setAdd(!add)
        }).catch((error) => {
            alert(error)
        })
    }
}

const showBudget = async() => {
    const budgetWkDocRef = doc(db, "users/" + userId + "/budget/" + "week");
    const budgetMnDocRef = doc(db, "users/" + userId + "/budget/" + "month");
    const budgetYrDocRef = doc(db, "users/" + userId + "/budget/" + "year");
    const budgetset = async() => {
        if (WkDoc.exists() === false) {
        await setDoc(budgetWkDocRef, {
            traffic: 0,
            recreation: 0,
            medical: 0,
            beautify: 0,
            diet: 0,
            education: 0,
            necessity:0,
            others:0,
            category: "week",
        }).catch((error) => {
            alert(error)
        })
        await setDoc(budgetMnDocRef, {
            traffic: 0,
            recreation: 0,
            medical: 0,
            beautify: 0,
            diet: 0,
            education: 0,
            necessity:0,
            others:0,
            category: "month",
        }).catch((error) => {
            alert(error)
        })
        await setDoc(budgetYrDocRef, {
            traffic: 0,
            recreation: 0,
            medical: 0,
            beautify: 0,
            diet: 0,
            education: 0,
            necessity:0,
            others:0,
            category: "year",
        }).catch((error) => {
            alert(error)
        })
    }}
    budgetset().then(navigation.navigate('Budget'));
}

    return (
        <View style={{ flexDirection: 'column' }}>
            < View style={styles.container} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={{ marginLeft: 50, fontSize: 16, fontWeight: 'bold' }}>Budget</Text>
                    <TouchableOpacity style={{ marginLeft: 70 }} onPress={showBudget}>
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
                    </TouchableOpacity>
                </View>
                <View >
                    <Text style={{ textAlign: 'right', marginRight: 40, fontSize: 10 }}>75%</Text>
                </View >
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => setShow(!show)}>
                    <View style={styles.editbutton} >
                        <Text>Edit</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                            transparent
                            animationType="fade"
                            visible={add}
                            onRequestClose={() => {
                            setAdd(!add)
                            }}>
                            <View style={styles.contentContainer}>
                                <View style={styles.content}>
                                <TextInput
                            placeholder="New Payment Method"
                            placeholderTextColor="grey"
                            marginHorizontal={10}
                            style={styles.textInput}  
                            value={name}                          
                            onChangeText={(text) => setName(text)} />
                            <TextInput
                            placeholder="DueDate"
                            placeholderTextColor="grey"
                            marginHorizontal={10}
                            style={styles.textInput}
                            value ={due}                    
                            onChangeText={(text) => setDue(text)} />
                                    <TouchableOpacity
                                        style={styles.button1}
                                        onPress={create}>
                                        <Text style={styles.buttontext1}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                {show === true
                    ? <AntDesign
                        name='pluscircle'
                        size={25}
                        color='orange'
                        onPress={() => setAdd(true)}
                        style={{ marginRight: 35, marginTop: 10 }}
                    />
                    : null}
            </View>
            <View style={{ height: 1, backgroundColor: '#C4C4C4' }}>
            </View >
            <View style={{ flexDirection: 'row', padding: 20 }}>
                {show === true
                    ? <Text style={{ flex: 2 }}> </Text>
                    : null}
                <Text style={{ flex: 2 }}>Name</Text>
                <Text style={{ flex: 3 }}>Due Date</Text>
                <Text style={{ flex: 3, textAlign: 'right' }}>Expenses</Text>
                <Text style={{ flex: 3, textAlign: 'right' }}>Income</Text>
                <Text style={{ flex: 3, textAlign: 'right' }}>Balance</Text>
            </View>
            <View style={{ height: 1, backgroundColor: 'grey' }}>
            </View>
            <FlatList
                showsVerticalScrollIndicator={true}
                data={ExpenditureData}
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row', padding: 20 }}>
                            {(show === true)  
                                ? (item.Income - item.Expenses === 0)
                                    ?< MaterialIcons
                                    name='remove-circle'
                                    size={20}
                                    color='firebrick'
                                    onPress={async() => await deleteDoc(doc(db, "users/" + userId + "/payment/" + item.Name))}
                                    style={{ flex: 2 }}
                                />
                                    : <View style={{ flex: 2 }}></View>
                                : null}
                            <Text style={{ flex: 2 }}>{item.Name}</Text>
                            <Text style={{ flex: 3 }}> {item.DueDate} </Text>
                            <Text style={{ flex: 3, textAlign: 'right' }}> {item.Expenses} </Text>
                            <Text style={{ flex: 3, textAlign: 'right' }}> {item.Income} </Text>
                            <Text style={{ flex: 3, textAlign: 'right' }}> {item.Balance} </Text>
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
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDE9FB',
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'center'
    },
    button1: {
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
    editbutton: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 20,
        marginVertical: 10,
        backgroundColor: 'orange',
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
    textInput: {
        height: 40,
        margin: 12,
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 2,
        padding: 10
    }
})