import * as React from 'react';
import { StyleProp, View, ViewStyle, Text, Image, useWindowDimensions } from "react-native";
import { PickerType, YearMonthPicker } from "./YearMonthPicker"
import { sharedStyles } from '../../styles/styles';


// form that conitains inputs for years and months
const LifeAtForm = (props: {
    style: StyleProp<ViewStyle> | StyleProp<ViewStyle>[],
    setYearsInput: React.Dispatch<React.SetStateAction<string>>,
    yearsInput: string,
    setMonthsInput: React.Dispatch<React.SetStateAction<string>>,
    monthsInput: string,
}) => {
    const { fontScale } = useWindowDimensions();
    return <View style={props.style}>
        <View>
            <Text
                style={{ fontSize: 15 / fontScale, paddingVertical: 10, color: "white" }}
            >How long have you lived at your currrent address?</Text>
            <View style={sharedStyles.lifetime_container}>
                <YearMonthPicker style={{ flex: 1, marginRight: 5 }}
                    type={PickerType.YEAR} textInput={props.yearsInput} setTextInput={props.setYearsInput} />
                <YearMonthPicker style={{ flex: 1, marginLeft: 5 }}
                    type={PickerType.MONTH} textInput={props.monthsInput} setTextInput={props.setMonthsInput} />
            </View>
        </View>
    </View >
}


export default LifeAtForm