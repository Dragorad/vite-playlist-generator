import { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
// import IconButton from '@mui/material/IconButton'
// import CloseIcon from '@mui/icons-material/Close'
import { AppContext } from '../../stateContext/indexContext'
import { SET_ALERT_OPEN } from '../../stateContext/types'
// import { Button } from '@mui/material'



export default function SnackBar() {
    const [dispatch] = useContext(AppContext)
    const alertOpen = false

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({
            type: SET_ALERT_OPEN,
            payload: false
        })
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
            // action={
            //     <React.Fragment>
            //         <Button color="secondary" size="small" onClick={handleClose}>
            //             UNDO  </Button>

            //         <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            //             <CloseIcon fontSize="small" />
            //         </IconButton>
            //     </React.Fragment>
            // }
            > You have to choose at least one genre </Snackbar>
        </div>
    )
}
