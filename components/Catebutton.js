// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';

export default Flat_button = ({ text, onPress }) => {
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
        backgroundColor: 'orange',
        marginHorizontal: 50
    },
    buttontext: {
        color: 'black',
        fontSize: 13,
        textAlign: 'center'
    }
}
)