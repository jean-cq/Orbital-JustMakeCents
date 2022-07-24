// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, Dimensions, View, TouchableOpacity, Modal } from 'react-native';
import Flatbutton from '../components/Flatbutton.js';
import DefaultImage from '../assets/starting_page.png';
import Login_page from '../screens/Login_page.js';
import Register_page from '../screens/Register_page.js';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ref, set, onValue, getDatabase } from "firebase/database";
import { useEffect, useState } from 'react';
import { db, authentication } from '../lib/firebase.js';
import { doc, getDoc, getDocs, updateDoc, collection, query, where, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import { BarChart, Grid, LineChart, PieChart, XAxis, YAxis } from 'react-native-svg-charts';
import Expenditure from './Expenditure.js';
import DatePicker from 'react-native-modern-datepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import MonthPicker from 'react-native-month-picker';
import Catebutton from '../components/Catebutton.js';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default A_year = () => {
    const [ExpenditureData, setExpenditureData] = useState([]);
    const [NumData, setNumData] = useState([]);
    const [show, setShow] = useState(false);
    const [isOpen, toggleOpen] = useState(false);
    const [month, setMonth] = useState(null);
    const [IncomeData, setIncomeData] = useState([]);
    const [perData, setPerData] = useState([]);
    const [payNumData, setPayNumData] = useState([]);
    const [payCatData, setPayCatData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('Year');
    const [isModalVisible, setisModalVisible] = useState(false);
    const changeModalVisibility = (bool) =>{
        setisModalVisible(bool)
    }
    const setData = (data) => {
        setSelectedYear(data)
    }
    const tenYears = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032"]

    const userId = authentication.currentUser.uid;
    
    const yearRef = query(collection(db, "users/" + userId + "/year"), where("year", "==", selectedYear));
    const payRef = query(collection(db, "uers/" + userId + "/payment"));
    const colorScheme = ["#f83d41","#ff9506","#ff5e01","#fbe7d3","#963f2d","#ed6f00","#fbe7d3","#fd5e53"];
    const categories = ["Traffic", "Recreation", "Medical", "Beautify", "Diet", "Education", "Necessity", "Others"];

    useEffect(() => {
        const getData = async () => {
            const yearRef = query(collection(db, "users/" + userId + "/year"), where("year", "==", selectedYear));
           
            const querySnapshot = onSnapshot(yearRef, (refSnapshot) => {
                const monthList = [];
                const numList = [];
                const incomeList = [];
                const perList = [];
                refSnapshot.forEach((doc) => {
                    monthList.push({id: '0', category: "Traffic", amount: doc.data().traffic});
                    monthList.push({id: '1', category: "Recreation", amount: doc.data().recreation});
                    monthList.push({id: '2', category: "Medical", amount: doc.data().medical});
                    monthList.push({id: '3', category: "Beautify", amount: doc.data().beautify});
                    monthList.push({id: '4', category: "Diet", amount: doc.data().diet});
                    monthList.push({id: '5', category: "Education", amount: doc.data().education});
                    monthList.push({id: '6', category: "Necessity", amount: doc.data().necessity});
                    monthList.push({id: '7', category: "Others", amount: doc.data().others});
                    numList.push(doc.data().traffic);
                    numList.push(doc.data().recreation);
                    numList.push(doc.data().medical);
                    numList.push(doc.data().beautify);
                    numList.push(doc.data().diet);
                    numList.push(doc.data().education);
                    numList.push(doc.data().necessity);
                    numList.push(doc.data().others);
                    incomeList.push({category: "Income", amount: doc.data().income});
                    incomeList.push({category: "Expenditure", amount: doc.data().expenditure});
                    perList.push(parseFloat(doc.data().traffic / doc.data().expenditure * 100).toFixed(2));
                    perList.push(parseFloat(doc.data().recreation / doc.data().expenditure * 100).toFixed(2));
                    perList.push(parseFloat(doc.data().medical / doc.data().expenditure * 100).toFixed(2));
                    perList.push(parseFloat(doc.data().beautify / doc.data().expenditure * 100).toFixed(2));
                    perList.push(parseFloat(doc.data().diet / doc.data().expenditure * 100).toFixed(2));
                    perList.push(parseFloat(doc.data().education / doc.data().expenditure * 100).toFixed(2));
                    perList.push(parseFloat(doc.data().necessity / doc.data().expenditure * 100).toFixed(2));
                    perList.push(parseFloat(doc.data().others / doc.data().expenditure * 100).toFixed(2));
                });
                setExpenditureData(monthList);
                setNumData(numList);
                setIncomeData(incomeList);
                setPerData(perList);
            });
        };
        if(selectedYear !== 'Year'){
        getData();
        console.log(selectedYear);}
    },[])


    const fill = 'rgb(134, 65, 244)'
        const data = NumData
        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data
            .map((value, index) => ({
                value,
                svg: {
                    fill: colorScheme[index],
                    onPress: () => alert(categories[index] + ", " + perData[index] + "%"),
                },
                key: `pie-${index}`,
            }))
            

    return (
        <ScrollView>

<View style={{ margin: 20}}>

<View>
<Catebutton text={selectedYear} onPress={() => changeModalVisibility(true)} />
<Modal
                        transparent={true}
                        animationType = 'fade'
                        visible = {isModalVisible}
                        onRequestClose = {null}
                        >
                            
                            <CardModal
                            changeModalVisibility = {changeModalVisibility}
                            data = {tenYears}
                            setData = {setData}
                            />
                    </Modal>
    
</View>


</View>

        <View style = {{width: WIDTH * 0.9, alignSelf: 'center'}}>
            


            <Text>Line chart for year trends</Text>
            
            
                <LineChart
                style={{ height: 200 }}
                data={data}
                svg={{ stroke: 'orange' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>
            <XAxis
                    style={{ marginVertical: -10 }}
                    data={ExpenditureData}
                    formatLabel={(value, index) => value}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />

            <Text>Bar chart income vs expenditure</Text>
            <YAxis
                    data={IncomeData}
                    contentInset={ {top: 20, bottom: 20} }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                />
            <BarChart style={{ height: 200, marginHorizontal: 20 }} 
            data={IncomeData} 
            svg={{ stroke: 'orange', fill: 'orange' }}
            yAccessor={({ item }) => item.amount}
            xAccessor={({ item }) => item.category}
            contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
            </BarChart>
            <XAxis
                    style={{ marginHorizontal: 10, marginVertical: 5 }}
                    data={IncomeData}
                    formatLabel={(value, index) => IncomeData[index].category}
                    contentInset={{ left: 80, right: 80 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />

            <Text>Bar chart for each category</Text>
            <BarChart style={{ height: 200 }} 
            data={ExpenditureData} 
            svg={{ stroke: '#fd5e53', fill: '#fd5e53' }}
            yAccessor={({ item }) => item.amount}
            xAccessor={({ item }) => item.category}
            contentInset={{ top: 30, bottom: 30 }}>   
                <Grid />
            </BarChart>
            <XAxis
                    style={{ marginHorizontal: 12, marginVertical: -10 }}
                    data={ExpenditureData}
                    formatLabel={(value, index) => ExpenditureData[index].category}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 7, fill: 'black' }}
                />

            <Text>    </Text>
            <Text>Pie chart for each category</Text>
            <PieChart style={{ height: 200 }} data={pieData} />

            
        </View>
        </ScrollView>

        )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    heading: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 10
    },
    chartContainer: {
      height: 200
    }, 
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
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
    content: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
    },input: {
        backgroundColor: 'white',
        paddingVertical: 8,
        
        paddingHorizontal:2,
        borderRadius: 5,
        width: WIDTH * 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center'
    },
    inputText: {
        fontSize: 13,       
        color: 'black'
    },
  });