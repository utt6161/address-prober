import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useWindowDimensions, TextInput, View, StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle, Keyboard } from "react-native"
import { useSelector } from "react-redux";
import { getAdds } from "../../store/historySlice";
import { chevronDown } from "../utils/Images";

// const strToNum = (textInput: string): number =>
//     Number.parseInt(textInput.replace(/[^0-9]/g, ""))

export enum PickerType {
    MONTH = "Month",
    YEAR = "Year"
}

interface INumPicker {
    type: PickerType.MONTH | PickerType.YEAR,
    setTextInput: Dispatch<SetStateAction<string>>,
    textInput: string,
    style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[] | {}
}

const yearLimit = 120
const monthLimit = 12

export const YearMonthPicker = (props: INumPicker) => {
    const [visible, setVisible] = useState(false);
    const [updatedPlaceholder, setUpdatedPlaceholed] = useState(`Select ${props.type.toString()}s`)
    const { width, fontScale } = useWindowDimensions();
    const adds = useSelector(getAdds)
    const toggleSwitch = () => {
        setVisible(!visible);
    };


    // part of historyAdd cleanup process
    useEffect(() => {
        setUpdatedPlaceholed(`Select ${props.type.toLowerCase()}s`)
    }, [adds])

    const hintRender = props.type == PickerType.MONTH ?
        <Text style={{ textAlign: "center", color: "white", fontSize: 12 / fontScale }}>
            0 - 12 months
        </Text>
        :
        <Text style={{ textAlign: "center", color: "white", fontSize: 12 / fontScale }}>
            0 - 120 years
        </Text>

    const numFormatter = (text: string) => {
        if (text == "") {
            setUpdatedPlaceholed(`Select ${props.type.toLowerCase()}s`)
            props.setTextInput(text)
            return
        }
        let num = Number.parseInt(text.replace(/[^0-9]/g, "0"))
        if (props.type == PickerType.MONTH) {
            if (num > monthLimit) num = monthLimit
        } else
            if (num > yearLimit) num = yearLimit
        switch (num) {
            case 0: setUpdatedPlaceholed(`> ${props.type}`); break;
            case 1: setUpdatedPlaceholed(`${num} ${props.type}`); break;
            default: setUpdatedPlaceholed(`${num} ${props.type}s`)
        }
        props.setTextInput(num.toString())
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
                    onChangeText={(text) => {
                        console.log(text)
                        numFormatter(text)
                    }}
                    value={props.textInput != undefined ? props.textInput.toString() : ""}
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
                        padding: 15
                    }]}
                >
                    <Text style={{
                        textAlign: "center", color: "white", fontSize: 15 / fontScale,
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
