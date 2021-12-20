import React, { useState } from 'react'
import { Stack, TextField, Button } from '@mui/material'

const Categories = ({ up, down, update }) => {

    const incomplete = "I don't know"
    const complete = 'Ooh, good choice!'
    const [buttonText, setButtonText] = useState(incomplete)
    const [category, setCategory] = useState('')

    return (
        <Stack
        className='animate__animated animate__fadeInRight'
        spacing={2}
        >
            <TextField 
            label='What are you in the mood for?'
            onChange={e => {
                setCategory(e.target.value)
                e.target.value.length > 0 ? 
                    setButtonText(complete) : 
                    setButtonText(incomplete)
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
                    Go Back
                </Button>
                <Button
                variant='contained'
                onClick={() => {
                    update('category', category)
                    up()
                }}
                >
                    {buttonText}
                </Button>
            </Stack>
        </Stack>
    )

}

export default Categories