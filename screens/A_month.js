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
import { VictoryPie } from 'victory-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default A_month = () => {
    const [ExpenditureData, setExpenditureData] = useState([]);
    const [NumData, setNumData] = useState([]);
    const [show, setShow] = useState(false);
    const [isOpen, toggleOpen] = useState(false);
    const [month, setMonth] = useState(null);
    const [IncomeData, setIncomeData] = useState([]);
    const [perData, setPerData] = useState([]);

    const userId = authentication.currentUser.uid;
    
    const monthRef = query(collection(db, "users/" + userId + "/month"), where("mon", "==", moment(month).format('YYYY/MM')));
    const colorScheme = ["#f83d41","#ff9506","#ff5e01","#fbe7d3","#963f2d","#ed6f00","#fbe7d3","#fd5e53"];
    const categories = ["Traffic", "Recreation", "Medical", "Beautify", "Diet", "Education", "Necessity", "Others"];

    const display = () => {
        const getData = async () => {
            const querySnapshot = onSnapshot(monthRef, (refSnapshot) => {
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
                    if (doc.data().traffic != 0) {
                        numList.push({y: doc.data().traffic, x: "Traffic, "+ parseFloat(doc.data().traffic / doc.data().expenditure * 100).toFixed(2) + "%"});
                    }
                    if (doc.data().recreation != 0) {
                        numList.push({y: doc.data().recreation, x: "Recreation, "+ parseFloat(doc.data().recreation / doc.data().expenditure * 100).toFixed(2) + "%"});
                    }
                    if (doc.data().medical != 0) {
                        numList.push({y: doc.data().medical, x: "Medical, "+ parseFloat(doc.data().medical / doc.data().expenditure * 100).toFixed(2) + "%"});
                    }
                    if (doc.data().beautify != 0) {
                        numList.push({y: doc.data().beautify, x: "Beautify, "+ parseFloat(doc.data().beautify / doc.data().expenditure * 100).toFixed(2) + "%"});
                    }
                    if (doc.data().diet != 0) {
                        numList.push({y: doc.data().diet, x: "Diet, "+ parseFloat(doc.data().diet / doc.data().expenditure * 100).toFixed(2) + "%"});
                    }
                    if (doc.data().education != 0) {
                        numList.push({y: doc.data().education, x: "Education, "+ parseFloat(doc.data().education / doc.data().expenditure * 100).toFixed(2) + "%"});
                    }
                    if (doc.data().necessity != 0) {
                        numList.push({y: doc.data().necessity, x: "Necessity, "+ parseFloat(doc.data().necessity / doc.data().expenditure * 100).toFixed(2) + "%"});
                    } 
                    if (doc.data().others != 0) {
                        numList.push({y: doc.data().others, x: "Others, "+ parseFloat(doc.data().others / doc.data().expenditure * 100).toFixed(2) + "%"});
                    }
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
        getData();
        toggleOpen(false);
    };

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
    <TouchableOpacity onPress={() => toggleOpen(true)} style={styles.input}>
        <Text style={styles.inputText}>
            {month ? moment(month).format('YYYY/MM') : 'Month'}
        </Text>
    </TouchableOpacity>

    <Modal
        transparent
        animationType="fade"
        visible={isOpen}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.contentContainer}>
            <View style={styles.content}>
                <MonthPicker
                    selectedDate={month || new Date()}
                    onMonthChange={setMonth}
                />
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={display}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
</View>


</View>

        <View style = {{width: WIDTH * 0.9, alignSelf: 'center'}}>
            


            <Text>Line chart for week trends</Text>
            
            
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
            <VictoryPie
                data={NumData}
                width={400}
                height={250}
                innerRadius={50}
                style={{
                labels: {
                fill: 'black', fontSize: 15, padding: 7,
                }, }}
                colorScale={colorScheme}
                /> 


            
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