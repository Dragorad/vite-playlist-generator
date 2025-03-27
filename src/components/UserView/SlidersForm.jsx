import { useState, useContext, lazy} from 'react'
import { AppContext } from '../../stateContext/indexContext'
import { SET_NEW_PLAYLIST, SET_URL_IDX, SET_PLAYING } from '../../stateContext/types' 
import { ButtonsGroupMultiple } from './GenreButton'
import toast from 'react-hot-toast'
import { descriptorsList } from '../../workers/descriptorsList' 
import { generatePlaylist } from '../../workers/firebaseQueryWorker'

const SliderMUI = lazy(() => import('./SliderMUI'))
const Button = lazy(() => import('@mui/material/Button'))
const Grid = lazy(() => import('@mui/material/Grid'))
const Typography = lazy(() => import('@mui/material/Typography'))

const stateObj = {
  randomInt: { min: 120, max: 180, step: 5, value: 180 },
  Brightness: { min: 0, max: 100, step: 5, value: 65 },
  Loudness: {
    min: 1, max: 100, step: 5, value: 20,
    valueLabelFormat: (x) => x + 60
  },
  Tempo: { min: 60, max: 180, step: 5, value: 10 },
  Diversity: { min: 10, max: 50, step: 10, value: 10 },
  diversityStrings: [],
  genresButtons: {}
}

export default function SlidersForm() {

  const [state, setState] = useState(stateObj)
  const [appState, dispatch] = useContext(AppContext)
  const includedGenres = appState.genresArr.join(' ').split(' ')
    .filter(el => el !== 'general' && el !== 'and')

  const customInput = {
    bpm: state.Tempo.value + 70,
    delta: state.Diversity.value,
    average_loudness: state.Loudness.value,
    spectral_centroid: state.Brightness.value,
    genresArr: includedGenres
  }
  const setNewPlaylist = customInput => {
    console.log(customInput)
    generatePlaylist(customInput)
      .then(playlist => {
        toast.success('Playlist generated')
        console.log(playlist)
        dispatch({
          type: SET_NEW_PLAYLIST,
          payload: playlist
        })
        dispatch({
          type: SET_URL_IDX,
          payload: 0
        })
        dispatch({
          type: SET_PLAYING,
          payload: true
        })
        console.log(appState.playlist)
      })
  }

  const onSliderChange = name => (ev, value) => {
    setState({ ...state, [name]: { ...state[name], value: value } })
  }
  const handleCommit = name => (ev, value) => {
    setState({ ...state, [name]: { ...state[name], value: value } })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    !appState.userId ?
      toast.error('You have to log in')
      : !appState.genresArr.length ?
        toast.error('You have to select at last one genre button or select all genres')
        : ''
        setNewPlaylist(customInput)
  }

  return (
    <div style={{ padding: '1rem', margin: 'auto' }}>
         <Grid container
        // xs={12}
        // lg={10}
        // xl={6}
        spacing={1}
        direction={'column'}
        justifyContent={'space-around'}
        alignItems={'baseline'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          overflow: 'hidden',
          // backgroundImage: 'url(music-player-circle-start.svg)',
        }}

      >
        <Grid container item 
          sm={5}
          direction={'column'}

          style={{ backgroundColor: 'none', height: '100%' }}>
          <Grid item sm={12} sx={{
            margin: '2rem 0'
          }}
          order={{sx:3, md:1}}
            >
            <SliderMUI
              color='#531B1B'
              sliderText='Diversity'
              value={state.Diversity.value}
              defaultValue={state.Diversity.value}
              min={state.Diversity.min}
              max={state.Diversity.max}
              step={state.Diversity.step}
              // aria-text={'Diversity'}
              name={'Diversity'}
              onChange={onSliderChange('Diversity')}
              onChangeComitted={handleCommit('Diversity')} />


            {/* <Grow in={true}
              style={{ transformOrigin: '100 0 20' }}
              timeout={1800}> */}
              <Button
                size={'medium'}
                sx={{
                  margin: '5% 0',
                  backgroundColor: '#531B1B'
                }}
                variant="contained"
                onClick={onSubmit}
                type='submit'
                fullWidth >Generate Playlist</Button>
            {/* </Grow> */}
          </Grid>
          <Grid item sm={12} >           {/* descriptor sliders */}
            {descriptorsList.map((descriptor, key) => (
              < SliderMUI key={key}
                value={state[descriptor].value}
                defaultValue={state[descriptor].value}
                min={state[descriptor].min}
                max={state[descriptor].max}
                step={state[descriptor].step}
                // aria-text={descriptor}
                sliderText={descriptor}
                disabled={!appState.descriptorsArr.includes(descriptor)}
                name={descriptor}
                onChange={onSliderChange(descriptor)}
                onChangeComitted={handleCommit(descriptor)}
                valueLabelFormat={descriptor === "Tempo" ?
                state.Tempo.valueLabelFormat : (x) => x = x}
              />
            ))}
          </Grid>
          <Grid item sm={12}    >
            <Typography align='center'> Lock Descriptor Value </Typography>
            <ButtonsGroupMultiple sm={4} inputArr={descriptorsList} selected={false}
              sx={{
                marginTop: '3%',
                marginBottom: '8%',
                marginLeft: '0.3 rem'
              }}
            />
          </Grid>

        </Grid>

      </Grid>
    </div >
  )
}
