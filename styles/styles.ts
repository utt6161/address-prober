import { StyleSheet } from "react-native"

export default StyleSheet.create({
    form_input_text: {
        fontSize: 11,
        paddingVertical: "0.6em"
    },
    white_text: {
        color: "white"
    },
    text_center: {
        textAlign: "center",
        textAlignVertical: "center"
    },
    square_border: {
        borderWidth: 1,
        borderColor: "white",
    },
    half_width: {
        width: "50%"
    },
    full_width: {
        width: "100%"
    },
    lifetime_container: {
        flexGrow: 100,
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: "space-around"
    },
    monohead: {
        fontFamily: "MajorMonoDisplay_400Regular"
    },
    monotext: {
        fontFamily: "OxygenMono_400Regular"
    },
    form: {
        width: "65%"
    },
    headline: {
        fontSize: 25,
    },
    bg_container: {
        flex: 1,
    },
    content: {
        paddingTop: "10%",
        alignItems: "center"
    },
    background: {
        position: 'absolute',
        zIndex: -1,
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    top_line: {
        paddingTop: "1em",
        marginTop: "1em",
        borderTopColor: "rgba(255, 255, 255, 0.35)",
        borderTopWidth: 2
    }
});