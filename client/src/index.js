import React from 'react'
import ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/results' element={<Results />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/' element={<Main />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
