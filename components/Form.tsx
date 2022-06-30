import { StyleProp, View, ViewStyle, Text } from "react-native";
import styles from "../styles/styles";

const Form = (props: { style: StyleProp<ViewStyle> | StyleProp<ViewStyle>[] }) =>
    <View style={props.style}>

        <View style={styles.lifetime_container}>
            <View style={[styles.square_border]}>
                <Text style={[
                    styles.white_text,
                    styles.form_input_text,
                    { "marginRight": "0.7em" }
                ]}>Years</Text>
            </View>
            <View style={[styles.square_border]}>
                <Text style={[
                    styles.white_text,
                    styles.form_input_text
                ]}>Months</Text>
            </View>
        </View>
    </View>

export default Form