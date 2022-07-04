import React, { Dispatch, SetStateAction, useState } from "react";
import { SafeAreaView, TextInput, View, StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native"
import { chevronDown } from "./Images";

// const strToNum = (textInput: string): number =>
//     Number.parseInt(textInput.replace(/[^0-9]/g, ""))

export enum PickerType {
    MONTH = "Month",
    YEAR = "Year"
}

interface INumPicker {
    type: PickerType.MONTH | PickerType.YEAR,
    setTextInput: Dispatch<SetStateAction<number>>,
    textInput: number,
    style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[] | {}
}

export const YearMonthPicker = ({ type, textInput, setTextInput, style }: INumPicker) => {
    const [visible, setVisible] = useState(false);
    const [updatedPlaceholder, setUpdatedPlaceholed] = useState(type.toString())

    const toggleSwitch = () => {
        setVisible(!visible);
    };

    const whichToRender = (visible: boolean) =>
        visible
            ?
            <View style={style}>
                <TextInput
                    keyboardType="number-pad"
                    returnKeyType="done"
                    textAlign="center"
                    style={styles.input}
                    onChangeText={(text) => {
                        let num = Number.parseInt(text.replace(/[^0-9]/g, ""))
                        
                        switch (num) {
                            case 0: setUpdatedPlaceholed(`> ${type}`); break;
                            case 1: setUpdatedPlaceholed(`${num} ${type}`); break;
                            default: setUpdatedPlaceholed(`${num} ${type}s`)
                        }
                        setTextInput(num)
                    }}
                    value={textInput.toString()}
                    maxLength={type == PickerType.MONTH ? 2 : 3} />
            </View>
            :
            <View style={style}>
                <TouchableOpacity
                    onPress={toggleSwitch}
                    style={[{
                        borderColor: "white",
                        borderWidth: 1,
                        flexDirection: "row",
                        padding: 10
                    }]}
                >
                    <Text style={{ flex: 1, textAlign: "center", color: "white" }}>
                        {updatedPlaceholder}
                    </Text>
                    {chevronDown}
                </TouchableOpacity>
            </View>


    return (
        <>{whichToRender(visible)}</>
    )

}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "white",
        padding: 10,
        color: "white"
    },
});