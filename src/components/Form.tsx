import React, { createContext, useState } from "react"

import { TheDetails, TheFood, ThePlace } from "./FormPanels"

import { 
    Box,
    Tabs, Tab,
    Typography,
} from "@mui/material"

import elena from "../assets/elena.png"

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

    return (
        <DataContext.Provider value={data}>
        <FormControlsContext.Provider value={{
            currentIndex: currentIndex,
            incrementIndex: incrementIndex,
            handleInputChange: handleInputChange,
            getCurrentLocation: getCurrentLocation,
            toggleCoordinatesShouldBeUsed: toggleCoordinatesShouldBeUsed,
            handlePriceInputChange: handlePriceInputChange
        }}>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Typography 
                variant="h2"
                mb={1}
                display="flex"
                component="div"

            >
                girlfriend
                <Typography
                    color="secondary"
                    variant="h2"
                    component="div"              
                >
                    eats
                </Typography>
            </Typography>
            <Box
                bgcolor="background.paper"
                display="flex"
                flexGrow={1}
                height={250}
                width={400}
                sx={(theme) => ({
                    boxShadow: theme.shadows[10],
                    borderRadius: theme.shape.borderRadius/4
                })}
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
                <Box p={3} width="90%">
                    <TheFood />
                    <ThePlace />
                    <TheDetails />
                </Box>
            </Box>
        </Box>
        </FormControlsContext.Provider>
        </DataContext.Provider>
    )
}