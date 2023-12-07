import * as types from './types'

export const reducer = (state, action) => {
    switch (action.type) {
        // case types.ADD_CONTACT:
        //     return {
        //         contacts: [...state.contacts, action.payload]
        //     }
        // case types.DEL_CONTACT:
        //     return {
        //         contacts: state.contacts.filter(
        //             contact => contact.id !== action.payload
        //         )
        //     }
        case types.SET_SLIDER_VALUE: {
            const { name, value } = action.payload
            return {
                sliderFormValues: { ...state.sliderFormValues, [name]: value }
            }
        }
        case types.SET_URL_IDX: {
            return {
                ...state,
                urlIdx: action.payload
            }
        }
        case types.SET_PLAYING: {
            return {
                ...state,
                playing: action.payload
            }
        }
        case types.SET_NEW_PLAYLIST: {

            console.log(action.payload)
            return {
                ...state,
                playlist: action.payload
            }
        }
        case types.SET_GENRES: {
            return {
                ...state,
                genresArr: action.payload
            }
        }
        case types.SET_ALERT_OPEN: {
            return {
                ...state,
                alertOpen: action.payload
            }
        }

        case types.TOGGLE_PLAY_PAUSE:
            return {
                ...state,
                playing: action.payload
            }

        case types.SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            }

        case types.SET_USER_NAME:
            return {
                ...state,
                userName: action.payload
            }

        case types.TOGGLE_BTN_STATE: {
            const [arrName, newArr] = action.payload
            console.log(newArr)
            return {
                ...state,
                [arrName]: newArr
            }
        }

        default:
            throw new Error();
    }
}