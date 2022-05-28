import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styled from '@emotion/styled'
import Particles from '../components/Particles'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  background-image: linear-gradient(145deg, rgb(221, 160, 245), rgb(86, 124, 228));
`

function MyApp({ Component, pageProps }: AppProps) {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#9c27b0',
      },
      secondary: {
        main: '#673ab7',
      },
      error: {
        main: '#f44336',
      },
    },
  })

  return (
    <Wrapper>   
    <Particles />
    <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
    </Wrapper>
  )
}

export default MyApp
