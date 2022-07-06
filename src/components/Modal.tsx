import React, { useState } from "react";
import { Button, Text, TouchableOpacity, TouchableOpacityBase, useWindowDimensions, View } from "react-native";
import Modal from "react-native-modal";
import { cStyles } from "../styles/styles";

export const ModalMessage = (props: {
    isModalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    toggleModal: () => void
    text: string
}) => {
    const { width, fontScale } = useWindowDimensions()

    return (
        <Modal style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]} isVisible={props.isModalVisible} deviceWidth={width}>
            <View style={{ flex: 1 }}>
                <View style={[{ margin: "auto", backgroundColor: "black" }, cStyles(fontScale, width).form]}>
                    <Text style={{
                        color: "white", fontSize: 25 / fontScale, padding: 10,
                        borderBottomColor: "white", borderBottomWidth: 1
                    }}>{props.text}</Text>

                    <TouchableOpacity
                        onPressOut={() => props.toggleModal()}>
                        <Text style={{
                            color: "white",
                            fontSize: 20 / fontScale,
                            padding: 20,
                            textAlign: "center"
                        }}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}