import {  StyleSheet, Text, View, FlatList } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

export default Budget = () => {
    const [ExpenditureData, setExpenditureData] = useState([]);
    return (
        <View>
            <View style={styles.container}>
                <Text style={{ marginLeft: 50, fontSize: 16, fontWeight: 'bold' }}>Budget</Text>
                <Svg width='300' height='30'>
                    <Rect
                        x="0"
                        y="10"
                        width="225"
                        height="15"
                        fill='#3C3056'
                        strokeWidth="3"
                    />
                    <Rect
                        x="0"
                        y="10"
                        width={0.75 * 225}
                        height="15"
                        fill='yellow'
                        strokeWidth="3"
                    />
                </Svg>
                <Text style={{ textAlign: 'right', marginRight: 70, fontSize: 10 }}>75%</Text>
            </View>        
         <FlatList
                showsVerticalScrollIndicator={true}
                data={ExpenditureData}
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row', padding: 20 }}>
                            <Text style={{ flex: 1 }}>{item.status}</Text>
                            <Text style={{ flex: 2 }}>{item.category}</Text>
                            <Text style={{ flex: 2 }}> {item.name} </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}> {item.income ? '+' : '-'}{item.amount} </Text>
                            <Text style={{ flex: 3, textAlign: 'right', marginRight: 10 }}> {item.note} </Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>

                    </View>
                )}
                keyExtractor={
                    (item) => item.id
                }
            />
            <View style={styles.buttonposition}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    segmentContainer:{
    
    flexDirection: 'column',
    padding: 20
},
    container: {
        backgroundColor: '#C4C4C4',
        flexDirection: 'column',
        padding: 20
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