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
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 7,
        backgroundColor: 'orange',
        alignSelf: 'flex-end'

    },
    buttontext: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center'
    }
}
)