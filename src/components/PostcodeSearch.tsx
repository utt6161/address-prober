import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query/react"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import React from "react"
import { StyleProp, Text, TextInput, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native"
import { IApiResponse, IProperty } from "../store/interfaces"
import { magnifyingGlass } from "./utils/Images"

const PostcodeSearch = (props: {
    style: StyleProp<ViewStyle> | StyleProp<ViewStyle>[],
    setPostcode: React.Dispatch<React.SetStateAction<string>>,
    setResult: React.Dispatch<React.SetStateAction<IProperty[]>>
    postcode: string,
    isLoading: boolean,
    trigger: MutationTrigger<MutationDefinition<string, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, IApiResponse, "streetsApi">>
}) => {
    const { fontScale } = useWindowDimensions();
    return (
        <View style={[props.style]} pointerEvents={props.isLoading ? 'none' : 'auto'}>

            <Text style={[{
                color: "white",
                paddingVertical: 10,
                fontSize: 15 / fontScale
            }]}>
                Postcode Search
            </Text>
            <View style={[{
                borderColor: "white",
                borderWidth: 1,
                flexDirection: "row",
            }]}>

                <TextInput
                    style={[{
                        flex: 1, padding: 10, borderWidth: 0, fontSize: 20 / fontScale, color: "white",
                        backgroundColor: props.isLoading ? "rgba(108, 122, 137, 0.3)" : "transparent"
                    }]}
                    keyboardType="default"
                    returnKeyType='done'
                    textAlign="left"
                    placeholder="Enter postcode"
                    placeholderTextColor={"#D8D8D8"}
                    value={props.postcode}
                    maxLength={10}
                    onChangeText={(text) => props.setPostcode(text)} />
                <TouchableOpacity style={{
                    borderColor: "white",
                    backgroundColor: props.isLoading ? "rgba(108, 122, 137, 0.3)" : "transparent"
                }}
                    onPressOut={() => props.trigger(props.postcode)}>
                    {magnifyingGlass}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostcodeSearch