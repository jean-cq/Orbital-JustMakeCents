import { TodayOutlined } from '@mui/icons-material';
import React from 'react';

import {SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js'
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js'

export default Book_page = () => {
    const COLORS = {primary: '#1f145c', grey: '#EBECF0'};
    const [items, setItems] = React.useState([
        {id:1, task:"First item", completed: true},
        {id:2, task:"Second item", completed: true},
    ]);

    const ListItem = ({item}) => {
        return (
            <View style={styles.listItem}>
                <View style={styles.listItem}>
                    <Text style={{fontWeight: 'bold', fontize: 15, color: 'gold', textDecorationLine: item?.completed ? 'line-through' : 'none'}}>
                        {item?.task}
                    </Text>
                </View>
            </View>
        );
    }
    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: COLORS.grey}}>
                <View style={styles.header}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: COLORS.primary}}>
                    Shopping List
                </Text>
                <FontAwesome name="trash" size={25} color="red"/>
                </View>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{padding: 20, paddingBottom: 100}}
                    data={items} 
                    renderItem={({item})=><ListItem items={item} />}
                />
                <View style={styles.footer}>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Add Entry"/>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.iconContainer}>
                            <Ionicons name="add" color="white" size={30} />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        backgroundColor: '##FFFFFF',
        flexDirection: "row",
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    },
    header:{
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footer:{
        position: 'absolute',
        bottom: 0,
        color: '#EBECF0',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer:{
        backgroundColor: 'white',
        elevation: 40,
        flex: 1,
        height: 50,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 30,
        paddingHorizontal: 20
    },
    iconContainer: {
        height: 50,
        width: 50,
        backgroundColor: 'gold',
        borderRadius: 25,
        elevation: 40,
        justifyContent: 'center',
        alignItemns: 'center'
    },
});