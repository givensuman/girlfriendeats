import type { NextPage } from 'next'
import Head from 'next/head'

import React, { useState } from 'react'
import { 
  Paper, CardContent, Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import Form from '../components/Form'

import elena from '../assets/elena.png'
import elenaError from '../assets/elenaError.png'

const Card = styled(Paper)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
  position: relative;
`

const Header = styled.h1`
  user-select: none;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const Elena = styled.img`
  max-height: 880px;
  max-width: 80px;
  position: absolute;
  top: -50px;
  left: 75%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`

const Home: NextPage = () => {

  const [ elenaSource, setElenaSource ] = useState(elena)

  return (
    <>
      <Head>
        <title>girlfriendeats</title>
      </Head>
      <Card
        elevation={15}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '0.5em',          
          width: {
            xs: "80%",
            sm: 350,
            md: 400
          }
        }}
      >
        <Elena 
          src={elenaSource.src} 
          alt='Elena'
          onClick={e => {
            e.stopPropagation()
            setElenaSource(elenaError)
            setTimeout(() => setElenaSource(elena), 200)
          }}
        />
        <Header>
          girlfriend
          <span style={{ color: '#673ab7' }}>
            eats
          </span>
        </Header>   
        <Form />
        <CardContent>
          <Typography 
            variant="caption"
            marginX="auto"
          >
              Made with 💜 for my girlfriend Elena
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default Home
