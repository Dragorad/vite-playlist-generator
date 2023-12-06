// https://www.sitepoint.com/replace-redux-react-hooks-context-api/

import { useReducer, createContext } from "react";
import { initialState } from './initialState'
import { reducer } from './reducers'


export const AppContext = createContext(null)

// console.log(initialState)
export const AppContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}

