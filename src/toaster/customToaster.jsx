import { duration } from '@mui/material'
import { red } from '@mui/material/colors'
import { Toaster } from 'react-hot-toast'

function CustomToaster() {

    return (
        <Toaster
            position='top-right'
            gutter={4}
            containerClassName='toast-container'
            containerStyle={{
                
            }}
            toastOptions={{
                duration: 6000,
                error: {
                    style: {
                        backgroundColor: red[100]
                    }
                }
            }}

        />
    )
}

export default CustomToaster