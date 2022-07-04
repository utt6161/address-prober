import { Portal } from "@gorhom/portal";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, TextInput, View, StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native"
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

const yearLimit = 120
const monthLimit = 12

export const YearMonthPicker = ({ type, textInput, setTextInput, style }: INumPicker) => {
    const [visible, setVisible] = useState(false);
    const [updatedPlaceholder, setUpdatedPlaceholed] = useState(type.toString())

    const toggleSwitch = () => {
        setVisible(!visible);
    };

    const whichToRender = (visible: boolean) =>
        visible
            ?
            <ScrollView>
            <View style={style}>
                    {/* <TouchableOpacity
                    style={[{
                        position: 'absolute',
                        zIndex: 1,
                        left: 0,
                        right: 0,
                        top: 0,
                        height: "100%",
                    }]}
                    onPress={toggleSwitch}
                    testID="CUM"
                /> */}
                    <TextInput
                        keyboardType="number-pad"
                        returnKeyType="done"
                        textAlign="center"
                        // style={[styles.input, {
                        //     zIndex: 2
                        // }]}
                        onChangeText={(text) => {
                            let num = (text == "" ? 0 : Number.parseInt(text.replace(/[^0-9]/g, "0")))
                            if (type == PickerType.MONTH) {
                                if (num > monthLimit) num = monthLimit
                            } else
                                if (num > yearLimit) num = yearLimit
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
            </ScrollView>
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