// JavaScript source code
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
