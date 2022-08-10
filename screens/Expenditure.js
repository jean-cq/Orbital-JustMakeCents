import { Alert, Modal, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
//import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import { React, useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Rect } from 'react-native-svg';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { db, authentication } from '../lib/firebase.js';
import { ref, set, onValue, getDatabase } from "firebase/database";
import { doc, getDoc, getDocs, updateDoc, collection, query, where, onSnapshot, QueryDocumentSnapshot, setDoc, increment, orderBy } from "firebase/firestore";
import moment from 'moment';
import MonthPicker from 'react-native-month-picker';




export default Expenditure = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([
        { id: '0', status: false, category: 'Beverage', name: 'Milk', income: false, amount: 5.00, note: null },
        { id: '1', status: false, category: 'Food', name: 'Chocolate', income: false, amount: 5.00, note: 'haha' },
        { id: '2', status: true, category: 'beauty', name: 'lipstick', income: false, amount: 25.00, note: 'lolll' },
        { id: '3', status: true, category: 'others', name: 'scholarship', income: true, amount: 300.00, note : 'qkym'},
    ]);
    const [sumBudget,setSumBudget] = useState(0);
    const [ExpenditureData, setExpenditureData] = useState([]);
    const [bData, setbData] = useState([]);
    const [IncomeData, setIncomeData] = useState([]);
    const [isOpen, toggleOpen] = useState(false);
    const [month, setMonth] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users



    const y = new Date().getFullYear();
    const m = new Date().getMonth() + 1;
    const monthb = () =>{
        if (m < 10){
            return y+ '/0' +m
        }else {
            return y+'/'+m
        }
    }
    const bRef = query(collection(db, "users/" + userId + "/budget"), where("category", "==", "month"));
    const monthRef = query(collection(db, "users/" + userId + "/month"), where("mon", "==",monthb()));

    useEffect(() => {
        setTimeout(() => setToggle((prevToggle) => !prevToggle), 3000); 
        const getData = async () => {
            const querySnapshot = onSnapshot(bRef, (refSnapshot) => {
                const expList = [];
               
                refSnapshot.forEach((doc) => {
                    expList.push({id: '0', category: "Traffic", amount: doc.data().traffic});
                    expList.push({id: '1', category: "Recreation", amount: doc.data().recreation});
                    expList.push({id: '2', category: "Medical", amount: doc.data().medical});
                    expList.push({id: '3', category: "Beautify", amount: doc.data().beautify});
                    expList.push({id: '4', category: "Diet", amount: doc.data().diet});
                    expList.push({id: '5', category: "Education", amount: doc.data().education});
                    expList.push({id: '6', category: "Necessity", amount: doc.data().necessity});
                    expList.push({id: '7', category: "Others", amount: doc.data().others});
                    expList.push(doc.data().traffic + doc.data().recreation+doc.data().medical + 
                        doc.data().beautify + doc.data().diet + doc.data().education + doc.data().necessity + doc.data().others);
                });
            setbData(expList.reverse());
                            
            });
        };const getMonthData = async () => {
            const querySnapshot = onSnapshot(monthRef, (refSnapshot) => {
                const incomeList = [];
                refSnapshot.forEach((doc) => {                
                    incomeList.push(doc.data().expenditure);
                });
                
                setIncomeData(incomeList);
            });
        };
        getData();
        getMonthData();
        setSumBudget(bData[8]);
            //bData[0].amount + bData[1].amount + bData[2].amount + bData[3].amount + bData[4].amount + bData[5].amount + bData[6].amount + bData[7].amount);
       
         
       
    }, [toggle]);

   

    const deleteItem = id => {
        setItems(previousItems => {
            return previousItems.filter(item => item.id !== id);
        });
    };
    const status_change = () => {
        setItems(item => item.status = !item.status)
    }

 /*   const loadAllExpenditure = async () => {

        const { Expenditure, error } = await supabase.getAllExpenditure();
        setExpenditureData(Expenditure)
    }
    useEffect(() => {
        loadAllExpenditure();

    },[]); */

    const userId = authentication.currentUser.uid;

    const datas = getDatabase();
    
    const expRef = query(collection(db, "users/" + userId + "/expenditure"), orderBy("date"), where("bigcat", "in", ["Expenditure", "Income"]), 
    where("month", "==", moment(month).format('YYYY/MM')));

    
    const display = () => {
        const getData = async() => {
            const querySnapshot = onSnapshot(expRef, (refSnapshot) => {
                const expList = [];
                refSnapshot.forEach((doc) => {
                    expList.push(doc.data());
                });
                expList.push({});
                expList.push({});
                expList.push({});
                expList.push({});
            setExpenditureData(expList);
            })
        };
        getData();
        toggleOpen(false);
        
    };

    const showBudget = async() => {
        const budgetWkDocRef = doc(db, "users/" + userId + "/budget/" + "week");
        const budgetMnDocRef = doc(db, "users/" + userId + "/budget/" + "month");
        const budgetYrDocRef = doc(db, "users/" + userId + "/budget/" + "year");
        const WkDoc = await getDoc(budgetWkDocRef);
        const MnDoc = await getDoc(budgetMnDocRef);
        const YrDoc = await getDoc(budgetYrDocRef);

        const budgetset = async() => {
            if (WkDoc.exists() === false) {
            await setDoc(budgetWkDocRef, {
                traffic: 0,
                recreation: 0,
                medical: 0,
                beautify: 0,
                diet: 0,
                education: 0,
                necessity:0,
                others:0,
                category: "week",
            }).catch((error) => {
                alert(error)
            })
            await setDoc(budgetMnDocRef, {
                traffic: 0,
                recreation: 0,
                medical: 0,
                beautify: 0,
                diet: 0,
                education: 0,
                necessity:0,
                others:0,
                category: "month",
            }).catch((error) => {
                alert(error)
            })
            await setDoc(budgetYrDocRef, {
                traffic: 0,
                recreation: 0,
                medical: 0,
                beautify: 0,
                diet: 0,
                education: 0,
                necessity:0,
                others:0,
                category: "year",
            }).catch((error) => {
                alert(error)
            })
        }}
        budgetset().then(navigation.navigate('Budget'));
    }
    

    return (
        <SafeAreaView >
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate ('Wallet')}>
                <View style={styles.button1}>
                        <Text style={styles.buttontext1} > Wallet </Text>
                </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginLeft: 50, fontSize: 16, fontWeight:'bold' }}>Budget</Text>

                    <TouchableOpacity style={{ marginLeft: 50}} onPress={showBudget}>

                        <Svg width='300' height= '30'>
                            <Rect
                                x="0"
                                y="10"
                                width="225"
                                height="15"
                                fill= '#3C3056'
                                strokeWidth="3"
                                
                            />
                            <Rect
                                x="0"
                                y="10"
                                width={(IncomeData[0] < sumBudget && IncomeData[0] > 0) 
                                    ? ( IncomeData[0]/ sumBudget) * 225
                                    : 225}
                                height="15"
                                fill ='yellow'
                                strokeWidth="3"
                                
                            />
                           
                        </Svg>

                    </TouchableOpacity>
                    <Text style={{ textAlign: 'right', marginRight: 70,fontSize: 10 }}>Press the bar to set your budget</Text>
                    </View>
                    
            </View>
            { /* date*/}
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
                                    selectedDate={month || new Date().getMonth}
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
            <View style={{ height: 1, backgroundColor:'black' }}>
            </View>
            <View style={{ flexDirection: 'row', padding: 20 }}>
                <Text style={{ flex: 1.5 }}>Status</Text>
                <Text style={{ flex: 2, textAlign: 'center'}}>Date</Text>
                <Text style={{ flex: 2, textAlign: 'center'}}>Category</Text>

                <Text style={{ flex: 2, textAlign: 'right' }}>Amount</Text>
                <Text style={{ flex: 3, textAlign: 'right'}}>Note</Text>
            </View>
            <View style={{ height: 1, backgroundColor: 'grey' }}>    
            </View>
            <FlatList
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                data={ ExpenditureData}
                keyExtractor={(item)=>item.key}
                //ExpenditureData
                renderItem={({ item }) => (
                    <View>
                        <View style={{ flexDirection: 'row', padding: 20}}>
                            <BouncyCheckbox
                                style={{ flex: 1.5 }}
                                disableText={true}
                                disableBuiltInState
                                isChecked={item.status}
                                onPress={async() => {
                                    
                                    

                                    const statusref = doc(db, "users/" + userId + "/expenditure/" + item.id);
                                    const matches = await getDoc(statusref);   
                                    await updateDoc(statusref, {
                                        status: !item.status
                                      });


                                      const monthRef = doc(db, "users/" + userId + "/month/" + item.month.slice(0, 4) + item.month.slice(5, 7));
                                      const monthDoc = await getDoc(monthRef);
                                      
                                      if (item.status == true) {
                                          await updateDoc(monthRef, {
                                              expenditure: increment(-item.amount),
                                          })
  
                                          if (item.category == "Traffic") {
                                              await updateDoc(monthRef, {
                                                  traffic: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Recreation") {
                                              await updateDoc(monthRef, {
                                                  recreation: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Medical") {
                                              await updateDoc(monthRef, {
                                                  medical: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Beautify") {
                                              await updateDoc(monthRef, {
                                                  beautify: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Diet") {
                                              await updateDoc(monthRef, {
                                                  diet: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Education") {
                                              await updateDoc(monthRef, {
                                                  education: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Necessity") {
                                              await updateDoc(monthRef, {
                                                  necessity: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Others") {
                                              await updateDoc(monthRef, {
                                                  others: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                      } 
                                  else {
                                      await updateDoc(monthRef, {
                                          expenditure: increment(item.amount),
                                      })
  
                                      if (item.category == "Traffic") {
                                      await updateDoc(monthRef, {
                                          traffic: increment(item.amount),
                                      }).catch((error) => {
                                          alert(error)
                                      })
                                  }
                                      else if (item.category == "Recreation") {
                                          await updateDoc(monthRef, {
                                              recreation: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Medical") {
                                          await updateDoc(monthRef, {
                                              medical: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Beautify") {
                                          await updateDoc(monthRef, {
                                              beautify: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Diet") {
                                          await updateDoc(monthRef, {
                                              diet: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Education") {
                                          await updateDoc(monthRef, {
                                              education: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Necessity") {
                                          await updateDoc(monthRef, {
                                              necessity: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Others") {
                                          await updateDoc(monthRef, {
                                              others: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }}
                                    

                                      const yearRef = doc(db, "users/" + userId + "/year/" + item.year);
                                      const yearDoc = await getDoc(yearRef);
                                      
                                      if (item.status == true) {
                                          await updateDoc(yearRef, {
                                              expenditure: increment(-item.amount),
                                          })
  
                                          if (item.category == "Traffic") {
                                              await updateDoc(yearRef, {
                                                  traffic: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Recreation") {
                                              await updateDoc(yearRef, {
                                                  recreation: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Medical") {
                                              await updateDoc(yearRef, {
                                                  medical: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Beautify") {
                                              await updateDoc(yearRef, {
                                                  beautify: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Diet") {
                                              await updateDoc(yearRef, {
                                                  diet: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Education") {
                                              await updateDoc(yearRef, {
                                                  education: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Necessity") {
                                              await updateDoc(yearRef, {
                                                  necessity: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                          else if (item.category == "Others") {
                                              await updateDoc(yearRef, {
                                                  others: increment(-item.amount),
                                              }).catch((error) => {
                                                  alert(error)
                                              })
                                          }
                                      } 
                                  else {
                                      await updateDoc(yearRef, {
                                          expenditure: increment(item.amount),
                                      })
  
                                      if (item.category == "Traffic") {
                                      await updateDoc(yearRef, {
                                          traffic: increment(item.amount),
                                      }).catch((error) => {
                                          alert(error)
                                      })
                                  }
                                      else if (item.category == "Recreation") {
                                          await updateDoc(yearRef, {
                                              recreation: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Medical") {
                                          await updateDoc(yearRef, {
                                              medical: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Beautify") {
                                          await updateDoc(yearRef, {
                                              beautify: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Diet") {
                                          await updateDoc(yearRef, {
                                              diet: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Education") {
                                          await updateDoc(yearRef, {
                                              education: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Necessity") {
                                          await updateDoc(yearRef, {
                                              necessity: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }
                                      else if (item.category == "Others") {
                                          await updateDoc(yearRef, {
                                              others: increment(item.amount),
                                          }).catch((error) => {
                                              alert(error)
                                          })
                                      }}


                                    const entryDate = moment(item.date).format('YYYY-MM-DD');
                                    const m = new Date(entryDate).getMonth();
                                    const y = new Date(entryDate).getFullYear();
                                    const getDateMonth = (year, month, da) => {
                                    return new Date(year,month,da).getDate();
                                    };
                                    const getDayMonth = (year, month, da) => {
                                        return new Date(year,month,da).getDay();
                                    }
                                
                                    const d = new Date(entryDate).getDay();
                                    const dt = new Date(entryDate).getDate();
                                    const week = () => {
                                            const firstdayMonth = getDayMonth(y, m, 1);
                                            if(firstdayMonth === 0){
                                                const w = Math.ceil(dt/7);
                                                return 'w' + w;
                                            }else{
                                                const differ =  dt - ((6 - firstdayMonth) + 1) ;
                                                const ww = Math.ceil(differ/7);
                                                return 'w' + ww;
                                            }
                                        }

                                    const weekRef = doc(db, "users/" + userId + "/week/" + week());
                                    const weekDoc = await getDoc(weekRef);
                                    
                                    if (item.status == true) {
                                        await updateDoc(weekRef, {
                                            expenditure: increment(-item.amount),
                                        })

                                        if (item.category == "Traffic") {
                                            await updateDoc(weekRef, {
                                                traffic: increment(-item.amount),
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        }
                                        else if (item.category == "Recreation") {
                                            await updateDoc(weekRef, {
                                                recreation: increment(-item.amount),
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        }
                                        else if (item.category == "Medical") {
                                            await updateDoc(weekRef, {
                                                medical: increment(-item.amount),
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        }
                                        else if (item.category == "Beautify") {
                                            await updateDoc(weekRef, {
                                                beautify: increment(-item.amount),
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        }
                                        else if (item.category == "Diet") {
                                            await updateDoc(weekRef, {
                                                diet: increment(-item.amount),
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        }
                                        else if (item.category == "Education") {
                                            await updateDoc(weekRef, {
                                                education: increment(-item.amount),
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        }
                                        else if (item.category == "Necessity") {
                                            await updateDoc(weekRef, {
                                                necessity: increment(-item.amount),
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        }
                                        else if (item.category == "Others") {
                                            await updateDoc(weekRef, {
                                                others: increment(-item.amount),
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        }
                                    } 
                                else {
                                    await updateDoc(weekRef, {
                                        expenditure: increment(item.amount),
                                    })

                                    if (item.category == "Traffic") {
                                    await updateDoc(weekRef, {
                                        traffic: increment(item.amount),
                                    }).catch((error) => {
                                        alert(error)
                                    })
                                }
                                    else if (item.category == "Recreation") {
                                        await updateDoc(weekRef, {
                                            recreation: increment(item.amount),
                                        }).catch((error) => {
                                            alert(error)
                                        })
                                    }
                                    else if (item.category == "Medical") {
                                        await updateDoc(weekRef, {
                                            medical: increment(item.amount),
                                        }).catch((error) => {
                                            alert(error)
                                        })
                                    }
                                    else if (item.category == "Beautify") {
                                        await updateDoc(weekRef, {
                                            beautify: increment(item.amount),
                                        }).catch((error) => {
                                            alert(error)
                                        })
                                    }
                                    else if (item.category == "Diet") {
                                        await updateDoc(weekRef, {
                                            diet: increment(item.amount),
                                        }).catch((error) => {
                                            alert(error)
                                        })
                                    }
                                    else if (item.category == "Education") {
                                        await updateDoc(weekRef, {
                                            education: increment(item.amount),
                                        }).catch((error) => {
                                            alert(error)
                                        })
                                    }
                                    else if (item.category == "Necessity") {
                                        await updateDoc(weekRef, {
                                            necessity: increment(item.amount),
                                        }).catch((error) => {
                                            alert(error)
                                        })
                                    }
                                    else if (item.category == "Others") {
                                        await updateDoc(weekRef, {
                                            others: increment(item.amount),
                                        }).catch((error) => {
                                            alert(error)
                                        })
                                    }}
                                }}

                            />
                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.displaydate}</Text>
                            <Text style={{ flex: 2, textAlign: 'center' }}>{item.category}</Text>
                            <Text style={{ flex: 2, textAlign: 'right' }}> {item.income ? '+' : '-'}{item.amount} </Text>
                            <Text style={{ flex: 3, textAlign: 'right'}}> {item.note} </Text>
                            
                        </View>
                        <View style={{ height: 1, backgroundColor:'grey' }}> 
                        </View>
                    </View>
                )}
                
      />
                 <View style={styles.buttonposition}>
                    
            </View>   
        </SafeAreaView>
        
        
        
        
        );


}



const styles = StyleSheet.create({

    container: {
        backgroundColor:'#EDE9FB',
        flexDirection: 'row',
        padding: 20,
        
    }, 
    input: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderWidth: 0.5,
        borderRadius: 5,
        width: '32%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
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

/*<View>

                            <ListItem item={item} />
                          <TouchableOpacity onPress={() => deleteItem = { deleteItem }} />
                        </View>*/