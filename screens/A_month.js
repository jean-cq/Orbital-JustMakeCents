// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
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
import ReactNativeFusionCharts from 'react-native-fusioncharts';

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

        //STEP 3 - Chart Configurations
        const chartConfig = {
          type: "column2D",
          width: "100%",
          height: "400",
          dataFormat: "json",
          dataSource: {
            chart: {
              caption: "Countries With Most Oil Reserves [2017-18]",
              subCaption: "In MMbbl = One Million barrels",
              xAxisName: "Country",
              yAxisName: "Reserves (MMbbl)",
              numberSuffix: "K",
              theme: "fusion",
              exportEnabled: 1 // to enable the export chart functionality
            },
            data: ExpenditureData
          }
        };
    
        this.state = {
          chartConfig
        };


    return (

        <SafeAreaView>
            <Text>Month!</Text>


            <View style={styles.container}>
        <Text style={styles.heading}>
          FusionCharts Integration with React Native
        </Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
          />
        </View>
      </View>


        </SafeAreaView>

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