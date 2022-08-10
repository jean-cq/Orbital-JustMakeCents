// JavaScript source codeimport { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, ScrollView} from 'react-native';
import MaterialCommunityIcons from '../node_modules/@expo/vector-icons/MaterialCommunityIcons.js';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import Tips1 from '../screens/tips1';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Catebutton from '../components/Catebutton.js';
import PageControl from 'react-native-page-control';
import PagerView from 'react-native-pager-view';
import { authentication, db } from "../lib/firebase.js";
import { signOut, Auth, onAuthStateChanged} from "firebase/auth";
import { collection, query, doc, getDoc, onSnapshot,where } from 'firebase/firestore';
import moment from 'moment';
import JMCICON from '../assets/JMC_Icon.png';



const Iconjmc = Image.resolveAssetSource(JMCICON).uri;
export default Profile = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState([
        { key: 0, imagename: 'shopping-bag-1', tip: 'Switch to supermarket-brand products' },
        { key: 1, imagename: 'podcast', tip: 'Cancel automatic subscriptions and memberships.' },
        { key: 2, imagename: 'wind', tip:'Reduce energy costs' }
    ]);
    const [current, setCurrent] = useState(0)
    const navigation = useNavigation();
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [profile, setProfile] = useState('');
    const [user, setUser] = useState('');
    const [ExpenditureData, setExpenditureData] = useState([0, 0]);
    const [signupdate, setSignupdate] = useState(null);
    const [days, setDays] = useState(null);
    const [datedata,setDatedata] = useState([]);
    const [daysrecorded, setDaysrecorded] = useState(null);
    const [currdate, setCurrdate] = useState (moment(new Date().getTime()).format('YYYY/MM/DD')); 
    const [dayscontinue, setDayscontinue] = useState (0);
    const [toggle, setToggle] = useState(false);

    

   const monthNum = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  // Handle user state changes
  //function onAuthStateChanged(user) {
  //  setUser(user);
    
  //}
  const y = new Date().getFullYear();
  const m = new Date().getMonth() + 1;
  const month = () =>{
      if (m < 10){
          return y+ '/0' +m
      }else {
          return y+'/'+m
      }
  }
  function arrayIsEmpty(array) {
    //If it's not an array, return FALSE.
    if (!Array.isArray(array)) {
        return false;
    }
    //If it is an array, check its length property
    if (array.length == 0) {
        //Return TRUE if the array is empty
        return true;
    }
    //Otherwise, return FALSE.
    return false;
}
    useEffect(() => {

        setTimeout(() => setToggle((prevToggle) => !prevToggle), 1000);
        const subscriber = authentication.onAuthStateChanged((user) =>
        { if (user) {
        const signup = authentication.currentUser.metadata.creationTime;
        const userId = authentication.currentUser.uid;
        const sfDocRef = doc(db, "users/" + userId + "/profile" + '/userinfo' );
        const q = query(collection(db, "users/" + userId + "/profile"  ))
        
            
            
        const getData = async() => {
            const sfDoc = await getDoc(sfDocRef)
            if (sfDoc.exists() === true){
            const querySnapshot = onSnapshot(q, (refSnapshot) => {
                const expList = [];
                refSnapshot.forEach((doc) => {
                    expList.push(doc.data());
                });
            setProfile(expList[0]);
            
            })
        }else{
            setProfile(null);
        }};
       const monthRef = query(collection(db, "users/" + userId + "/month"), where("mon", "==",month()));
        //const sfmonthRef = doc(db, "users/" + userId + "/month"); 
        const getMonthData = async () => {
            //const monthDoc = await getDoc(sfmonthRef)
            //if (monthDoc.exists() === true){
            const querySnapshot = onSnapshot(monthRef, (refSnapshot) => {

                
                const expList = [];
               
                refSnapshot.forEach((doc) => {
                    expList.push({type:'income', amount:doc.data().income})                   
                    expList.push({type:'expenditure', amount:doc.data().expenditure})
                        //doc.data().traffic + doc.data().recreation+doc.data().medical + 
                        //doc.data().beautify + doc.data().diet + doc.data().education + doc.data().necessity + doc.data().others);
                });
                if(arrayIsEmpty(expList)){
                    setExpenditureData(null)
                }else{
                setExpenditureData(expList);}}

                
            
            
            
                            
            );//}else{
                //setExpenditureData(null);
           // }
        };
        const DateRef = query(collection(db, "users/" + userId + "/expenditure"));
        //const sfdateRef = doc(db, "users/" + userId + "/expenditure"); 
        const getDateData = async() => {
            //const dateDoc = await getDoc(sfdateRef)
            //if (dateDoc.exists() === true){
            const querySnapshot = onSnapshot(DateRef, (refSnapshot) => {
                const expList = [];
                refSnapshot.forEach((doc) => {
                    expList.push(doc.data().date);
                });
                if(arrayIsEmpty(expList)){
                    setDatedata([]);
                }else{setDatedata(expList);
                }
            

            const signn = new Date(moment(signupdate).format('YYYY-MM-DD')).getTime();
            const currentt = new Date().getTime();
            setDays(Math.ceil((currentt-signn) / (1000 * 3600 * 24)));
     
            const removeDuplicates = (arr) => {
                if(!arrayIsEmpty(arr)){
             const unique = [];
             arr.forEach(element => {
                 if (!unique.includes(element)) {
                     unique.push(element);
                 }
             });
             return unique;}
             else{
                return arr;
             }
         }
     
             const recordarr = removeDuplicates(datedata);
             setDaysrecorded(recordarr.length);
     
             const continuingg = (arr) => {
               // const curdate = moment(currentt).format('YYYY/MM/DD');
               //setCurrdate(curdate.toString());
               if(!arrayIsEmpty(arr)){
                const monthsorted = arr.sort((a, b) => b.slice(5,7) - a.slice(5,7));
                const datesorted = monthsorted.sort((a, b) => b.slice(8,10) - a.slice(8,10));
                
                
                for (let i = 0; i < datesorted.length; i = i + 1){
                 if (currdate === datesorted[i]){
                 const nextdate = new Date().setDate(new Date(datesorted[i].slice(0,4) + '-' + datesorted[i].slice(5,7) + '-' + datesorted[i].slice(8,10)).getDate() -1);
                 setCurrdate(moment(new Date(nextdate)).format('YYYY/MM/DD'));
             
                 setDayscontinue(i+1);
                 
                 }
                }}else{
                    setDayscontinue(0);
                }}

                continuingg(recordarr);
            
            })//}else{

              //  setDatedata(null);
          //  }
        };
        getData();
        getMonthData();
        getDateData();
        
        setSignupdate(signup);
        console.log(signupdate);
       
       
    }else{
        navigation.navigate('AuthStacks', { screen: "Starting_page" });
         
    }
        
        });
        
        subscriber();
      }, [toggle]);

    const trytry = async() =>{
        const q = query(collection(db, "users/" + userId + "/profile"  ));
        const sfDocRef = doc(db, "users/" + userId + "/profile" + '/userinfo' );
        const sfDoc = await getDoc(sfDocRef)
        
            
            
        const getData = async() => {
            if (sfDoc.exists() === true){
            const querySnapshot = onSnapshot(q, (refSnapshot) => {
                const expList = [];
                refSnapshot.forEach((doc) => {
                    expList.push(doc.data());
                });
            setProfile(expList[0]);
            })
        }else{
            setProfile(null);
        }}
        getData();
 
        
    }
    

    const SignOutUser = () => {
        signOut(authentication)
        .then((re)=>{
            setIsSignedIn(false);
            navigation.navigate("Starting_page")
        })
        .catch((re)=>{
            console.log(re)
        })
    }
    const viewPagerSelectCurrent = (tag) => {
        setCurrent(+tag.nativeEvent.position);
    }

    return (
        <View style={{ flexDirection: 'column' }}>
            <ScrollView>
            {/*avatar*/}
            <View style={{ flexDirection: 'column', marginTop: 10, marginRight: 10 }}>
            <Catebutton text= "Edit your profile" onPress={() => navigation.navigate('Profile_edit')} />
                <View style = {{elevation:2,
                    height:150,
                    width:150,
                    backgroundColor:'#efefef',
                    position:'relative',
                    borderRadius:999,
                    overflow:'hidden',alignSelf: 'center'}}>
                        
                    {/* (profile === null)
                    ? <Ionicons           
                    name="ios-person-circle"
                    color={'black'}
                    size={160}
                    style={{ alignSelf: 'center' }}                
                    />                    
                    : (profile.picture !== null)
                    ? <Image source={{uri: profile.picture}} style = {{alignSelf: 'center', height: 150, width: 150}}/>
                :*/} 
                <Image source={{uri: Iconjmc}} style = {{alignSelf: 'center', height: 150, width: 150}}/>
                </View>
                {(profile === null)                
                ?<Text style={{ fontSize: 25, textAlign:'center' }}>Hi, user.</Text>
                :(profile.name !== null)
                ?<Text style={{ fontSize: 25, textAlign:'center' }}>Hi, {profile.name}.</Text>
                :<Text style={{ fontSize: 25, textAlign:'center' }}>Hi, user.</Text>}
                <Text style={{ fontSize: 15, textAlign:'center' }}>This is Project JMC.</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#F9C70D', borderTopLeftRadius: 20 }}>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: '#979C9E', textAlign: 'center', paddingTop: 5 }}>
                       {arrayIsEmpty(datedata)? '0' : daysrecorded}
                    </Text>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: '#979C9E', textAlign: 'center', paddingBottom: 5 }}>
                        Days recorded
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#cdad7a' }}>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: 'white', textAlign: 'center', paddingTop: 5   }}>
                        {arrayIsEmpty(datedata)? '0' : dayscontinue}
                    </Text>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: 'white', textAlign: 'center', paddingBottom: 5  }}>
                        Days continuing
                    </Text>
                </View><View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#F9C70D', borderTopRightRadius: 20 }}>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: '#979C9E', textAlign: 'center', paddingTop: 5 }}>
                        {days + 1}
                        
                    </Text>
                    <Text
                        style={{ fontSize: 10, fontWeight: 'bold', color: '#979C9E', textAlign: 'center', paddingBottom: 5 }}>
                        Days joined
                    </Text>
                </View>
            </View>
            <View style={{ height: 3, backgroundColor: '#EEE9BF', width: '100%' }}>
            </View>

            { /*Bill
            <View style={{ backgroundColor: '#F9C70D', marginTop: 5, flexDirection: 'column', padding: 10, borderRadius: 20, borderColor:'yellow',borderWidth: 1}}>
                <TouchableOpacity onPress={() => Alert.alert("This is Bill.")}>


                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            justifyContent: 'center', fontSize: 20, marginRight: 315, fontWeight: 'bold', fontFamily:'serif' }} > Bill </Text>
                        
                    <MaterialIcons
                    name="keyboard-arrow-right"
                    color={'black'}
                    size={30}
                    style={{ alignSelf: 'flex-end' }} />
                       
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > Date </Text>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1 }}> Incomes: $3000 </Text>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1}}> Expenses: $250 </Text>

                </View>

                
                
            </View>*/}
            <View style={{ backgroundColor: '#F9C70D', marginTop: 5, flexDirection: 'column', padding: 10, borderRadius: 20, borderColor:'yellow',borderWidth: 1}}>
                


                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            justifyContent: 'center', fontSize: 20, marginRight: 315, fontWeight: 'bold', fontFamily:'serif' }} > Bill </Text>
                        </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > {monthNum[m-1]} </Text>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1 }}> Incomes: ${ExpenditureData === null ? '0' :ExpenditureData[0].amount} </Text>
                    <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1}}> Expenses: ${ExpenditureData === null ? '0' :ExpenditureData[1].amount} </Text>

                </View>

                
                
            </View>
            { /*tips*/}
                <PagerView initialPage={0}
                    orientation={'horizontal'} style={{ backgroundColor: '#C4C4C4', marginTop: 6, padding: 57, flexDirection: 'column', borderRadius: 50 }} onPageSelected={viewPagerSelectCurrent}>
                   

                        <View key = '0'>
                 <Tips1 text={page[0].tip} imagename={page[0].imagename} key={page[0].key} />

                        
                    </View>
                    <View key='1'>
                        <Tips1 text={page[1].tip} imagename={page[1].imagename} key={page[1].key} />


                    </View>
                    <View key='2'>
                        <Tips1 text={page[2].tip} imagename={page[2].imagename} key={page[2].key} />


                    </View>

                </PagerView>

                
                <PageControl
                    style={{ left: 0, right: 0, bottom: 15 }}
                    numberOfPages={3}
                    currentPage={current}
                    hidesForSinglePage
                    pageIndicatorTintColor='gray'
                    currentPageIndicatorTintColor='white'
                    indicatorStyle={{ borderRadius: 5 }}
                    currentIndicatorStyle={{ borderRadius: 5 }}
                    indicatorSize={{ width: 8, height: 8 }}

                />

            {/*button for badges
            <View style={{flexDirection: 'column', padding: 10, borderRadius: 20}}>
                <TouchableOpacity onPress={() => Alert.alert("This is Badge.")}>


                        <View style={{
                            flexDirection: 'row', backgroundColor: '#F1EFEF' }}>
                        <Text style={{
                            justifyContent: 'center', fontSize: 20, marginRight: 290, fontWeight: 'bold', fontFamily: 'serif'
                        }} > Badge </Text>

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            color={'black'}
                            size={30}
                            style={{ alignSelf: 'flex-end' }} />

                    </View>
                </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop:20 }}>
                        <View style={{ flexDirection: 'column',flex: 1 }} >
                        <FontAwesome
                            name="certificate"
                            color={'black'}
                            size={30}
                            style={{ alignSelf: 'center' }}
                        />
                        
                            <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > 5-day challenge </Text>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }} >
                            <MaterialCommunityIcons
                                name="check-decagram"
                                color={'black'}
                                size={30}
                                style={{ alignSelf: 'center' }}
                            />

                            <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > 30-day record </Text>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }} >
                            <MaterialCommunityIcons
                                name="food"
                                color={'black'}
                                size={30}
                                style={{ alignSelf: 'center' }}
                            />

                            <Text style={{ justifyContent: 'center', fontSize: 15, flex: 1, marginLeft: 2 }} > Dining Master </Text>
                        </View>
                        
                </View>



            </View>*/}
            {/*button for setting
             
                <TouchableOpacity style={{
                    backgroundColor: '#C4C4C4', marginTop: 5, padding: 13, borderRadius: 20, flexDiection: 'row', justifyContent: 'space-between'
                }} onPress={() => Alert.alert("This is Setting.")}>
                    <Text style={{
                        textAlign: 'left', padding: 10, position: 'absolute', paddingTop: 13
                    }} >
                        <Ionicons
                        name="settings"
                        color={'black'}
                            size={25}
                           /></Text>

              
                    <Text style={{
                        textAlign: 'center', fontSize: 20
                        }} > Setting </Text>

                    
                </TouchableOpacity>*/}

                {/*button for Contact Us*/}

                <TouchableOpacity style={{
                    backgroundColor: '#C4C4C4', marginTop: 5, padding: 13, borderRadius: 20, flexDiection: 'row', justifyContent: 'space-between'
                }} onPress={() => navigation.navigate('Contact_us')}>
                    <Text style={{
                        textAlign: 'left', padding: 10, position: 'absolute', paddingTop: 13
                    }} >
                        <MaterialCommunityIcons
                            name="message-question"
                            color={'black'}
                            size={25}
                        /></Text>


                    <Text style={{
                        textAlign: 'center', fontSize: 20
                    }} > Contact Us </Text>


                </TouchableOpacity>
                
           
            {/*button for sign out*/}
            <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={SignOutUser}>

                        <View style={styles.button}>
                           
                                <Text style={styles.buttontext} > Sign Out </Text>
                          
                        </View>
                            </TouchableOpacity>
                            
        
            </View>
        </ScrollView>
        </View>)}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 5,
        backgroundColor: 'yellow',
        marginHorizontal: 100
    },
    buttontext: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
    })