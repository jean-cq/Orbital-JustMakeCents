// JavaScript source code
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import Fontisto from '../node_modules/@expo/vector-icons/Fontisto.js';

export default Tips1 = () => {
    return(
<View >

    <View style={{ flexDirection: 'column', flex: 4 }} >
        <Text style={{
            justifyContent: 'center', fontSize: 20, fontWeight: 'bold', fontFamily: 'serif'
        }} > Daliy Saving Tips </Text>



        <Text style={{ alignSelf: 'center', fontSize: 15, marginVertical: 10 }} > Switch to supermarket-brand products </Text>
    </View>
    <Fontisto
        name="shopping-bag-1"
        color={'black'}
        size={70}
        style={{ flex: 1 }} />



</View>)
}