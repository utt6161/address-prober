import React from "react"
import { StyleProp, View, ViewStyle, Text, ScrollView, useWindowDimensions, TouchableOpacity } from "react-native"
import { trashCan } from "./utils/Images"
import { useDispatch } from 'react-redux';
import { remove } from "../store/historySlice";
import uuid from "react-native-uuid";

// cards with "saved" form submits

export interface ISaved {
    id: string,
    years: number,
    months: number,
    address: string
}

export const SavedHistoryItem = (props: {
    item: ISaved
}) => {
    const dispatch = useDispatch()
    let dateFormat = "uncertain time"
    if (props.item.years == 0 && props.item.months == 0) {
        dateFormat = "less than a month"
    } else if (props.item.years != 0 && props.item.months != 0) {
        dateFormat = `${props.item.years} years ${props.item.months} months`
    } else if (props.item.years == 0 && props.item.months != 0) {
        dateFormat = `${props.item.months} months`
    } else {
        dateFormat = `${props.item.years} years`
    }
    const { fontScale } = useWindowDimensions()
    return (
        <View style={[
            {
                marginBottom: 10, flex: 1, borderWidth: 1, borderColor: "white", backgroundColor: "rgba(159, 90, 253, 0.3)",
                flexDirection: "row", justifyContent: "space-between"
            }
        ]}>
            <View style={[{
                flexDirection: "column",
            }]}>
                <Text style={[{ padding: 5, fontSize: 15 / fontScale, color: "white" }]}>
                    {props.item.address}
                </Text>
                <Text style={[{ padding: 5, fontSize: 15 / fontScale, color: "white" }]}>
                    Time at address: {dateFormat}
                </Text>
            </View>
            <TouchableOpacity style={[{
                flex: 1
            }]}
                onPressOut={() => dispatch(remove(props.item.id))}>
                {trashCan}
            </TouchableOpacity>
        </View>
    )
}


export const SavedHistory = (props: {
    style: StyleProp<ViewStyle> | StyleProp<ViewStyle>[],
    data: ISaved[]
}) => {
    const historyToRender = props.data.map((value, index) =>
        <SavedHistoryItem key={uuid.v4().toString()} item={value} />
    )
    return (
        <ScrollView style={props.style}>
            {historyToRender}
        </ScrollView>
    )
}