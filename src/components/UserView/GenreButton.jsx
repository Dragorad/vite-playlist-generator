import { useContext, lazy } from 'react'
import { Grid, Paper } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { AppContext } from '../../stateContext/indexContext';
import { descriptorsList } from '../../workers/descriptorsList'

const ToggleButton = lazy(() => import('@mui/material/ToggleButton'))

export function  ButtonsGroupMultiple(props) {
  const [appState, dispatch] = useContext(AppContext)
  const inputArr = props.inputArr

  const onButtonClick = name => () => {
    const arrName = descriptorsList.includes(name) ? 'descriptorsArr' : 'genresArr'
    const newArr = appState[arrName].includes(name) ?
      appState[arrName].filter(el => el !== name)
      : [...appState[arrName], name]
    console.log(newArr)
    dispatch({
      type: 'TOGGLE_BTN_STATE',
      payload: [arrName, newArr]
    })
  }
  
  return (
    <Grid 
    container
     alignItems='space-between'
     spacing={1}>
      {inputArr.map((text, index) => (
        <Grid item xs={4} sm={props.sm} spacing={1} key={`${text + index}`}>
          <Paper elevation={1}
            style={{ height: '100%' }}>
            <ToggleButton
              key={index}
              sx={{
                width: '100%',
                height: '100%',
                padding: '7%',
                '&:hover': {
                  backgroundColor: blueGrey[200]
                },
                '&.Mui-selected': {
                  backgroundColor: blueGrey[800],
                  color: 'white'
                },

                label: {
                  padding: '1%',
                  // fontSize: '1 rem',
                  // textTransform: 'uppercase',
                  '&:hover': {
                    textTransform: 'lowercase'
                  }
                },
              }}
              aria-label={props.text}
              value={text}
              text={text}
              variant='outlined'
              selected={appState.genresArr.includes(text) || appState.descriptorsArr.includes(text)}
              size={'medium'}
              // name={name}
              fullWidth
              onChange={onButtonClick(text)}
            >
              {text}
            </ToggleButton>
          </Paper>
        </Grid>
      ))
      }
    </Grid >


  )
}

