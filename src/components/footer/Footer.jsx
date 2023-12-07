import {useState}from 'react'
import { makeStyles } from '@mui/material/styles'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
// import { positions } from '@material-ui/system'

const useStyles = makeStyles({
  root: {
    width: 500,
  },
})

export default function SimpleBottomNavigation() {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
      position='relative'
      bottom={0}
      right={0}
    >
      <div>Dragora Music Selector <span>DrAgora Soft &reg </span></div>
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  )
}

// export default function Footer (props) {

//   return (
      
//       <footer>Dragora Music Selector <span>DrAgora Soft &reg </span></footer>
//       )
// }
