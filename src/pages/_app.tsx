import { type AppType } from "next/app"

import { api } from "../utils/api"

import {  
  CssBaseline,
  createTheme, ThemeProvider,
  Box
} from "@mui/material"

import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

import Particles from "../components/Particles"

import "../styles/globals.css"
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const gradient =  keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`
const Background = styled(Box)`
  margin: 0;
  background: linear-gradient(45deg, #DCD0FF, #FFCBA4);
  background-size: 400% 400%;
  animation: ${gradient} 16s ease infinite;
  z-index: -9999;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

const MyApp: AppType = ({ Component, pageProps }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#9B59B6',
      },
      secondary: {
        main: '#8E44AD',
      }
    },
  })

  return <>
    <CssBaseline /> 
    <Particles />   
    <ThemeProvider theme={theme}>
      <Box
        position="relative"
        margin={0}
        minHeight="100vh"
      > 
        <Background />
        <Component {...pageProps} />  
      </Box>
    </ThemeProvider>
  </>
}

export default api.withTRPC(MyApp)
