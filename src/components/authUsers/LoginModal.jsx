

import { useContext, useState } from 'react'
import {
    Dialog, Button, TextField, InputAdornment, IconButton,
    FormControl, InputLabel, OutlinedInput, ButtonGroup
} from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'
import MailIcon from '@mui/icons-material/Mail'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
// Import auth functions
import { 
    signInWithEmail, 
    signUpWithEmail, 
    signInNoCredentials, 
    signInWithGoogle,
    signOut 
} from '../../workers/authWorker'

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
}

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function LoginInfoBox() {
    const [appState, dispatch] = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({
        userName: '',
        passWord: '',
        rePassWord: '',
        showPassword: false,
        signIn: true
    })

    const handleModalOpen = () => setOpen(true)
    const handleModalClose = () => setOpen(false)

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword })
    }

    const handleInputChange = name => event => {
        event.preventDefault()
        setState({ ...state, [name]: event.target.value })
    }

    const onBtnClick = bool => e => {
        e.preventDefault()
        setState({ ...state, signIn: bool })
    }

    const registerUser = async (email, password) => {
        const result = await signUpWithEmail(email, password)
        if (result.success) {
            dispatch({
                type: types.SET_USER_ID,
                payload: result.user.uid
            })
            dispatch({
                type: types.SET_USER_NAME,
                payload: email
            })
            handleModalClose()
        } else {
            alert(result.error.message)
        }
    }

    const logInEmailPass = async (email, password) => {
        const result = await signInWithEmail(email, password)
        if (result.success) {
            dispatch({
                type: types.SET_USER_ID,
                payload: result.user.uid
            })
            dispatch({
                type: types.SET_USER_NAME,
                payload: email
            })
            handleModalClose()
        } else {
            alert("Failed to log in: " + result.error.message)
        }
    }

    const handleLogout = async () => {
        const result = await signOut()
        if (result.success) {
            dispatch({
                type: types.SET_USER_ID,
                payload: ''
            })
            dispatch({
                type: types.SET_USER_NAME,
                payload: ''
            })
        } else {
            alert("Failed to log out: " + result.error.message)
        }
    }

    const loginAnonymous = async () => {
        const result = await signInNoCredentials()
        if (result.success) {
            dispatch({
                type: types.SET_USER_ID,
                payload: result.user.uid
            })
            handleModalClose()
        } else {
            alert("Failed to log in anonymously: " + result.error.message)
        }
    }

    const handleGoogleSignIn = async () => {
        const result = await signInWithGoogle()
        if (result.success) {
            dispatch({
                type: types.SET_USER_ID,
                payload: result.user.uid
            })
            dispatch({
                type: types.SET_USER_NAME,
                payload: result.user.email
            })
            handleModalClose()
        } else {
            alert("Failed to log in with Google: " + result.error.message)
        }
    }

    return (
        <div>
            {appState.userId === '' ? 
                <Button
                    variant="outlined"
                    size='small'
                    color='inherit'
                    sx={{ 
                        backgroundColor: '#1b304a', 
                        marginBottom: '2%', 
                        whiteSpace: 'nowrap' 
                    }} 
                
                    onClick={handleModalOpen}
                > 
                    Login/SignUp 
                </Button> :
                <Button 
                    name='LogOut' 
                    onClick={handleLogout} 
                    variant='outlined' 
                    size='small'
                    sx={{ 
                        backgroundColor: grey[400], 
                        marginBottom: '2%', 
                        whiteSpace: 'nowrap' 
                    }} 
                >
                    Log Out
                </Button>
            }
 
            <Dialog
                open={open}
                onClose={handleModalClose}
                         >
                <div style={style}>
                    <ButtonGroup variant='text' fullWidth >
                        <Button onClick={onBtnClick(true)}>Log In</Button>
                        <Button onClick={onBtnClick(false)}>Sign Up</Button>
                    </ButtonGroup>

                    <form style={formStyles}>
                        <TextField 
                            id='userName' 
                            type='email' 
                            label='E-mail' 
                            name='userName'
                            margin='normal'
                            value={state.userName} 
                            placeholder='user name'
                            onChange={handleInputChange('userName')}
                            variant='outlined'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControl variant='outlined' margin='normal'>
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
                                            edge="end"
                                        >
                                            {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        {!state.signIn && (
                            <TextField 
                                id='rePassWord' 
                                label='Retype Password' 
                                name='rePassWord'
                                value={state.rePassWord} 
                                placeholder='Retype password'
                                onChange={handleInputChange('rePassWord')}
                                margin='normal'
                                variant='outlined'
                                type={state.showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} 
                            />
                        )}

                        {!state.signIn ? (
                            <Button 
                                name='signUp' 
                                onClick={() => {
                                    const { userName, passWord, rePassWord } = state
                                    if (passWord !== rePassWord) {
                                        alert("Passwords don't match")
                                        return
                                    }
                                    registerUser(userName, passWord)
                                }}
                                variant='contained' 
                                sx={{
                                    backgroundColor: blueGrey[900], 
                                    color: 'white',
                                    marginTop: 2,
                                    '&:hover': {
                                        backgroundColor: blueGrey[700]
                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    name='emailPass' 
                                    onClick={() => logInEmailPass(state.userName, state.passWord)} 
                                    variant='contained' 
                                    sx={{
                                        backgroundColor: blueGrey[900], 
                                        color: 'white',
                                        marginTop: 2,
                                        '&:hover': {
                                            backgroundColor: blueGrey[700]
                                        }
                                    }}
                                >
                                    Log In with Email
                                </Button>
                                <Button 
                                    name='anonymous' 
                                    onClick={loginAnonymous} 
                                    variant='contained'
                                    sx={{
                                        backgroundColor: blueGrey[200], 
                                        marginTop: 1,
                                        '&:hover': {
                                            backgroundColor: blueGrey[300]
                                        }
                                    }}
                                >
                                    Log In Anonymous
                                </Button>
                                <Button 
                                    name='withGoogle' 
                                    onClick={handleGoogleSignIn} 
                                    variant='contained' 
                                    sx={{
                                        backgroundColor: blueGrey[400], 
                                        marginTop: 1,
                                        '&:hover': {
                                            backgroundColor: blueGrey[500]
                                        }
                                    }}
                                >
                                    Log In with Google
                                </Button>
                            </>
                        )}
                    </form>
                </div>
            </Dialog>
        </div>
    )
}
