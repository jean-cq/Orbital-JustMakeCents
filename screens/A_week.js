import { ScrollView, StyleSheet, Text, Dimensions, View, Modal } from 'react-native';
import { ref, set, onValue, getDatabase } from "firebase/database";
import { useEffect, useState } from 'react';
import { db, authentication } from '../lib/firebase.js';
import { doc, getDoc, getDocs, updateDoc, collection, query, where, onSnapshot, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import { BarChart, Grid, LineChart, PieChart, XAxis, YAxis } from 'react-native-svg-charts';
import Catebutton from '../components/Catebutton.js';
import { VictoryPie } from 'victory-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default A_week = () => {
    const [ExpenditureData, setExpenditureData] = useState([]);
    const [NumData, setNumData] = useState([]);
    const [IncomeData, setIncomeData] = useState([]);
    const [perData, setPerData] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState('this week');
    const [isModalVisible, setisModalVisible] = useState(false);
    const changeModalVisibility = (bool) =>{
        setisModalVisible(bool)
    }
    const setData = (data) => {
        setSelectedWeek(data)
    }
    const currentDate = new Date();
        const m = currentDate.getMonth();
        const y = currentDate.getFullYear();
        const d = currentDate.getDay();
        const dt = currentDate.getDate();
        const getDateMonth = (year, month, da) => {
           return new Date(year,month,da).getDate();
        };
        const getDayMonth = (year, month, da) => {
            return new Date(year,month,da).getDay();
         }
         const week = (y,m,dt) => {
            const firstdayMonth = getDayMonth(y, m, 1);
            if(firstdayMonth === 0){
                const w = Math.ceil(dt/7);
                return w;
            }else{
                const differ =  dt - ((6 - firstdayMonth) + 1) ;
                const ww = Math.ceil(differ/7);
                return ww;
            }


    };
    const month = (m) =>{
        if ((m+1) < 10){
            return y + '/0' + (m+1)
        }else {
            return y +'/'+ (m+1)
        }
    }
        
    const weekSelelction = ['this week', 'last week'];
    const selected = () =>{
        if(selectedWeek === 'this week'){
            return month(m) + '/' + 'w' + week(y, m, dt);
        }else{
            if(week(y, m, dt) === 1){
            return month(m - 1) + '/' + 'w' + week(y, m - 1,new Date().setDate(-7).getDate() );}
            else{
                return month(m) + '/' + 'w' + (week(y, m, dt) - 1);

            }
        }


    }
    
    const todaymon = month(new Date().getMonth() + 1);
    const todayyear = new Date().getFullYear();
    const todaydate = new Date().getDate();


    const userId = authentication.currentUser.uid;
    
    const colorScheme = ["#f83d41","#ff9506","#ff5e01","#fbe7d3","#963f2d","#ed6f00","#fbe7d3","#fd5e53"];
    const categories = ["Traffic", "Recreation", "Medical", "Beautify", "Diet", "Education", "Necessity", "Others"];
   
    
        

     
            
     
    useEffect(() => {
        const weeek = async() =>{
        const getData = async () => {
            
        
            const weekRef = query(collection(db, "users/" + userId + "/week"), where("week", "==", selected()));
            const querySnapshot = onSnapshot(weekRef, (refSnapshot) => {
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

        const weekDefault = doc(db, "users/" + userId + "/week" + '/200207w1');
        const weekdefaultdoc= await getDoc(weekDefault);
        if (weekdefaultdoc.exists() === true){
        getData()
    }else{
             setDoc(weekdefaultdoc, {
                expenditure: 0,
                income: 0,
                traffic: 0,
                recreation: 0,
                medical: 0,
                beautify: 0,
                diet: 0,
                education: 0,
                necessity:0,
                others:0,
                mon: '2022/07/w1'}).then(getData())
         
        } }
        weeek();
        
    },[selectedWeek]);


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
 <View style = {{width: WIDTH * 0.9, alignSelf: 'center'}}>
<View style={{ marginTop: 20, alignSelf: 'flex-start'}}>

<View>
<Catebutton text={selectedWeek} onPress={() => changeModalVisibility(true)} />
<Modal
                        transparent={true}
                        animationType = 'fade'
                        visible = {isModalVisible}
                        onRequestClose = {null}
                        >
                            <CardModal
                            changeModalVisibility = {changeModalVisibility}
                            data = {weekSelelction}
                            setData = {setData}
                            />
                    </Modal>
    
</View>


</View>

       
            
        <View style = {styles.chartContainer}>

            <Text style={styles.title}>Bar chart income vs expenditure</Text>
            
            {/*
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
                    data={data}
                    formatLabel={(value, index) => value+1}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
                </View>
                <View style = {styles.chartContainer}>
            <Text style={styles.title}>Bar chart income vs expenditure</Text>
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
                */}
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
                </View>
                <View style = {styles.chartContainer}>

            <Text style={styles.title}>Bar chart for each category</Text>
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
                </View>
        {/*
        <View style = {styles.chartContainer}>
            <Text style={styles.title}>Pie chart for each category</Text>
            <PieChart style={{ height: 200 }} data={pieData} />
            </View>
            */}
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
    },title:{
        fontWeight:'bold', 
        textDecorationLine: 'underline',
        textShadowColor:"#c4c4c4"
    },
    chartContainer: {
        paddingVertical: 10,
        borderBottomColor:'#c4c4c4',
        borderBottomWidth:1,
        
    }
  });