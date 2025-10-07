import { useContext } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import PlayArrowIcon from '@mui/icons-material/PlayCircleOutline'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { AppContext } from '../../stateContext/indexContext'

import * as types from '../../stateContext/types'
import { Tooltip } from '@mui/material'
import { app } from '../../index.jsx'

// const user = app.currentUser

export default function TitlesList(props) {
  const [appState, dispatch] = useContext(AppContext)
  console.log(appState)


  const addLikeAndFaforit = index => (e) => {
    e.preventDefault()
    const userId = appState.userId
    const clientUserName = appState.userName
    const titleId = appState.playlist[index]._id.toString()
    const sendObj = { userId, titleId, clientUserName }
    console.log('adding to favorits and likes', sendObj)

    app.currentUser.callFunction('addToFavorits', sendObj)
  }
  const setAppStateIdx = index => (e) => {
    e.preventDefault()
    console.log(index)
    dispatch({
      type: types.SET_URL_IDX,
      payload: index
    })
  }

  return (
    <div sx={theme => ({
      width: '100%',
      maxWidth: 460,
      backgroundColor: theme.palette.background.paper,
    })}>

      <List component="nav" aria-label="playlist titles">
        {appState.playlist.map((elem, index) => (
          <ListItem
            key={index}
            button
            selected={appState.urlIdx === index}
            onClick={setAppStateIdx(index)}
          >
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText primary={elem.artist}
              secondary={elem.titleName} />
            <Divider />
            <ListItemIcon>
              <Tooltip title='Like this title' placement='top-start' arrow
                onClick={addLikeAndFaforit(index)} >
                <ThumbUpAltOutlinedIcon />
              </Tooltip>
            </ListItemIcon>
            {appState.userName !== '' && <ListItemIcon>
              <Tooltip title='Add to personal favorits' placement='bottom' arrow >
                < FavoriteOutlinedIcon
                  onClick={addLikeAndFaforit(index)} />
              </Tooltip>
            </ListItemIcon>}
          </ListItem>
        ))}
      </List>
      {/* 
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={props.urlIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={props.urlIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List> */}
    </div >
  )
}
