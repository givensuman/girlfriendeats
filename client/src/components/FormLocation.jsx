import React, { useState } from 'react'
import { Stack, TextField, Button } from '@mui/material'

const Location = ({ up, update }) => {

    const incomplete = '. . .'
    const complete = 'Sweet area code, babe'
    const [buttonText, setButtonText] = useState(incomplete)
    const [zipCode, setZipCode] = useState(null)
    
    return (
        <Stack 
        className='animate__animated animate__fadeInRight'
        spacing={2}
        >
            <TextField
            label="Where you at?"
            helperText="A zip code, city, or address will work"
            onChange={e => {
                setZipCode(e.target.value)
                e.target.value.length >= 1 ?
                    setButtonText(complete) :
                    setButtonText(incomplete)
            }}
            />
            <Button
            disabled={buttonText === incomplete ? true : false}
            variant='contained'
            onClick={() => {
                update('zip', zipCode)
                up()
            }}
            >
                {buttonText}
            </Button>
        </Stack>
    )
}

export default Location