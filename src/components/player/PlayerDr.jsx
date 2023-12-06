import { useContext } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery'
import { AppContext } from '../../stateContext/indexContext.jsx'
import * as types from '../../stateContext/types'
import ReactPlayer from 'react-player'
import { notify } from 'react-notify-toast'
import PlayerControlButtons from './PlayerControlButtons'

export default function PlayerDr(props) {
    // const queryMatches = useMediaQuery('(min-width: 600px)')

    const [appState, dispatch] = useContext(AppContext)

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

    if (!appState) return <p>Loading playlist...</p>
    const playlistArr = appState.playlist

    const stateUrls = playlistArr.map(elem => elem.url.length < 22 ? `https://youtu.be/${elem.url}` : elem.url)
    console.log(stateUrls[appState.urlIdx])

    return (
        <div style={{ marginTop: '2%' }}>

            {appState.playlist.length < 1 ?
                <p variant={'h4'} color={"textSecondary"}>
                    Playlist is empty.<br />
                    Please set "Diversity" to bigger value or add genres with dedicated buttons<br />
                    Then press "Generate Playlist Button" </p>
                : <>

                    <ReactPlayer
                        url={stateUrls[appState.urlIdx]}
                        playing={appState.playing}
                        playIcon={false}
                        controls={false}
                        width={'90%'}
                        light={true}
                        // height={'80%'}
                        onEnded={changeUrlIndex('up')} />

                    < PlayerControlButtons />
                </>
            }
        </div>
    )
}

