import { View, Image } from "react-native"

// helper thingies to import images

export const chevronDown =
    <View style={[{ marginTop: "auto", marginBottom: "auto" }]}>
        <Image style={{ width: 15, height: 10 }}
            source={require("../../assets/images/chevron-down.png")} />
    </View>


export const magnifyingGlass =
    <View style={[{ marginTop: "auto", marginBottom: "auto" }]}>
        <Image
            source={require("../../assets/images/magnifying-glass.png")}
            style={{ width: 15, height: 15, margin: 15 }} />
    </View>


export const doubleChevron = <View style={[{ marginTop: "auto", marginBottom: "auto" }]}>
    <Image
        source={require("../../assets/images/double-chevron.png")}
        style={{ width: 15, height: 20 }} />
</View>


export const trashCan = <View style={[{ marginTop: "auto", marginBottom: "auto" }]}>
    <Image
        source={require("../../assets/images/delete.png")}
        style={{ width: 15, height: 20 }} />
</View>