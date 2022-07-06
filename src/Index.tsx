
// import of react fixes this
// https://github.com/expo/expo/issues/17779
import * as React from 'react';
import { Button, Text, TouchableOpacity, TouchableOpacityBase, useWindowDimensions, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { cStyles } from "./styles/styles"
import LifeAtForm from "./components/LifeAtForm"
import { SavedHistory } from './components/SavedHistory';
import {
    OxygenMono_400Regular,
    useFonts
} from '@expo-google-fonts/oxygen-mono'
import {
    MajorMonoDisplay_400Regular
} from '@expo-google-fonts/major-mono-display'
import PostcodeSearch from './components/PostcodeSearch';
import { useEffect, useState } from 'react';
import { IProperty } from './store/interfaces';
import { AddressPicker } from './components/AddressPicker';
import Mock from './components/ResponseMock'
import { doubleChevron } from './components/Images';
import { EditSave } from './components/EditSave';
import { add, getSelector } from './store/historySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useGetByPostcodeMutation } from './store/streetsAPI';
import { ModalMessage } from './components/Modal';
import { v4 } from "uuid"

export default function Index() {
    let [fontsLoaded] = useFonts({
        OxygenMono_400Regular,
        MajorMonoDisplay_400Regular
    });
    const { width, fontScale } = useWindowDimensions();
    const [yearsInput, setYearsInput] = useState(0)
    const [monthsInput, setMonthsInput] = useState(0)
    const [postcode, setPostcode] = useState("")
    const [streetsArray, setStreetsArray] = useState<IProperty[]>([])
    const [selectedItem, setSelectedItem] = useState<IProperty>()
    const [editAddrLineI, setEditAddrLineI] = useState("")
    const [editAddrLineII, setEditAddrLineII] = useState("")
    const [editCity, setEditCity] = useState("")
    const [editPostcode, setEditPostcode] = useState("")
    const dispatch = useDispatch()
    const savedHistory = useSelector(getSelector)
    const [trigger, { data, error, isLoading, isSuccess }] = useGetByPostcodeMutation()

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("")
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const saveHistory = () => {
        if (editAddrLineI == "" || editCity == "" || editPostcode == "") {
            openModal("Please fill all required (marked with *) fields")
        } else {
            dispatch(add({
                id: v4(),
                years: yearsInput,
                months: monthsInput,
                address: `${editAddrLineI}, ${editAddrLineII ? editAddrLineII + ", " : ""} ${editCity}, ${editPostcode}`
            }))
        }
    }

    const openModal = (reason: string) => {
        setModalText(reason)
        toggleModal()
    }

    useEffect(() => {
        if (isSuccess && data) {
            setStreetsArray(data.data ?? [])
        } else if (error) {
            openModal("Invalid postcode or network error")
        }
    }, [data, error, isLoading, isSuccess])

    useEffect(() => {
        setSelectedItem(undefined)
        setStreetsArray([])
        setYearsInput(0)
        setMonthsInput(0)
    }, [savedHistory])


    useEffect(() => {
        if (selectedItem) {
            setEditAddrLineI(selectedItem.lines.addLine1)
            setEditAddrLineII(selectedItem.lines.addLine2 ?? "")
            setEditCity(selectedItem.lines.addPostTown)
            setEditPostcode(selectedItem.lines.addPostcode)
        } else {
            setEditAddrLineI("")
            setEditAddrLineII("")
            setEditCity("")
            setEditPostcode("")
        }
    }, [selectedItem])

    return (
        <View style={[cStyles(fontScale, width).bg_container]}>
            {isModalVisible && <ModalMessage toggleModal={toggleModal} setModalVisible={setModalVisible} text={modalText} isModalVisible={isModalVisible} />}
            <LinearGradient
                // Background Linear Gradients
                colors={["rgba(91,0,137,0.8)", "rgba(247,0,107,1)"]}
                style={cStyles(fontScale, width).background}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            />

            {fontsLoaded && <View style={cStyles(fontScale, width).content}>
                <Text style={[
                    cStyles(fontScale, width).headline,
                    cStyles(fontScale, width).monohead,
                    cStyles(fontScale, width).white_text,
                    { textAlign: "center" }
                ]}>Address search</Text>
                <Text style={[
                    cStyles(fontScale, width).monotext,
                    cStyles(fontScale, width).undertext,
                    cStyles(fontScale, width).white_text,
                    { textAlign: "center" }
                ]}>Please enter your address</Text>
                <View style={cStyles(fontScale, width).top_line} />
                <SavedHistory
                    data={savedHistory}
                    style={[cStyles(fontScale, width).form]} />
                <LifeAtForm
                    setMonthsInput={setMonthsInput}
                    setYearsInput={setYearsInput}
                    monthsInput={monthsInput}
                    yearsInput={yearsInput}
                    style={[cStyles(fontScale, width).form]} />
                <PostcodeSearch
                    isLoading={isLoading}
                    trigger={trigger}
                    setResult={setStreetsArray}
                    setPostcode={setPostcode}
                    postcode={postcode}
                    style={[cStyles(fontScale, width).form]} />
                {streetsArray.length != 0 &&
                    <AddressPicker
                        isLoading={isLoading}
                        style={[cStyles(fontScale, width).form]}
                        items={streetsArray}
                        setSelectedItem={setSelectedItem} />
                }
                {selectedItem != undefined &&
                    <><View style={[{
                        justifyContent: "center",
                        flex: 1,
                        padding: 15
                    }]}>{doubleChevron}</View>

                        <EditSave
                            style={[cStyles(fontScale, width).form]}
                            setEditAddrLineI={setEditAddrLineI}
                            setEditAddrLineII={setEditAddrLineII}
                            setEditCity={setEditCity}
                            setEditPostcode={setEditPostcode}

                            editAddrLineI={editAddrLineI}
                            editAddrLineII={editAddrLineII}
                            editCity={editCity}
                            editPostcode={editPostcode}
                        />

                        <TouchableOpacity style={[{
                            width: width < 768 ? "45%" : "30%",
                            borderRadius: 30,
                            borderWidth: 1,
                            margin: 15,
                            borderColor: "#ff007f",
                            backgroundColor: "white"
                        }]}
                            onPressOut={saveHistory}>
                            <Text style={[{
                                fontSize: 20 / fontScale,
                                padding: 15,
                                textAlign: "center",
                                color: "#ff007f"
                            }]}>Add address</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>}
        </View >
    )
}

