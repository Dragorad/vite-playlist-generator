import { useContext } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
// import { makeStyles } from '@mui/material/styles'
import { Grid, Paper } from '@mui/material'
// import { border, color } from '@material-ui/system'
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { blueGrey } from '@mui/material/colors'
import { AppContext } from '../../stateContext/indexContext';
// import { StylesProvider } from '@mui/material'
import { descriptorsList } from '../../workers/descriptorsList'
// import { TOGGLE_BTN_STATE } from '../../stateContext/types'




// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//     height: '100%',
//     padding: '7%',
//     '&:hover': {
//       backgroundColor: blueGrey[200]
//     },
//     '&$selected': {
//       backgroundColor: blueGrey[400],
//       color: 'white'
//     },

//   },
//   selected: {},
//   // checked: {},
//   // hover: {},
//   label: {
//     padding: '1%',
//     // fontSize: '1 rem',
//     // textTransform: 'uppercase',
//     '&$:hover': {
//       textTransform: 'lowercase'
//     }
//   },
// })


export function ButtonsGroupMultiple(props) {

  // const {btnState} = appState
  // const {genresArr, descriptorsArr} = btnState
  const [appState, dispatch] = useContext(AppContext)
  // const [selected, setSelected] = useState(props.selected)
  const inputArr = props.inputArr

  const onButtonClick = name => (event) => {
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
  // const classes = useStyles()
  return (
    <Grid container alignItems='space-between'
      // alignItems='stretch'
      // justify='space-evenly'
      // style={{ height: '20' }}
      spacing={1}>
      {inputArr.map((text, index) => (
        <Grid item xs={4} sm={props.sm} spacing={1}>
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
                '&:$selected': {
                  backgroundColor: blueGrey[400],
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

