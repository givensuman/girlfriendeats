import React from 'react'
import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import Wrapper from '../components/Wrapper'
import elenaError from '../assets/elenaError.png'

const Header = styled.h1`
    font-size: 2rem;
    color: white;
`

const SubHeader = styled.h3`
    font-size: 1rem;
    color: white;
    margin: 0 0 2em 0;
`

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <Wrapper>
            <img src={elenaError} alt='Page not found' />
            <Header>
                I'm getting mixed messages!
            </Header>
            <SubHeader>
                That, or the page you've requested doesn't exist...
            </SubHeader>
            <Button
            variant='contained'
            onClick={() => navigate('/')}
            >
                Go back
            </Button>
        </Wrapper>
    )
}

export default NotFound