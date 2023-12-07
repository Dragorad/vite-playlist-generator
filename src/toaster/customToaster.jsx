import { duration } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Toaster } from 'react-hot-toast'

function CustomToaster() {

    return (
        <Toaster
            position='top-right'
            gutter={4}
            containerClassName='toast-container'
            containerStyle={{
                'backgroundColor': blue[200]
            }}
            toastOptions={{
                duration: 2000,
            }}

        />
    )
}

export default CustomToaster