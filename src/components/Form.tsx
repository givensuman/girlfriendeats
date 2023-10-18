import React, { createContext, useState } from "react"

import { TheDetails, TheFood, ThePlace } from "./FormPanels"

import { 
    Box,
    Tabs, Tab,
    Typography,
} from "@mui/material"

import elena from "../assets/elena.png"
import elenaError from "../assets/elenaError.png"

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const initialData = {
    category: "",
    location: "",
    coordinates: {
        latitude: "",
        longitude: "",
        shouldBeUsed: false
    },
    range: 5, 
    price: [1, 2]
}
export type DataType = typeof initialData

export const DataContext = createContext(initialData)

export const FormControlsContext = createContext<Partial<{
    currentIndex: number,
    incrementIndex: () => void,
    handleInputChange: (category: keyof DataType, e: React.SyntheticEvent<EventTarget> | Event) => void,
    getCurrentLocation: (
        successCallback?: (position?: GeolocationPosition) => void,
        errorCallback?: PositionErrorCallback
    ) => void,
    toggleCoordinatesShouldBeUsed: (switchTo?: boolean) => void,
    handlePriceInputChange: (event: Event, newValue: number | number[]) => void
}>>({})

export function isLengthy(...args: string[]) {
    const boolMap = args.map(dataValue => {
        if (dataValue && dataValue.length > 0) {
            return true
        }
        return false
    })
    return !boolMap.includes(false)
}

export default function Form() {

    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [ data, setData ] = useState(initialData)

    const handleInputChange = (category: keyof DataType, e: React.SyntheticEvent<EventTarget> | Event) => {
        setData(state => ({
            ...state,
            [category]: (e.target as HTMLInputElement).value
        }))
    }
    const handlePriceInputChange = (event: Event, newValue: number | number[]) => {
        setData(state => ({
            ...state,
            price: newValue as number[]
        }))
    }

    const handleTabChange = (e: React.SyntheticEvent, newIndex: number) => {
        setCurrentIndex(newIndex)
    }

    const incrementIndex = () => { setCurrentIndex(state => state + 1) }

    const getCurrentLocation = (
        successCallback?: (position?: GeolocationPosition) => void,
        errorCallback?: PositionErrorCallback
    ) => {
        navigator.geolocation.getCurrentPosition(position => {
            setData(state => ({
                ...state,
                coordinates: {
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString(),
                    shouldBeUsed: true
                }
            }))
            successCallback && successCallback(position)
        }, errorCallback)
    }

    const toggleCoordinatesShouldBeUsed = (switchTo?: boolean) => {
        setData(state => ({
            ...state,
            coordinates: {
                ...state.coordinates,
                shouldBeUsed: switchTo ?? !state.coordinates.shouldBeUsed
            }
        }))
    }

    const [ elenaSrc, setElenaSrc ] = useState(elena.src)

    const toggleElenaSrc = () => {
        setElenaSrc(elenaError.src)
        setTimeout(() => setElenaSrc(elena.src), 200)
    }

    return (
        <DataContext.Provider value={data}>
        <FormControlsContext.Provider value={{
            currentIndex,
            incrementIndex,
            handleInputChange,
            getCurrentLocation,
            toggleCoordinatesShouldBeUsed,
            handlePriceInputChange
        }}>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <img
                src={elenaSrc}
                alt="Elena"
                onClick={toggleElenaSrc}
                style={{
                    maxHeight: 80,
                    marginLeft: "50%",
                    cursor: "pointer"
                }}
            />
            <Box
                bgcolor="background.paper"
                display="flex"
                flexDirection="column"
                width={500}
                maxWidth="90vw"
                sx={(theme) => ({
                    boxShadow: theme.shadows[10],
                    borderRadius: theme.shape.borderRadius/4
                })}
            >
                <Box
                    p={2}
                    display="flex"
                    justifyContent="center"
                    borderBottom={1}
                    borderColor="#DCD0FF"
                >
                    <Typography 
                        variant="h4"
                        display="flex"
                        component="div"
                        style={{
                            fontSize: "min(15vw, 3rem)"
                        }}
                    >
                        girlfriend
                        <Typography
                            variant="h4"
                            color="secondary"
                            component="div"
                            style={{
                                fontSize: "min(15vw, 3rem)"
                            }}              
                        >
                            eats
                        </Typography>
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexGrow={1}
                >
                    <Tabs
                        value={currentIndex}
                        orientation="vertical"
                        sx={{
                            borderRight: 1,
                            borderColor: "divider"
                        }}
                        onChange={handleTabChange}
                    >
                        <Tab 
                            label="The food" 
                            {...a11yProps(0)}
                        />
                        <Tab 
                            label="The place"
                            disabled={!isLengthy(data.category)} 
                            {...a11yProps(1)}
                        />
                        <Tab 
                            label="The details" 
                            disabled={
                                !isLengthy(data.category) 
                                || (!isLengthy(data.location) && !isLengthy(data.coordinates.longitude, data.coordinates.latitude))
                            }
                            {...a11yProps(2)}
                        />
                    </Tabs>
                    <Box 
                        width="90%"
                        p={3} 
                        minHeight="fit-content"
                        position="relative"
                        paddingBottom={4}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        flexGrow={2}
                    >
                        <div>
                            <TheFood />
                            <ThePlace />
                            <TheDetails />
                        </div>
                        <Box
                            display="flex"
                            justifyContent="center"
                        >
                            <Typography 
                                color="GrayText"
                                fontSize={16}
                                mt={2}
                            >
                                Made with 💜 for my girlfriend
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </FormControlsContext.Provider>
        </DataContext.Provider>
    )
}