import React from "react"
import { Text, StyleProp, TextInput, useWindowDimensions, View, ViewStyle } from "react-native"

// four fields that are filled the moment address is picked

export const EditSave = (props: {
    style: StyleProp<ViewStyle> | StyleProp<ViewStyle>[],
    setEditAddrLineI: React.Dispatch<React.SetStateAction<string>>,
    setEditAddrLineII: React.Dispatch<React.SetStateAction<string>>,
    setEditCity: React.Dispatch<React.SetStateAction<string>>,
    setEditPostcode: React.Dispatch<React.SetStateAction<string>>,
    editAddrLineI: string,
    editAddrLineII: string,
    editCity: string,
    editPostcode: string,
}) => {
    const { fontScale } = useWindowDimensions()

    const headline = (headline: string) => <View style={[{
    }]}>
        <Text style={{
            fontSize: 15 / fontScale,
            color: "white",
            paddingVertical: 10
        }} >
            {headline}</Text>
    </View>

    const input = (value: string,
        setter: React.Dispatch<React.SetStateAction<string>>) =>
        <TextInput
            style={[{ flex: 1, padding: 10, borderWidth: 1, borderColor: "white", fontSize: 20 / fontScale, color: "white" }]}
            keyboardType="default"
            returnKeyType='done'
            textAlign="left"
            placeholder={"..."}
            placeholderTextColor={"#D8D8D8"}
            value={value}
            maxLength={10}
            onChangeText={(text) => setter(text)} />

    return (
        <View style={props.style}>
            {headline("Address Line 1*")}
            {input(props.editAddrLineI, props.setEditAddrLineI)}
            {headline("Address Line 2")}
            {input(props.editAddrLineII, props.setEditAddrLineII)}
            {headline("City*")}
            {input(props.editCity, props.setEditCity)}
            {headline("Postcode*")}
            {input(props.editPostcode, props.setEditPostcode)}


        </View >
    )
}