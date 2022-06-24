import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, Modal, ListItem } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from '@react-navigation/native';
import { Progress } from '../node_modules/react-native-progress/Bar';
import Svg, { Circle, Rect } from 'react-native-svg';



export default B_lending = () => {

    const navigation = useNavigation();

    const [items, setItems] = useState([
        { id: '0', status: false, who: 'Alex', category: 'Recreation', amount: '50' },
        { id: '1', status: false, who: 'Alex', category: 'Diet', amount: '260' },
        { id: '2', status: false, who: 'Mary', category: 'Education', amount: '260' },
        { id: '3', status: false, who: 'Jean', category: 'Medical', amount: '40' },
        { id: '4', status: true, who: 'Jake', category: 'Traffic', amount: '30' },
        { id: '5', status: true, who: 'Amy', category: 'Beautify', amount: '20' },
        { id: '6', status: true, who: 'Matsuni', category: 'Others', amount: '20' },
    ]);

    const [ExpenditureData, setExpenditureData] = useState([]);

    const deleteItem = id => {
        setItems(previousItems => {
            return previousItems.filter(item => item.id !== id);
        });
    };
    const status_change = () => {
        setItems(item => item.status = !item.status)
    }

    const loadAllExpenditure = async () => {

        const { Expenditure, error } = await supabase.getAllExpenditure();
        setExpenditureData(Expenditure)
    }
    useEffect(() => {
        loadAllExpenditure();

    }, [])

    return (
        <View>


            <View style={{ background: '#C4C4C4', flexDirection: 'row', padding: 20 }}>
                <Text style={{ flex: 1 }}>Status</Text>

                <Text style={{ flex: 2, textAlign: 'center' }}>Who</Text>

                <Text style={{ flex: 2, textAlign: 'center' }}>Category</Text>
                <Text style={{ flex: 2, textAlign: 'right' }}>Amount</Text>

            </View>
            <View style={{ height: 1, backgroundColor: 'grey' }}>
            </View>
            <FlatList
                showsVerticalScrollIndicator={true}
                data={items}
                keyExtractor={(item) => item.key}
                //ExpenditureData
                renderItem={({ item, index }) => (
                    <View >
                        <View style={{ flexDirection: 'row', padding: 20, backgroundColor: item.status === true ? '#C4C4C4' : 'white' }}>
                            <BouncyCheckbox
                                style={{ marginTop: 16, textAlign: 'center' }}
                                disableText={true}
                                disableBuiltInState
                                isChecked={item.status}
                                onPress={(value) => {
                                    setItems(items.map(itemm =>
                                        itemm.id === item.id
                                            ? { ...item, status: !value }
                                            : itemm))


                                }}

                                style={{ flex: 1 }}
                            />


                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.who}</Text>

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
