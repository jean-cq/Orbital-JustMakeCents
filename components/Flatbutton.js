// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default Flat_button = ({ text, onPress  }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttontext} > {text} </Text>
                </View>
        </TouchableOpacity>
)}

    const styles = StyleSheet.create({
        button: {
            borderRadius: 20,
            paddingVertical: 14,
            paddingHorizontal: 10,
            backgroundColor: 'yellow',
            marginHorizontal: 50
                    },
        buttontext: {
           color: 'grey',
            fontSize: 20,
            textAlign: 'center'
        }
    }
    )