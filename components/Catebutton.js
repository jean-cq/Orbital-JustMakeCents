// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';

export default Catebutton = ({ text, onPress }) => {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttontext} > {text} </Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 7,
        backgroundColor: 'yellow',
        marginHorizontal: 12,
    },
    buttontext: {
        color: 'grey',
        fontSize: 13,
        textAlign: 'center'
    }
}
)