import { Text, View } from 'react-native';
import Fontisto from '../node_modules/@expo/vector-icons/Fontisto.js';

export default Tips1 = ({ text, imagename}) => {
    return (
            <View style={{padding:13, flexDirection: 'row'}}>
    <View style={{ flexDirection: 'column', flex: 4 }} >
        <Text style={{
            justifyContent: 'center', fontSize: 20, fontWeight: 'bold', fontFamily: 'serif'
        }} > Daliy Saving Tips </Text>
                <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 15, marginVertical: 10 }} > {text} </Text>
    </View>
    <Fontisto
        name={imagename}
        color={'black'}
        size={70}
        style={{ flex: 1 }} />
            </View>    
)
}