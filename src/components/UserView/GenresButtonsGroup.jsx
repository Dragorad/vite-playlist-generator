import { useContext } from 'react'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
import MuiToggleButton from '@mui/material/ToggleButton'
import { styled } from '@mui/material/styles'
import { genresList } from '../../workers/genresAndInstrumentsList'
import { ButtonsGroupMultiple } from './GenreButton'
import { blueGrey } from '@mui/material/colors'

// copied from
const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: '#00ff00'
    }
});



export default function GenresButtonsGroup() {
    console.log('buttons group in')
    const [appState, dispatch] = useContext(AppContext)
    const toggleAllGenres = e => {
        e.preventDefault()
        dispatch({
            type: types.SET_GENRES,
            payload: genresList
        })
    }
    const deselectAllGenres = e => {
        e.preventDefault()
        dispatch({
            type: types.SET_GENRES,
            payload: []
        })
    }
    return (
        <>
            <ToggleButton
                sx={{
                    margin: '2% 0',
                    color: 'white',
                    backgroundColor: blueGrey[400],
                    '&:hover': {
                        backgroundColor: blueGrey[600],
                    },
                    '&:active': {
                        backgroundColor: blueGrey[900],
                        color: 'red'
                    }
                }}
                onClick={toggleAllGenres}
                fullWidth  >
                Select All Genres
            </ToggleButton>

            <ButtonsGroupMultiple inputArr={genresList}
                selected={true} sm={6}
            />
            <ToggleButton
                style={{
                    margin: '2% 0',
                    backgroundColor: blueGrey[400],
                    color: 'white'
                }}
                variant="outlined"
                onClick={deselectAllGenres}
                // type='submit'
                fullWidth  > DeSelect All Genres
            </ToggleButton>
        </>
    )
}
