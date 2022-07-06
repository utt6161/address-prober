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
        <View style={{
            position: 'absolute',
            zIndex: -1,
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
        }}>

            <Modal style={{ margin: 0 }} isVisible={props.isModalVisible} deviceWidth={width}>
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
        </View>
    );
}