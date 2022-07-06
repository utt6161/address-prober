import React, { useEffect, useRef, useState } from 'react'
import { StyleProp, Text, TouchableOpacity, useWindowDimensions, View, ViewStyle } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { useSelector } from 'react-redux'
import { getAdds } from '../store/historySlice'
import { IProperty } from '../store/interfaces'
import { chevronDown } from './utils/Images'
export const AddressPicker = (props: {
    items: IProperty[],
    setSelectedItem: React.Dispatch<React.SetStateAction<IProperty | undefined>>,
    style: StyleProp<ViewStyle> | StyleProp<ViewStyle>[],
    isLoading: boolean
}) => {
    const adds = useSelector(getAdds)
    const { fontScale } = useWindowDimensions()
    const modalRef = useRef<ModalSelector<IProperty>>(null)
    const openModal = () => {
        modalRef.current?.open()
    }
    const initValueText = "Select your address"

    // add history dirty cleanup
    useEffect(() => {
        modalRef.current?.setState({
            cancelText: "cancel",
            changedItem: undefined,
            initState: undefined,
            modalVisible: false,
            selected: initValueText,
        })
    }, [adds])
    return (
        <View style={[props.style]}>
            <Text style={[{
                color: "white",
                paddingVertical: 10,
                fontSize: 15 / fontScale
            }]}>
                Select your address
            </Text>
            <TouchableOpacity style={[{
                flexDirection: "row",
                justifyContent: "space-between"
            }]}
                onPressOut={() => openModal()}
            >
                <ModalSelector
                    ref={modalRef}
                    disabled={true}
                    style={{
                        flex: 1
                    }}
                    cancelStyle={{
                        borderRadius: 0
                    }}
                    cancelTextStyle={{
                        fontSize: 20 / fontScale,
                    }}
                    initValueTextStyle={{
                        color: "white",
                        fontSize: 20 / fontScale,
                        textAlign: "left",

                    }}
                    optionContainerStyle={{
                        borderRadius: 0
                    }}
                    optionTextStyle={{
                        fontSize: 20 / fontScale,
                        color: "black",
                        paddingBottom: 10,
                        borderBottomColor: "black",
                        borderBottomWidth: 1
                    }}
                    selectedItemTextStyle={{
                        backgroundColor: "black",
                        color: "white",
                        paddingTop: 5
                    }}
                    selectStyle={{
                        borderRadius: 0,
                        borderRightWidth: 0,
                        borderColor: "white"
                    }}
                    selectTextStyle={{
                        fontSize: 20 / fontScale,
                        color: "white",
                        textAlign: "left"
                    }}
                    initValue={initValueText}
                    touchableStyle={{

                    }}
                    data={props.items}
                    keyExtractor={(item: IProperty) => item.pmUDPRN.toString()}
                    labelExtractor={(item: IProperty) => item.addString}
                    onChange={(option) => props.setSelectedItem(option)}>
                </ModalSelector>
                <View style={[{
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderColor: "white",
                    paddingHorizontal: 15
                }]}>
                    {chevronDown}
                </View>
            </TouchableOpacity>
        </View>
    )
}