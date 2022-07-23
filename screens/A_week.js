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

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default A_week = () => {
    const [ExpenditureData, setExpenditureData] = useState([]);
    const [show, setShow] = useState(false);
    const [isOpen, toggleOpen] = useState(false);
    const [week, setWeek] = useState(null);

    const userId = authentication.currentUser.uid;
    const date = new Date();
    const weekRef = query(collection(db, "users/" + userId + "/expenditure"), where("date", "==", moment(date).format('YYYY/MM')));

    const display = () => {
        const getData = async () => {
            const querySnapshot = onSnapshot(weekRef, (refSnapshot) => {
                const weekList = [];
                refSnapshot.forEach((doc) => {
                    weekList.push(doc.data());
                });
                setExpenditureData(weekList);
            });
        };
        getData();
        toggleOpen(false);
    };

    const fill = 'rgb(134, 65, 244)'
        const data = [ExpenditureData, ExpenditureData.recreation, ExpenditureData.medical, ExpenditureData.beautify, ExpenditureData.diet, ExpenditureData.education, ExpenditureData.necessity, ExpenditureData.others]
        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data
            .filter((value) => value != 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))
            

    return (
        <ScrollView>

<View style={{ margin: 20}}>




</View>

        <View style = {{width: WIDTH * 0.9, alignSelf: 'center'}}>
            


            <Text>Line chart for week trends</Text>
            
            <YAxis
                    style={{ marginVertical: -10 }}
                    data={data}
                    formatLabel={(value, index) => value}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
                <LineChart
                style={{ height: 200 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
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
            <BarChart style={{ height: 200 }} 
            data={ExpenditureData} 
            svg={{ fill }} 
            contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
            </BarChart>

            <Text>Bar chart for each category</Text>
            <BarChart style={{ height: 200 }} 
            data={ExpenditureData} 
            svg={{ fill }} 
            yAccessor={({ item }) => item.amount}
            xAccessor={({ item }) => item.category}
            contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
            </BarChart>

            <Text>Pie chart for each category</Text>
            <PieChart style={{ height: 200 }} data={pieData} />

            <Text>Pie chart for payment method</Text>
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