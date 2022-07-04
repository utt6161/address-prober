import { View, Image } from "react-native"

export const chevronDown =
    <View style = {[{marginTop: "auto", marginBottom: "auto"}]}>
        <Image
            source={require("../assets/images/chevron-down.png")}
            style={{ width: 15, height: 10 }} />
    </View>