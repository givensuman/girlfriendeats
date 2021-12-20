import React, { useState } from 'react'
import { Stack, Slider, Button } from '@mui/material'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const Label = styled.span`

`

const Filters = ({ down, update, data }) => {

    const [distance, setDistance] = useState(5)
    const [price, setPrice] = useState(1)
    const [buttonText, setButtonText] = useState("Let's eat!")
    const navigate = useNavigate()

    return (
        <Stack
        className='animate__animated animate__fadeInRight'
        spacing={2}
        >
            <Label>How many miles are you willing to go?</Label>
            <Slider 
            defaultValue={5}
            valueLabelDisplay='auto'
            label='asd'
            min={1}
            max={20}
            onChange={e => setDistance(e.target.value)}
            />
            <Label>What's the most you want to spend?</Label>
            <Slider 
            defaultlValue={2}
            valueLabelDisplay='auto'
            valueLabelFormat={value => '$'.repeat(value)}
            step={1}
            min={1}
            max={4}
            marks
            onChange={e => {
                setPrice(e.target.value)
                e.target.value > 2 ? 
                setButtonText('Damn okay you bougie') : 
                setButtonText("Let's eat!")
            }}
            />
            <Stack
            direction='row'
            spacing={1}
            justifyContent='center'
            alignItems='center'
            >
                <Button
                variant='outlined'
                    onClick={() => down()}
                >
                    Go back
                </Button>
                <Button
                variant='contained'
                onClick={() => {
                    update('distance', distance)
                    update('price', price)
                    navigate(`/results?zip=${data.zip}&cat=${data.category}&dist=${data.distance}&price=${data.price}`)
                }}
                >
                    {buttonText}
                </Button>
            </Stack>
        </Stack>
    )
}

export default Filters