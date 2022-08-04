import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { db, authentication } from '../lib/firebase.js';
import { doc, getDoc, updateDoc, collection, query, where, onSnapshot } from "firebase/firestore";

export default B_lending = () => {

    const [LenData, setLenData] = useState([]);
    const loadAllExpenditure = async () => {
        const { Expenditure, error } = await supabase.getAllExpenditure();
        setExpenditureData(Expenditure)
    }
    useEffect(() => {
        loadAllExpenditure();
    }, [])
    const userId = authentication.currentUser.uid;
    const lendRef = query(collection(db, "users/" + userId + "/expenditure"), where("bigcat", "==", "Lending"));

    useEffect(() => {
        const getData = async () => {
            onSnapshot(lendRef, (refSnapshot) => {
                const lenList = [];
                refSnapshot.forEach((doc) => {
                    lenList.push(doc.data());
                });
                lenList.push({});
                lenList.push({});
                lenList.push({});
                lenList.push({});
                setLenData(lenList);
            });
        };
        getData();
    }, []);
    
    return (
        <View >
            <View style={{ background: '#C4C4C4', flexDirection: 'row', padding: 15}}>
                <Text style={{ flex: 1 }}>Status</Text>
                <Text style={{ flex: 2, textAlign: 'center' }}>Who</Text>
                <Text style={{ flex: 2, textAlign: 'center' }}>Category</Text>
                <Text style={{ flex: 2, textAlign: 'right' }}>Amount</Text>    
            </View>          
            <FlatList
                showsVerticalScrollIndicator={true}
                data={LenData}
                keyExtractor={(item) => item.key}
                //ExpenditureData
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row', padding: 25, backgroundColor: item.status === true ? '#C4C4C4' : 'white' }}>                 
                        <BouncyCheckbox
                                tyle={{ textAlign: 'center', flex: 1 }}
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
                            <Text style={{ flex: 3, textAlign: 'center' }}>{item.note}</Text>                        
                            <Text style={{ flex: 3, textAlign: 'center' }}> {item.category} </Text>
                            <Text style={{ flex: 2, textAlign: 'right' }}>{item.amount} </Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>        
                    </View>          
                )}
            />
        </View >
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
