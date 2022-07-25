// JavaScript source code
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';


const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
export default Flat_button = ({ text, onPress  }) => {
    

    return (
        <TouchableOpacity style = {{}} onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttontext} > {text} </Text>
                </View>
        </TouchableOpacity>
)}

    const styles = StyleSheet.create({
        button: {
            borderRadius: 20,
            paddingVertical: HEIGHT * 0.025,
            paddingHorizontal: 10,
            backgroundColor: 'white',
            marginHorizontal: 50
                    },
        buttontext: {
           color: 'grey',
            fontSize: 20,
            textAlign: 'center'
        }
    }
    )