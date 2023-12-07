import { useContext } from 'react'
import { makeStyles, } from '@mui/material/styles'
// import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
// import IconButton from '@mui/material/IconButton'
// import PauseIcon from '@mui/icons-material/Pause'
import Typography from '@mui/material/Typography'
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
// import PlayArrowIcon from '@mui/icons-material/PlayArrow'
// import SkipNextIcon from '@mui/icons-material/SkipNext'
import { Container } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
// import PlayerDr from './Player'
// import TitlesList from './TitlesList'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
import ReactPlayer from 'react-player'
import { notify } from 'react-notify-toast'
// import PlayerControlButtons from './PlayerControlButtons'
// import { maxWidth, minWidth } from '@material-ui/system'


export default function PlayerCard(props) {
  const queryMatches = useMediaQuery('(min-width: 600px)')

  let flexDirection = queryMatches ? 'row' : 'column'
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: flexDirection
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      height: "15%"
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }))

  const playerIsLight = queryMatches ? false : true
  const [appState, dispatch] = useContext(AppContext)
  const classes = useStyles()
  // const theme = useTheme()
  // const [state, setState] = useState({
  //   playing: true,
  //   urlIndex: 0
  // })
  const changeUrlIndex = direction => (event) => {
    const lastIdx = stateUrls.length - 1
    // const newIdx = 0
    switch (direction) {
      case 'up': {
        return dispatch({
          type: types.SET_URL_IDX,
          payload: appState.urlIdx < lastIdx ? appState.urlIdx + 1 : 0
        })
      }
      case 'down': {
        return dispatch({
          type: types.SET_URL_IDX,
          payload: appState.urlIdx > 0 ? appState.urlIdx - 1 : lastIdx
        })
      }

      default: notify.show("Tell me what to do", 'danger')
      // return setState({ ...state, urlIndex: direction })
    }
  }
  // const handlePlayPause = e => {
  //   e.preventDefault()
  //   dispatch({
  //     type: types.TOGGLE_PLAY_PAUSE,
  //     payload: !appState.playing
  //   })
  //   setState({ ...state, playing: !state.playing })
  // }
  if (!appState) return <p>Loading playlist...</p>
  console.log(appState)
  const playlistArr = appState.playlist

  const stateUrls = playlistArr.map(elem => `https://youtu.be/${elem.url}`)
  console.log(stateUrls[appState.urlIdx])

  return (
    <Container className={classes.root}>
      {appState.playlist.length < 1 ?
        <Typography variant={'h4'} color={"textSecondary"}>
          Playlist is empty.<br />
          Please set "Diversity" to bigger value or add genres with dedicated buttons<br />
          Press "Generate Playlist Button" </Typography>
        :
        <ReactPlayer
          url={stateUrls[appState.urlIdx]}
          playing={appState.playing}
          light={playerIsLight}
          playIcon={true}
          // playIcon={'none'}
          controls={false}
          width={'100%'}
          height={'100%'}
          onEnded={changeUrlIndex('up')} />
      }
      <div className={classes.details}>
        {/* <PlayerControlButtons /> */}

        <CardContent className={classes.content}>

          {/* <CardMedia
        className={classes.cover}
      // image="/static/images/cards/live-from-space.jpg"
      // title="Live from space album cover"
      > */}
          {/* <TitlesList urlIndex={state.urlIndex} dataArr={appState.playlist}
            setIndex={changeUrlIndex} /> */}
          {/* <ReactPlayer /> */}

          {/* </CardMedia> */}
          <Typography variant="subtitle1" color="textSecondary">

          </Typography>
        </CardContent>
      </div>
    </Container>
  )
}
