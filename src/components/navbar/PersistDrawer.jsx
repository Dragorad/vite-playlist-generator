import { Suspense, useContext } from 'react'
import clsx from 'clsx'
// import { makeStyles, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
// import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
import ShareIcon from '@mui/icons-material/Share'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import SettingsIcon from '@mui/icons-material/Settings'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import InfoBox from '../navbar/InfoBox'
import SlidersForm from '../UserView/SlidersForm'
import { Grid } from '@mui/material'
import { blue } from '@mui/material/colors'
// import { LogButton } from '../authUsers/Login'
import LoginInfoBox from '../authUsers/LoginModal'
import Notifications from 'react-notify-toast'
import GenresButtonsGroup from '../UserView/GenresButtonsGroup'
import TitlesList from '../player/TitlesList'
import PlayerDr from '../player/PlayerDr'
import { AppContext } from '../../stateContext/indexContext'

const drawerWidth = 240


// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: '1600px',
//     display: 'flex',
//     justifyContent: 'space-evently',
//     // marginLeft: '0.3rem',
//     padding: '1rem'
//   },
//   appBar: {
//     display: 'flex',
//     backgroundColor: blue[900],

//     fontSize: "1rem",
//     justifyContent: 'space-between',
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: theme.spacing(1),
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: 'theme.spacing(0, 1)',
//     // ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     // maxWidth: '1200px',
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     backgroundColor: 'black',
//     marginLeft: -drawerWidth,
//     // backgroundColor: 'red'
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
// }))

export default function PersistentDrawerLeft() {
  // const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [appstate] = useContext(AppContext)
  // const userName = appstate.userName
  const loggedAsText = appstate.userName !== '' ? `Logged as ${appstate.userName}` : ''

  // console.log(userName)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Suspense fallback={<img src='music-player-circle-start.svg' alt='Loading...' />}>
        <Grid spacing={1} lg={10} xl={6}>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar variant='dence'>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <img src="music-player-circle-start.svg" alt='App Logo' />

                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap flexShrink='2' >
                DrAgora Music Selector Beta! {loggedAsText}

              </Typography>

              <div style={{
                display: 'flex',
                position: 'relative',
                right: '1%',
                alignItems: 'center',
                justifyContent: 'right',
                marginLeft: '5%',
                padding: '0.6 rem'
              }}>
                <LoginInfoBox />
                <InfoBox />
              </div>
            </Toolbar>
          </AppBar>
        </Grid>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Following', 'Playlists', 'Starred', 'Share'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <QueueMusicIcon /> : <ShareIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Login', 'Preferences'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <PermIdentityIcon /> : <SettingsIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Notifications />
          <div className={classes.drawerHeader} />
        </main>

        <Grid container xs={12} spacing={1}
          lg={10} xl={9}
        // className={classes.root}
        >
          {/* <Container > */}
          <Grid item sx={12} sm={3} md={2} lg={2}// genres buttons
            // style={{ border: '1px solid red' }}
            direction='row'>
            <GenresButtonsGroup />
          </Grid>
          <Grid container item xs={12} sm={5} direction='row' //sliders form
          // style={{border: '1px solid blue'}}
          >
            <Grid item >
              {/* <Paper elevation={2} >
            <SlidersForm />
            {/* </Paper> */}
            </Grid>

            <Grid item xs={12} direction='column' //PlayerDr
            >
              {/* <Paper elevation={1} > */}
              <PlayerDr />
              {/* </Paper> */}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} lg={3} //titlesList
          >
            <TitlesList />
          </Grid>
          {/* </Container> */}
        </Grid>
      </Suspense>

    </>

  )
}
