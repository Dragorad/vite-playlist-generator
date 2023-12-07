import React, { useContext } from 'react'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import Modal from '@mui/material/Modal';
import {
    Dialog, Button, TextField, Typography, InputAdornment, IconButton,
    FormControl, InputLabel, OutlinedInput, ButtonGroup
} from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'
// import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import MailIcon from '@mui/icons-material/Mail'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import * as RealmWeb from 'realm-web'
import { app } from '../../index'
import * as types from '../../stateContext/types'
import { AppContext } from '../../stateContext/indexContext'

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
}
function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`,
    };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// Let registered users log in

export default function LoginInfoBox() {
    const [appState, dispatch] = useContext(AppContext)
    // getModalStyle is not a pure function, we roll the style only on the first render
    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false)
    const [state, setState] = React.useState({
        userName: '',
        passWord: '',
        rePassWord: '',
        showPassword: false,
        signIn: true
    })

    const registerUser = async (email, password) => {
        console.log('pass and rePass matching')
        // const credentials = RealmWeb.credentials.emailPassword(email, password)
        // TODO: Register a new user with the specified email and password
        try {
            const user = await app.registerUser(email, password)
            console.log(user.id)
            logInEmailPass(email, password)
        }
        catch (err) { console.log(err.message) }

    }
    const logInEmailPass = async (email, password) => {
        console.log(email + ' : ' + password)
        // TODO: Log in with the specified email and password
        try {
            const credentials = RealmWeb.Credentials.emailPassword(email, password);
            const user = await app.logIn(credentials)
            console.log("Successfully logged in with email!", user.currentUser)

            dispatch({
                type: types.SET_USER_ID,
                payload: user.id.toString()
            })
            dispatch({
                type: types.SET_USER_NAME,
                payload: state.userName
            })
            console.log(appState.userId)
            handleModalClose()
        } catch (err) {
            console.error("Failed to log in", err);
        }
    };

    // Let logged in users log out
    const logOut = async () => {
        console.log('logging out')
        const userId = appState.userId
        console.log(userId)

        try {
            app.currentUser.logOut()
                .then(result => {
                    dispatch({
                        type: types.SET_USER_ID,
                        payload: ''
                    })
                    dispatch({
                        type: types.SET_USER_NAME,
                        payload: ''
                    })
                    console.log(appState.userId)
                })
        }
        catch (error) { console.log(error.message) }
        // setUs)er(app.currentUser);
    }

    const loginAnonymous = async () => {

        try {
            const credentials = RealmWeb.Credentials.anonymous();

            const user = await app.logIn(credentials)

            dispatch({
                type: types.SET_USER_ID,
                payload: user.id.toString()
            })
            handleModalClose()
            console.log("Successfully logged in!", user)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    }
    const handleInputChange = name => event => {
        event.preventDefault()
        setState({ ...state, [name]: event.target.value })
    }
    const handleModalOpen = () => {
        setOpen(true);
    }

    const handleModalClose = () => {
        setOpen(false);
    }
    const onBtnClick = bool => e => {
        e.preventDefault()
        setState({ ...state, signIn: bool })
        console.log(state.signIn)
    }
    return (
        <div>
            {appState.userId === '' ? <Button
                variant="outlined"
                size='small'
                color='inherit'
                backgroundColor={'#1b304a'}
                fontSize='0.8rem'
                onClick={handleModalOpen}> Login/SignUp </Button> :
                <Button name='LogOut' onClick={logOut} variant='outlined' size='small'
                    style={{ backgroundColor: grey[400], marginBottom: '2%', whiteSpace: 'nowrap' }} >
                    Log Out</Button>}

            <Dialog
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleModalClose}
            >
                <div
                    sx={style}
                >
                    <ButtonGroup variant='text' fullWidth >
                        <Button id='modalButton 0' onClick={onBtnClick(true)}>Log In</Button>
                        <Button id='modalButton 1' onClick={onBtnClick(false)}>Sign UP</Button>
                    </ButtonGroup>

                    <p id="simple-modal-description">
                        <form key={'loginForm'} style={formStyles}
                            onSubmit={() => {
                                console.log(state)

                            }}>
                            {/* <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String}</Typography> */}

                            <TextField id='userName' type='email' label={'E-mail'} name={'userName'}
                                margin='normal'
                                value={state.userName} placeholder='user name'
                                onChange={handleInputChange('userName')}
                                variant={'outlined'}
                                // helperText={`user name`}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">
                                        <MailIcon /> </InputAdornment>,
                                }}
                            />
                            <FormControl
                                variant='outlined'>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="passWord"
                                    type={state.showPassword ? 'text' : 'password'}
                                    value={state.passWord}
                                    onChange={handleInputChange('passWord')}
                                    name='passWord'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            >
                                                {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            {!state.signIn ?
                                <React.Fragment>
                                    <TextField id='rePassWord' label={'Retype Password'} name={'rePassWord'}
                                        value={state.rePassWord} placeholder='Retype password'
                                        onChange={handleInputChange('rePassWord')}
                                        margin='normal'
                                        variant={'outlined'}
                                        type={state.showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}  >
                                                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }} />

                                    <Button name='signUp' onClick={() => {
                                        const { userName, passWord, rePassWord } = state

                                        passWord !== rePassWord ? alert(`Password and Retype don't match`)
                                            : registerUser(userName, passWord)
                                    }}
                                        variant='contained' style={{
                                            backgroundColor: blueGrey[900], color: 'white',
                                            marginBottom: '2%'
                                        }}>Sign Up</Button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button name='emailPass' onClick={() => logInEmailPass(state.userName, state.passWord)} variant='contained' style={{
                                        backgroundColor: blueGrey[900], color: 'white',
                                        marginBottom: '2%'
                                    }}>
                                        Log In with e-mail and password</Button>
                                    <Button name='annonymous' onClick={loginAnonymous} variant='contained'
                                        style={{ backgroundColor: blueGrey[200], marginBottom: '2%' }}>
                                        Log In Anonymous</Button>
                                    <Button name='withGoogle' onClick={() => {
                                        alert("Under Construction")
                                    }} variant='contained' style={{ backgroundColor: blueGrey[400], marginBottom: '2%' }} endIcon={<Typography> ?</Typography>}>
                                        Log In with Google</Button>
                                </React.Fragment>}

                        </form>

                    </p>

                </div>
            </Dialog>
        </div>
    );
}


