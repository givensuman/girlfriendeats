import React from 'react'
import ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Helmet } from 'react-helmet'
import './index.css'
import 'animate.css'

import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom'

import Main from './views/Main'
import Results from './views/Results'
import NotFound from './views/NotFound'
import elena from '../assets/elena.png'


const theme = createTheme({
  palette: {
    type: 'light',
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

const App = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path='/results' element={<Results />} />
        <Route path='/*' element={<NotFound />} />
        <Route path='/' element={<Main />} />
      </Routes>
    </Router>
    </ThemeProvider>
    <Helmet>
      <title>girlfriendeats</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍕</text></svg>" />
      <meta name="title" content="girlfriendeats" />
      <meta name="description" content="A site for helping my girlfriend pick a restaurant" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="girlfriendeats.herokuapp.com" />
      <meta property="og:title" content="girlfriendeats" />
      <meta property="og:description" content="A site for helping my girlfriend pick a restaurant" />
      <meta property="og:image" content={elena} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="girlfriendeats.herokuapp.com" />
      <meta property="twitter:title" content="girlfriendeats" />
      <meta property="twitter:description" content="A site for helping my girlfriend pick a restaurant" />
      <meta property="twitter:image" content={elena} />
    </Helmet>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
