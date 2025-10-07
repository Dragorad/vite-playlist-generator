import { useState, useContext } from 'react'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
import SliderMUI from './SliderMUI'
import Slider from '@mui/material/Slider'

function DiversityGenerateComp() {

    const [appState, dispatch] = useContext(AppContext)


    
    return (
        <div>DiversityGenerateComp</div>
    )
}

export default DiversityGenerateComp