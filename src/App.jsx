import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppContext } from './stateContext/indexContext.jsx'
import { app } from './index'
import { SET_USER_ID } from './stateContext/types'
import CustomToaster from './toaster/customToaster.jsx'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mph: 360,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      light: '#718792',
      main: '#455a64',
      dark: '#1c313a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      // contrastText: '#fff',
    }
  },
  overrides: {
    typography: {
      fontSize: 12,
      h6: {
        fontSize: '0.8 rem'
      },
      body1: {
        fontSize: '1 rem'
      },
      body2: {
        fontSize: '0.7 rem'
      },
      button: {
        fontSize: '0.6 rem'
      }
    }
  }
})


function App() {
  const [appState, dispatch] = useContext(AppContext)
  // console.log(app.currentUser)
  const userId = app.currentUser ? app.currentUser.id : ''


  // console.log('appstateUser', app.currentUser.id)

  if (appState.userId === '' && app.currentUser) {
    dispatch({
      type: SET_USER_ID,
      payload: userId
    })
  }



  return (

    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CustomToaster />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
