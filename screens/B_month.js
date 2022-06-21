    import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
    import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, ListItem } from 'react-native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import Flatbutton from '../components/Flatbutton.js';
    //import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
    import Feather from '../node_modules/@expo/vector-icons/Feather.js';
    import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
    import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
    import { useTheme } from '@react-navigation/native';
    import { useEffect, useState } from 'react';
    import { supabase } from '../lib/supabase';
    import { Input } from 'react-native-elements';
    import { useNavigation } from '@react-navigation/native';
    import { Progress } from '../node_modules/react-native-progress/Bar';
    import Svg, { Circle, Rect } from 'react-native-svg';
    import BudgetStacks from '../navigation/BudgetStack.js';


    export default B_month= () => {
        const navigation = useNavigation();
        const [items, setItems] = useState([
            { id: '0', category: 'Recreation', amount: '50' },
            { id: '1', category: 'Diet', amount: '260' },
            { id: '2', category: 'Education', amount: '260' },
            { id: '3', category: 'Medical', amount: '40' },
            { id: '4', category: 'Traffic', amount: '30' },
            { id: '5', category: 'Beautify', amount: null },
            { id: '6', category: 'Others', amount: null }
        ]);
        const [inputValue, setInputValue] = useState('');
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
                            width={0.75 * 300}
                            height="15"
                            fill='yellow'
                            strokeWidth="3"

                        />

                    </Svg>


                    <Text style={{ textAlign: 'right', marginRight: 20, fontSize: 10 }}>75%</Text>
                </View>
                
                {/*Flatlist*/}
                <View style={{ backgroundColor: '#C4C4C4', padding: 10 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 7 }}>Category Budget</Text>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={items}
                    //ExpenditureData
                    renderItem={({ item }) => (
                        <View >
                            <View style={{ flexDirection: 'row', padding: 20 }}>
                                <Text style={{ flex: 1 }}>{item.status}</Text>

                                <Text style={{ flex: 2 }}>{item.category}</Text>

                                <Text style={{ flex: 2 }}> {item.name} </Text>
                                <Text style={{ flex: 1, textAlign: 'right' }}> {item.income ? '+' : '-'}{item.amount} </Text>
                                <Text style={{ flex: 3, textAlign: 'right', marginRight: 10 }}> {item.note} </Text>
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





    })