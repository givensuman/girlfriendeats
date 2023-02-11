import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
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
    <>
      <Head>
        <title>girlfriendeats</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Wrapper>   
        <Particles />
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
      </Wrapper>
    </>
  )
}

export default MyApp
