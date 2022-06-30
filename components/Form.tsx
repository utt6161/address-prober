import * as React from 'react';
import { StyleProp, View, ViewStyle, Text, Image } from "react-native";
import styles from "../styles/styles";
import { Picker, PickerItemProps } from '@react-native-picker/picker';
import { useState } from 'react';

const chevronDown =
    <View style={{ flexGrow: 3, margin: "auto" }}>
        <Image
            source={require("../assets/images/chevron-down.png")}
            style={{ width: 10, height: 5 }} />
    </View>

const selectItemFn = (label: string, value: number) => <Picker.Item
    fontFamily="OxygenMono_400Regular"
    label={label} value={value} />


const yearsRange: React.ReactNode[] =
    [...Array(120).keys()].map(i => i - 1 + 1).map(i => {
        switch (i) {
            case 0: return selectItemFn("Less than a year", i)
            case 1: return selectItemFn(`${i} Year`, i)
            default: return selectItemFn(`${i} Years`, i)
        }
    }
    )
const monthsRange: React.ReactNode[] = [...Array(12).keys()].map(i => i + 1).map(i => {
    switch (i) {
        case 1: return selectItemFn(`${i} Month`, i)
        default: return selectItemFn(`${i} Months`, i)
    }
}
)

const Form = (props: { style: StyleProp<ViewStyle> | StyleProp<ViewStyle>[] }) => {
    const [selectedYears, setSelectedYears] = useState(0);
    const [selectedMonths, setSelectedMonths] = useState(0);
    return <View style={props.style}>
        <View style={styles.lifetime_container}>
            <Picker
                style={[{
                    backgroundColor: "transparent",
                    color: "white",
                }, styles.square_border,
                styles.text_center,
                styles.half_width]}
                itemStyle = {[{
                    backgroundColor: "transparent",
                }]}
                selectedValue={selectedYears}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedYears(itemValue)
                }>
                {yearsRange}
            </Picker>
            <Picker
                style={[{
                    backgroundColor: "rgba(255,255,255,0.2",
                    color: "black",
                }, styles.square_border,
                styles.text_center,
                styles.half_width]}
                selectedValue={selectedMonths}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedMonths(itemValue)
                }>
                {monthsRange}
            </Picker>
        </View>
    </View>
}


export default Form