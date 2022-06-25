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
import MonthPicker from 'react-native-month-picker';



function MonthPickerModal() {
    const [isOpen, toggleOpen] = useState(false);
    const [value, onChange] = useState(null);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => toggleOpen(true)} style={styles.input}>
                <Text style={styles.inputText}>
                    {value ? moment(value).format('MM/YYYY') : '   Date'}
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
                        <MonthPicker
                            selectedDate={value || new Date()}
                            onMonthChange={onChange}
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



export default React.memo(MonthPickerModal);

const styles = StyleSheet.create({
    container: {
        
    },
    input: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderWidth: 0.5,
        borderRadius: 5,
        width: '32%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        justifyContent: 'center',
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