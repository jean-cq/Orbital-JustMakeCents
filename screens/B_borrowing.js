import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { db, authentication } from '../lib/firebase.js';
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";

export default B_borrowing = () => {

    const [BorrowingData, setBorrowingData] = useState([]);
    const userId = authentication.currentUser.uid;
    const boRef = query(collection(db, "users/" + userId + "/expenditure"), where("bigcat", "==", "Borrowing"));

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = onSnapshot(boRef, (refSnapshot) => {
                const boList = [];
                refSnapshot.forEach((doc) => {
                    boList.push(doc.data());
                });
                boList.push({});
                boList.push({});
                boList.push({});
                boList.push({});
                setBorrowingData(boList);
            });
        };
        getData();
    }, []);

    return (
        <View >
            <View style={{ background: '#C4C4C4', flexDirection: 'row', padding: 20 }}>
                <Text style={{ flex: 1 }}>Status</Text>
                <Text style={{ flex: 2, textAlign: 'center' }}>Who</Text>
                <Text style={{ flex: 2, textAlign: 'center' }}>Category</Text>
                <Text style={{ flex: 2, textAlign: 'right' }}>Amount</Text>
            </View>
            <FlatList
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                data={BorrowingData}
                keyExtractor={(item) => item.key}
                //ExpenditureData
                renderItem={({ item, index }) => (
                    <View >
                        <View style={{ flexDirection: 'row', padding: 20, backgroundColor: item.status === true ? '#C4C4C4' : 'white' }}>
                        <BouncyCheckbox
                                style={{ textAlign: 'center', flex: 1 }}
                                disableText={true}
                                disableBuiltInState
                                isChecked={item.status}
                                onPress={async() => {
                                    const statusref = doc(db, "users/" + userId + "/expenditure/" + item.id);    
                                    const matches = await getDoc(statusref);                            
                                     await updateDoc(statusref, {
                                                status: !item.status
                                              })
                                }}
                            />
                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.note}</Text>                        
                            <Text style={{ flex: 2, textAlign: 'center' }}> {item.category} </Text>
                            <Text style={{ flex: 2, textAlign: 'right' }}>{item.amount} </Text>

                        </View>
                        <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>

                    </View>
                )}
            />
        </View>
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
