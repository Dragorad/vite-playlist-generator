import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

function ValueLabelComponent(props) {
    const { children, open, value: val } = props

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={val}>
            {children}
        </Tooltip>
    )
}


export default function SliderMUI(props) {

    return (
        <div sx={theme => ({
            width: 300 + theme.spacing(3) * 2,
            maxWidth: "90%",
            height: theme.spacing(),
            color: theme.secondary.dark
        })} >
            <Typography gutterBottom
                style={{ height: '30%' }}>{props.sliderText}</Typography>
            <Slider
                sx={theme => ({
                    color: props.color || theme.secondary
                })}
                size='small'
                ValueLabelComponent={ValueLabelComponent}
                min={5}
                aria-label={props.sliderText}
                defaultValue={props.defaultValue}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                onChangeCommitted={props.onChangeCommitted}
                step={10}
            />
        </div >
    )
}
