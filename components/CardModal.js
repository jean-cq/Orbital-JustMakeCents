import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default CardModal = (props) =>{

    const onPressItem = (data) => {
        props.changeModalVisibility(false);
        props.setData(data);

    }

    const option = props.data.map((name, index) =>{
        return (
            <TouchableOpacity
                style = {styles.option}
                key = {index}
                onPress = {() => onPressItem(name)}
                >
                    <Text style = {styles.text}>
                        {name}
                    </Text>
            </TouchableOpacity>
        )
    })
    return(
        <TouchableOpacity
            onPress ={() => props.changeModalVisibility(false)}
            style = {[styles.container, {height : HEIGHT * 0.2}]}>
                <View style ={styles.modal}>
                    <ScrollView>
                        {option}
                    </ScrollView>



                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: HEIGHT * 0.4,
        alignItems: 'center',
        justifyContent: 'center'

    },
    modal:{
        backgroundColor:'white',
        borderRadius: 10
    },
    option:{
        alignItems : 'center'
    },
    text:{
        margin: 20,
        fontSize:20,
        fontWeight:'bold'
    }

})