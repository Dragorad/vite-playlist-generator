import { useState } from 'react'
import { makeStyles } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
// import VolumeUp from '@mui/icons-material/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

// const handleCommit = name => (ev, value) => {
//   alert(`${name} ${value}`)
//   setState({ ...state, [name]: value })
// }



// const handleSliderChange = name => (ev, value) => {
//   ev.preventDefault()
//   setState({
//       ...state, [name]: value
//   })
// }

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Mamata
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
      </Grid>
    </div>
  );
}
