import { TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, Modal } from 'react-native';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import { useEffect, useState } from 'react';
import Svg, { Rect } from 'react-native-svg';
import { db, authentication } from '../lib/firebase.js';
import { doc, getDoc, updateDoc, collection, query, where, onSnapshot } from "firebase/firestore";



export default B_month = () => {
    const [toggle, setToggle] = useState(false)
    const [IncomeData, setIncomeData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [rem, setRem] = useState('');
    const [sumBudget,setSumBudget] = useState(0);
    const [ExpenditureData, setExpenditureData] = useState([]);
    const [exp,setExp] = useState(0);
    const y = new Date().getFullYear();
    const m = new Date().getMonth() + 1;
    const month = () =>{
        if (m < 10){
            return y+ '/0' +m
        }else {
            return y+'/'+m
        }
    }
    const userId = authentication.currentUser.uid;
    const expRef = query(collection(db, "users/" + userId + "/budget"), where("category", "==", "month"));
    const monthRef = query(collection(db, "users/" + userId + "/month"), where("mon", "==",month()));
    
    useEffect(() => {
        setTimeout(() => setToggle((prevToggle) => !prevToggle), 3000);
        const getData = async () => {
            const querySnapshot = onSnapshot(expRef, (refSnapshot) => {
                const expList = [];   
                refSnapshot.forEach((doc) => {
                    expList.push({id: '0', category: "Traffic", amount: doc.data().traffic});
                    expList.push({id: '1', category: "Recreation", amount: doc.data().recreation});
                    expList.push({id: '2', category: "Medical", amount: doc.data().medical});
                    expList.push({id: '3', category: "Beautify", amount: doc.data().beautify});
                    expList.push({id: '4', category: "Diet", amount: doc.data().diet});
                    expList.push({id: '5', category: "Education", amount: doc.data().education});
                    expList.push({id: '6', category: "Necessity", amount: doc.data().necessity});
                    expList.push({id: '7', category: "Others", amount: doc.data().others});
                    expList.push(doc.data().traffic + doc.data().recreation+doc.data().medical + 
                        doc.data().beautify + doc.data().diet + doc.data().education + doc.data().necessity + doc.data().others);
                });
            setExpenditureData(expList);          
            });
        };const getMonthData = async () => {
            const querySnapshot = onSnapshot(monthRef, (refSnapshot) => {
                const incomeList = [];
                refSnapshot.forEach((doc) => {                
                    incomeList.push(doc.data().expenditure);
                });
                
                setIncomeData(incomeList);
            });
        };
        getData();
        getMonthData();
        setExp(IncomeData[0]);
        setSumBudget(ExpenditureData[8]);  
    }, [toggle]);

    const updateBudget = async() => {
        const budDocRef = doc(db, "users/" + userId + "/budget" + "/month")
        const sfDoc = await getDoc(budDocRef)
               await updateDoc(budDocRef , {
                traffic: +ExpenditureData[0].amount,
                    recreation: +ExpenditureData[1].amount,
                    medical: +ExpenditureData[2].amount,
                    beautify: +ExpenditureData[3].amount,
                    diet: +ExpenditureData[4].amount,
                    education: +ExpenditureData[5].amount,
                    necessity:+ExpenditureData[6].amount,
                    others:+ExpenditureData[7].amount,
                    category: "month",
            }).then(() => {
                alert('data submitted');
                setModalVisible(!modalVisible) 
            }).catch((error) => {
                alert(error)
            })}

    return (
        <SafeAreaView >
            <View style={styles.container}>
                <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: 'bold' }}>Budget used : $150</Text>
                <Svg width='500' height='40'>
                    <Rect
                        x="40"
                        y="20"
                        width="300"
                        height="15"
                        fill='#3C3056'
                        strokeWidth="3"

                    />
                    <Rect
                        x="40"
                        y="20"
                        width={(IncomeData[0] < sumBudget && IncomeData[0] > 0) 
                            ? ( IncomeData[0]/ sumBudget) * 300
                            : 300}
                        height="15"
                        fill='yellow'
                        strokeWidth="3"
                    />
                </Svg>
                <Text style={{ textAlign: 'right', marginRight: 20, fontSize: 10 }}>{(sumBudget === 0)
                ? 'please set your budget'
                : IncomeData[0] === undefined
                ? 'no expenses'
                : Math.round((100 * IncomeData[0]/ sumBudget ) * 100) / 100+ '%'
                }</Text>
            </View>

            <View style={{ backgroundColor: '#C4C4C4', padding: 10 }}>
                <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 7 }}>Category Budget</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={true}
                data={ExpenditureData}
                //ExpenditureData
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row', padding: 20 }}>
                            <Text style={{ flex: 2 }}>{item.category}</Text>
                            <TouchableOpacity onPress={() => {
                                setRem(item.id)
                                setModalVisible(true);
                            }} style={{ flex: 1, flexDirection: 'row' }}>
                                {item.amount === null
                                    ? <Text style={{ flex: 2, textAlign: 'right' }}>not set</Text>


                                    : <Text style={{ flex: 1, textAlign: 'right' }}>{item.amount}</Text>}
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    color={'black'}
                                    size={20}
                                    flex={1} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>

                    </View>
                )}
                keyExtractor={
                    (item) => item.id
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Budget</Text>
                        <TextInput
                            placeholder="Amount"
                            placeholderTextColor="grey"
                            marginHorizontal={10}
                            style={styles.textInput}
                            keyboardType='numeric'
                            value={ExpenditureData.amount}
                            onChangeText={(text) => setExpenditureData(ExpenditureData.map(item =>
                                item.id === rem
                                    ? { ...item, amount: text }
                                    : item
                            ))} />
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={updateBudget}
                        >
                            <Text style={styles.buttontext1}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.buttonposition}>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDE9FB',
        flexDirection: 'column',
        padding: 20
    },
    button1: {
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: 'grey',
        marginTop: 35
    },
    buttontext1: {

        color: 'black',
        fontSize: 13,
        textAlign: 'center'
    },
    buttonposition: {
        position: 'absolute',
        justifyContent: 'flex-end',
        marginLeft: 320,
        marginTop: 500
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 50,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textInput: {
        height: 40,
        margin: 12,
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 2,
        padding: 10
    }
})