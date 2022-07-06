import { StyleSheet, Dimensions } from "react-native"


// styles that are computed
// the best i could think of without spending
// a week writing my own bootstrap and such
export const cStyles = (fontScale: number, width: number) => StyleSheet.create({
    form: {
        width: width < 768 ? "100%" : "85%",
        paddingHorizontal: 15
    },
    headline: {
        fontSize: width < 768 ? 30 / fontScale : 40 / fontScale,
    },
    undertext: {
        fontSize: width < 768 ? 15 / fontScale : 15 / fontScale,
    }

});

// most of the styles are inlined due to inconsistency of usage.
// gotta think of the better way of organizing the styles.
// probably figuring out the layout and such before hand is the best idea, yet i didnt follow.
// so called ТЗ didn't have any PS images to measure things
// and be clear, so yeah.

export const sharedStyles = StyleSheet.create({
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
    },
    lifetime_container: {
        flexGrow: 100,
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: "space-around"
    },
})