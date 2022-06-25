import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-modern-datepicker';

function DatePickerModal () {
    

const [isOpen, toggleOpen] = useState(false);
const [value, onChange] = useState(null);

return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => toggleOpen(true)} style={styles.input}>
            <Text style={styles.inputText}>
                {value ? moment(value).format("MMM Do YY") : '  Date'}
            </Text>
        </TouchableOpacity>

        <Modal
            transparent
            animationType="fade"
            visible={isOpen}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    
                    <DatePicker
                        
                        mode="calendar"
                        onSelectedChange={onChange}
                        
                    />

                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => toggleOpen(false)}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
);
}


export default React.memo(DatePickerModal);

const styles = StyleSheet.create({
    container: {

    },
    input: {
        backgroundColor: 'orange',
        paddingVertical: 5,
        paddingHorizontal: 8,
        
        borderRadius: 10,
        marginLeft:18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 13,
        
        textAlign: 'center',
        justifyContent:'center',
        color:'white'
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
    },
    confirmButton: {
        borderWidth: 0.5,
        padding: 15,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});