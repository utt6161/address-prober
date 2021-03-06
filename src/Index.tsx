
// import of react fixes this
// https://github.com/expo/expo/issues/17779
import {
    MajorMonoDisplay_400Regular
} from '@expo-google-fonts/major-mono-display';
import {
    OxygenMono_400Regular,
    useFonts
} from '@expo-google-fonts/oxygen-mono';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import { AddressPicker } from './components/AddressPicker';
import { EditSave } from './components/EditSave';
import { doubleChevron } from './components/utils/Images';
import LifeAtForm from "./components/lifetime/LifeAtForm";
import { ModalMessage } from './components/Modal';
import PostcodeSearch from './components/PostcodeSearch';
import Mock from './components/ResponseMock';
import { SavedHistory } from './components/SavedHistory';
import { add, getAdds, getSelector } from './store/historySlice';
import { IProperty } from './store/interfaces';
import { useGetByPostcodeMutation } from './store/streetsAPI';
import { cStyles, sharedStyles } from "./styles/styles";

export default function Index() {
    let [fontsLoaded] = useFonts({
        OxygenMono_400Regular,
        MajorMonoDisplay_400Regular
    });

    // i hate that there is a lot of them
    // but thats how things are when you lift the state up
    // didnt want to do the same mistake with my previous
    // redux apps where flow of state was so convoluted
    // it was hard to guess what exactly is going on

    // i think it is still better than before tho

    const { width, fontScale } = useWindowDimensions();
    const [yearsInput, setYearsInput] = useState<string>("")
    const [monthsInput, setMonthsInput] = useState<string>("")
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

    // gets incremented when we add another history save
    const adds = useSelector(getAdds)

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("")
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // trigger validation on form submit
    const saveHistory = () => {
        if (editAddrLineI == "" || editCity == "" || editPostcode == "") {
            openModal("Please fill all required (marked with *) fields")
        } else {
            dispatch(add({
                id: uuid.v4().toString(),
                years: yearsInput == "" ? 0 : Number.parseInt(yearsInput),
                months: monthsInput == "" ? 0 : Number.parseInt(monthsInput),
                address: `${editAddrLineI}, ${editAddrLineII ? editAddrLineII + ", " : ""} ${editCity}, ${editPostcode}`
            }))
        }
    }

    const openModal = (reason: string) => {
        setModalText(reason)
        toggleModal()
    }

    // trigger checks once data is fetched
    useEffect(() => {
        if (isSuccess && data) {
            setStreetsArray(data.data ?? [])
        } else if (error) {
            openModal("Invalid postcode or network error")
        }
    }, [data, error, isLoading, isSuccess])

    // the moment adds is incremented
    // we clean everything up
    useEffect(() => {
        setSelectedItem(undefined)
        setPostcode("")
        setStreetsArray([])
        setYearsInput("")
        setMonthsInput("")
    }, [adds])


    // not only gets triggered from cleanup above
    // to restore other bunch of fields
    // but as well when we select something
    // in address picker to fill
    // four inputs at the bottom

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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {isModalVisible && <ModalMessage toggleModal={toggleModal} setModalVisible={setModalVisible} text={modalText} isModalVisible={isModalVisible} />}
            <LinearGradient
                // Background Linear Gradients
                colors={["rgba(91,0,137,0.8)", "rgba(247,0,107,1)"]}
                style={sharedStyles.background}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            />
            <SafeAreaView>
                {fontsLoaded && <View style={sharedStyles.content}>

                    <Text style={[
                        cStyles(fontScale, width).headline,
                        { textAlign: "center", color: "white", fontFamily: "MajorMonoDisplay_400Regular" }
                    ]}>Address search</Text>

                    <Text style={[
                        cStyles(fontScale, width).undertext,
                        { textAlign: "center", color: "white", fontFamily: "OxygenMono_400Regular" }
                    ]}>Please enter your address</Text>

                    <View style={[cStyles(fontScale, width).form, sharedStyles.top_line, {
                        padding: 5
                    }]} />

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
                        // instad of streetsArray "Mock" obj can be used
                        <AddressPicker
                            isLoading={isLoading}
                            style={[cStyles(fontScale, width).form]}
                            items={streetsArray}
                            setSelectedItem={setSelectedItem} />
                    }

                    {selectedItem != undefined &&
                        // display 4 fields once street from selector
                        // is picked

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
            </SafeAreaView>
        </ScrollView >
    )
}

