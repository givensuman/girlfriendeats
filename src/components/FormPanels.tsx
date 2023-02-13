import React, { useContext, useState } from "react"

import { DataContext, FormControlsContext, isLengthy } from "./Form"
import { type DataType } from "./Form"

import Link from "next/link"

import {
    Stack, Box,
    Button, IconButton,
    TextField,
    Tooltip,
    Typography,
    Slider,
    CircularProgress
} from "@mui/material"
import { type StackProps } from "@mui/material";
import { ArrowForward, MyLocation } from "@mui/icons-material";

function createDataLink(data: DataType) {
    if (data.coordinates.shouldBeUsed) {
        return `/search?for=${data.category}&coords=${data.coordinates.latitude},${data.coordinates.longitude}&within=${data.range}&costing=${data.price}`
    }
    
    return `/search?for=${data.category}&near=${data.location}&within=${data.range}&costing=${data.price}`
}

export function TheFood() {

    const data = useContext(DataContext)
    const {
        currentIndex, handleInputChange, incrementIndex
    } = useContext(FormControlsContext)

    return (
        <TabPanel
            value={currentIndex}
            index={0}
        >
                <TextField
                    variant="outlined"
                    label="What are you hungry for?"
                    helperText="Pho, boba, french fries, etc."
                    onChange={e => handleInputChange("category", e)}
                    value={data.category}
                />
                <Button
                    variant="contained"
                    onClick={incrementIndex}
                    disabled={!isLengthy(data.category)}
                >
                    {isLengthy(data.category)
                    ? "Ooh, good choice!"
                    : "Uhhhh..."}
                </Button>
        </TabPanel>
    )
}

export function ThePlace() {

    const data = useContext(DataContext)
    const {
        currentIndex, handleInputChange, incrementIndex, getCurrentLocation, toggleCoordinatesShouldBeUsed
    } = useContext(FormControlsContext)

    const [ isAwaiting, setIsAwaiting ] = useState(false)
    const [ permissionsAccepted, setPermissionsAccepted ] = useState(false)
    const [ permissionsDenied, setPermissionsDenied ] = useState(false)

    const handleUseMyLocation = async () => { 
        await navigator.permissions.query({
            name: "geolocation"
        }).then(({ state }) => {
            if (state === "prompt") {
                setIsAwaiting(true)
            }
        })

        getCurrentLocation(
            () => {
                setIsAwaiting(false)
                setPermissionsAccepted(true)
                setPermissionsDenied(false)
                incrementIndex()
            }, 
            err => {
                console.error("Error getting your location!", err)
                setIsAwaiting(false)
                setPermissionsAccepted(false)
                setPermissionsDenied(true)
            }
        )
    }

    if (data.coordinates.shouldBeUsed && permissionsAccepted) return (
        <TabPanel
            value={currentIndex}
            index={1}
        >
           <Typography 
                variant="h5"
                color="GrayText"
            >
                Location found!
            </Typography>
            <Button
                variant="outlined"
                onClick={() => toggleCoordinatesShouldBeUsed(false)}
            >
                Enter location manually
            </Button>
        </TabPanel>
    )

    return (
        <TabPanel
            value={currentIndex}
            index={1}
        >
            <TextField
                variant="outlined"
                label="Where you at girl?"
                helperText="A zip code, city, or address will work"
                onChange={e => handleInputChange("location", e)}
                value={data.location}
            />
            
            {isLengthy(data.location)
                ? <Button
                    variant="contained"
                    onClick={incrementIndex}
                >
                    Sweet area code, babe
                </Button>
                : <Button
                    variant="outlined"
                    onClick={handleUseMyLocation}
                    startIcon={!isAwaiting && <MyLocation />}
                    disabled={permissionsDenied || isAwaiting}
                >
                    {isAwaiting && <CircularProgress size={25} />}
                    {!isAwaiting && (
                        permissionsDenied
                            ? "Location services denied"
                            : "Use my location"
                        )
                    }
                </Button>
            }
        </TabPanel>
    )
}

export function TheDetails() {

    const data = useContext(DataContext)
    const {
        currentIndex, handleInputChange
    } = useContext(FormControlsContext)

    return (
        <TabPanel
            value={currentIndex}
            index={2}
        >
            <Stack>
                <Typography>How far should I look?</Typography>
                <Slider
                    value={data.range}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => `${value} miles`}
                    min={1}
                    max={20}
                    onChange={(e) => handleInputChange("range", e)}
                />
            </Stack>
            <Stack>
                <Typography>How much will this cost?</Typography>
                <Slider
                    value={data.price}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => "$".repeat(value)}
                    step={1}
                    min={1}
                    max={4}
                    marks
                    onChange={e => handleInputChange("price", e)}
                />
            </Stack>
                <Button variant="contained">
                    <Link href={createDataLink(data)}>
                        {data.price < 3
                        ? "View results"
                        : "Damn okay she bougie"}
                    </Link>
                </Button>
        </TabPanel>
    )
}

export function TabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
} & StackProps) {
    const { children, value, index, ...other } = props

    const data = useContext(DataContext)
    
    const resultsAreAccessible = 
        (isLengthy(data.category) && (
            isLengthy(data.location) || data.coordinates.shouldBeUsed
        ))

    return (
      <Stack
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}

        spacing={2}
        pr={resultsAreAccessible ? 2 : ""}
        position="relative"
        
        {...other}
      >
        {value === index && 
            <>
                {children}        
                {resultsAreAccessible &&
                    <Link href={createDataLink(data)}>
                        <Box
                            position="absolute"
                            left="100%"
                            top="25%"
                            bgcolor="background.paper"
                            borderRadius="50%"
                            sx={{
                                border: 1,
                                borderColor: "divider"
                            }}
                        >
                            <Tooltip 
                                title="View Results"
                                placement="right"
                            >
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Link>
                }
            </>
        }
      </Stack>
    );
}