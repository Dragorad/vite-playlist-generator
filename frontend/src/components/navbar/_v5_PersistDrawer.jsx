import { useContext, useState } from 'react'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
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
// import ListItemButton from '@mui/material/ListItemButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox'
import ShareIcon from '@mui/icons-material/Share'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import SettingsIcon from '@mui/icons-material/Settings'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
// import Paper from '@mui/material/Paper'
import SlidersForm from '../UserView/SlidersForm'
import Grid from '@mui/material/Grid'
// import { blue } from '@mui/material/colors'
import InfoBox from './InfoBox'
import LoginInfoBox from '../authUsers/LoginModal'
import GenresButtonsGroup from '../UserView/GenresButtonsGroup'
import TitlesList from '../player/TitlesList'
import PlayerDr from '../player/PlayerDr'
import { AppContext } from '../../stateContext/indexContext'


const drawerWidth = 240



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export default function PersistentDrawerLeft() {
  const [open, setOpen] = useState(false);
  const theme = useTheme()
  const [appstate] = useContext(AppContext)
  const loggedAsText = appstate.userName !== '' ? `Logged as ${appstate.userName}` : ''
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar variant='dence'
        // sx={{
        //   backgroundColor: '#404e55de'
        // }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          // className={clsx(classes.menuButton, open && classes.hide)}
          >
            <img src="music-player-circle-start.svg" alt='App Logo' />

            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap flexShrink='2'
            sx={{ p: "0 4%" }}>
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
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
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

      <Main >
        <CssBaseline />
        <Container fluid maxWidth='xl'>
          <Grid container xs={12} spacing={1} direction='row'
            sx={{ mt: '2%' }}
          >
            <Grid item sx={12} sm={6} md={4} lg={4}// genres buttons and sliders form
              // style={{ border: '1px solid red' }}
            >
              <GenresButtonsGroup />
              <SlidersForm />
            </Grid>
            <Grid container item xs={12} sm={8} direction='row'
              style={{
                // border: '1px solid blue',
                // margin: '2%',
              }}
            >

              {/* <Paper elevation={1} > */}
              
              <Grid container item direction='row' //PlayerDr
                sx={{ mt: '1%', w: '98%' }}
              >

                <Grid item xs={12} md={7}>
                  <PlayerDr />
                </Grid>
                <Grid item xs={12} md={5} //titlesList
                >
                  <TitlesList />

                </Grid>
              </Grid>
            </Grid>
          </Grid >
        </Container>
        {/* <Notifications /> */}
      </Main>
    </Box >

  )
}
