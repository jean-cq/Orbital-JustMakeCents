// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Flatbutton from '../components/Flatbutton.js';
import DefaultImage from '../assets/starting_page.png';
import Login_page from '../screens/Login_page.js';
import Register_page from '../screens/Register_page.js';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default A_week = () => {

    const navigation = useNavigation();
    const [items, setItems] = useState([
        { id: '0', category: 'recreation', amount: '50' },
        { id: '1', Category: 'recreation', amount: '50' },
        { id: '2', Category: 'recreation', amount: '50' },
        { id: '3', Category: 'recreation', amount: '50' },
        { id: '4', Category: 'recreation', amount: '50' },
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

                <Text style={{ marginLeft: 50, fontSize: 16, fontWeight: 'bold' }}>Budget</Text>


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


                <Text style={{ textAlign: 'right', marginRight: 70, fontSize: 10 }}>75%</Text>
            </View>

            {/*Flatlist*/}


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
        backgroundColor: '#C4C4C4',
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