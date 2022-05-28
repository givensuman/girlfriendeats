import Link from 'next/link'

import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import styled from '@emotion/styled'

import elenaError from '../assets/elenaError.png'

const Image = styled.img`
    z-index: 2;
    position: relative;
    top: 5px;
`

const Card = styled(Paper)`
    z-index: 2;
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Error = ({ message, buttonMessage }: 
    { message: string, buttonMessage: string }) => {
    return (
        <>
        <Image 
            src={elenaError.src}
            alt="Error"
        />
        <Card>
            <Typography variant="h3" sx={{ marginBottom: '0.25em' }}>
                {message}
            </Typography>
            <Link href='/'>
                <Button size="large" variant="contained">
                    {buttonMessage}
                </Button>
            </Link>
        </Card>
        </>
    )
}

export default Error