import { Portal } from "@gorhom/portal";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useWindowDimensions, TextInput, View, StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle, Keyboard } from "react-native"
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

export const YearMonthPicker = (props: INumPicker) => {
    const [visible, setVisible] = useState(false);
    const [updatedPlaceholder, setUpdatedPlaceholed] = useState(`Select ${props.type.toString()}s`)
    const { width, fontScale } = useWindowDimensions();
    const toggleSwitch = () => {
        setVisible(!visible);
    };

    const hintRender = props.type == PickerType.MONTH ?
        <Text style={{ textAlign: "center", color: "white", fontSize: 12 / fontScale }}>
            0 - 12 months
        </Text>
        :
        <Text style={{ textAlign: "center", color: "white", fontSize: 12 / fontScale }}>
            0 - 120 years
        </Text>

    const numFormatter = (text: string) => {
        let num = (text == "" ? 0 : Number.parseInt(text.replace(/[^0-9]/g, "0")))
        if (props.type == PickerType.MONTH) {
            if (num > monthLimit) num = monthLimit
        } else
            if (num > yearLimit) num = yearLimit
        switch (num) {
            case 0: setUpdatedPlaceholed(`> ${props.type}`); break;
            case 1: setUpdatedPlaceholed(`${num} ${props.type}`); break;
            default: setUpdatedPlaceholed(`${num} ${props.type}s`)
        }
        props.setTextInput(num)
    }

    const whichToRender = (visible: boolean) =>
        visible
            ?
            <View style={props.style}>
                <TextInput
                    keyboardType="number-pad"
                    returnKeyType='done'
                    textAlign="center"
                    style={[styles.input, { fontSize: 20 / fontScale }]}
                    onChangeText={numFormatter}
                    value={props.textInput.toString()}
                    onBlur={toggleSwitch}
                    autoFocus={true}
                    maxLength={props.type == PickerType.MONTH ? 2 : 3} />
                {hintRender}
            </View>
            :
            <View style={[props.style]}>
                <TouchableOpacity
                    onPress={toggleSwitch}
                    style={[{
                        borderColor: "white",
                        borderWidth: 1,
                        flexDirection: "row",
                        padding: 15,
                        height: "100%"
                    }]}
                >
                    <Text style={{
                        flex: 1, textAlign: "center", color: "white", fontSize: 15 / fontScale,
                        margin: "auto", paddingRight: 10
                    }}>
                        {updatedPlaceholder}
                    </Text>
                    <View>
                        {chevronDown}
                    </View>
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
