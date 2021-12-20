import React, { cloneElement, useState } from 'react'
import { Card as MUICard} from '@mui/material'
import styled from '@emotion/styled'

import FormLocation from '../components/FormLocation'
import FormCategories from '../components/FormCategories'
import FormFilters from '../components/FormFilters'
import Wrapper from '../components/Wrapper'
import elena from '../assets/elena.png'
import elenaError from '../assets/elenaError.png'

const Card = styled(MUICard)`
    max-width: 95%;
    padding: 0 2em 2em;
`

const Header = styled.h1`
    font-size: clamp(1.5em, 10vw, 3em);
`

const Image = styled.img`
    height: 50px;
    position: relative;
    left: 2em;
    cursor: pointer;
`

const Main = () => {

    const [index, setIndex] = useState(0)
    const [data, setData] = useState({
        'zip': '',
        'category': '',
        'distance': '',
        'price': ''
    })
    const [imageSource, setImageSource] = useState(elena)

    const formComponents = [
        <FormLocation />,
        <FormCategories />,
        <FormFilters data={data} />
    ]

    return (
        <Wrapper> 
        <Image 
        src={imageSource} 
        alt='Elena' 
        onClick={() => {
            setImageSource(elenaError)
            setTimeout(() => setImageSource(elena), 200)
        }}
        />
        <Card>
        <Header>girlfriend<span style={{ color: '#673ab7' }}>eats</span></Header>
            {cloneElement(formComponents[index], {
                up: () => setIndex(index + 1),
                down: () => setIndex(index - 1),
                update: (key, value) => {
                    let shallow = data
                    shallow[key] = value
                    setData(shallow)
                }
            })}
        </Card>
        </Wrapper>
    )
}

export default Main