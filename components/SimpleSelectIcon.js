// JavaScript source code
// JavaScript source code
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'


const SimpleSelectIcon = ({
    text,
    textSize,
    iconName,
    iconColor,
    iconSize,
    buttonDefaultColor,
    buttonSelectedColor,
    textDefaultColor,
    textSelectedColor,
    isChecked,
    ...props
}) => {

    return (
        <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity
            {...props}
            style={{ paddingVertical: 10, }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    borderRadius: 80,
                    overflow: 'hidden',
                    textAlign: 'center',
                    justifyContent: 'center',
                    backgroundColor: isChecked === true ? buttonSelectedColor : buttonDefaultColor
                }}>
                
                <Text
                    style={[styles.button_item, { position: 'absolute', right: 25, }]}>{isChecked === true ?
                        <FontAwesome name={iconName} size={iconSize} color={iconColor} /> : null}
                </Text>
            </View>

        </TouchableOpacity>
        <Text
                    style={[styles.button_item, { fontSize: textSize, color: isChecked === true ? textSelectedColor : textDefaultColor }]}>
                    {text}
            </Text>
            </View>
    )

}

const styles = StyleSheet.create({
    button_item: {
        padding: 8,
        marginVertical: 5,
        borderRadius: 5,
        textAlign: 'center'
    },

})

export default SimpleSelectButton;