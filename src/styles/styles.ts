import { StyleSheet, Dimensions } from "react-native"


// styles that are shared
export const cStyles = (fontScale: number, width: number) => StyleSheet.create({
    form_input_text: {
        fontSize: 11 / fontScale,
        paddingVertical: "0.6"
    },
    form: {
        width: width < 768 ? "100%" : "85%",
        paddingHorizontal: 15
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
    headline: {
        fontSize: width < 768 ? 30 / fontScale : 40 / fontScale,
    },
    undertext: {
        fontSize: width < 768 ? 15 / fontScale : 15 / fontScale,
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
        paddingTop: 1,
        marginTop: 10,
        borderTopColor: "rgba(255, 255, 255, 0.35)",
        borderTopWidth: 2
    }

});


export const borderStyle = StyleSheet.create({
    removeBorder: {
        borderWidth: 0
    }
})