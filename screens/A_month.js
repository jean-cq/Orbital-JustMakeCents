// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, Dimensions, View } from 'react-native';
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

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default A_month = () => {
    const [ExpenditureData, setExpenditureData] = useState([]);

    const userId = authentication.currentUser.uid;
    
    const monthRef = query(collection(db, "users/" + userId + "/expenditure"), where("bigcat", "in", ["Expenditure", "Income"]));

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = onSnapshot(monthRef, (refSnapshot) => {
                const monthList = [];
                refSnapshot.forEach((doc) => {
                    monthList.push(doc.data());
                });
                setExpenditureData(monthList);
            });
        };
        getData();
    }, []);

    const fill = 'rgb(134, 65, 244)'
        const data = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]
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

        <SafeAreaView style = {{width: WIDTH * 0.9, alignSelf: 'center'}}>
            <Text>Month!</Text>


            <Text>Line chart for week trends</Text>
            
            <YAxis
                    style={{ marginVertical: -10 }}
                    data={ExpenditureData}
                    formatLabel={(value, index) => value}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
                <LineChart
                style={{ height: 200 }}
                data={ExpenditureData}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                yAccessor={({ item }) => item.amount}
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
            yAccessor={({ item }) => item.amount}
            xAccessor={({ item }) => item.category}
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

            
        </SafeAreaView>
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
    }
  });