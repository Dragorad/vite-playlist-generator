import { useState } from 'react'
import Typography from '@mui/material/Typography'

import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

function getModalStyle() {
    const top = 16
    const left = 8;

    return {
        border: 'none',
        backgroundColor: "#455a64",
        opacity: '0.8',
        padding: '3%',
        color: 'white',
        margin: "20px auto",
        width: '60%',
        transform: `translate( ${left}%, ${top}%)`,
    }
}


export default function InfoBox() {

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div style={{ margin: '5%', marginRight: '10%' }}>
            <Button
                variant="outlined"
                size='small'
                color='inherit'
                backgroundColor='#ff1133'
                marginRight='1rem'
                fontSize='0.8rem'
                onClick={handleOpen}>
                AppInfo
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <div style={modalStyle}
                    sx={theme => ({
                        position: 'absolute',
                        width: 350,
                        backgroundColor: theme.palette.background.paper,
                        border: '2px solid #ffffff',
                        boxShadow: theme.shadows[5],
                        padding: theme.spacing(1, 4, 3),
                        margin: theme.spacing(1)
                    })}
                >
                    <h2 id="simple-modal-title">How to use / Начин на използване</h2>
                    <p id="simple-modal-description">
                        <Typography variant='body1' gutterBottom component='p'>
                            Всяка една от композициите е избрана лично от опитен музикален редактор с доказано добър вкус.<br />
                            Изберете жанр, средно темпо и средна гръмкост и ще получите първите пет предложения.<br />
                            С Diversity управлявате диапазон на темпо, гръмкост и усреднена честота на траковете вътре в плейлистата.<br />
                            ** Можете да харесвате и нехаресвате конкретен трак. <br />
                            **Регистрираните потребители могат да следват хората, които предлагат траковете и да запазват плейлисти.
                        </Typography>
                        <Typography variant='subtitle1' gutterBottom>
                            Отбелязаните с ** възможности са в процес на разработка.
                        </Typography>
                    </p>

                </div>
            </Modal>
        </div>
    );
}




// export default function InfoBox() {
//   const classes = useStyles()

//   return (
//     <div className={classes.root}>
//       <ExpansionPanel>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography className={classes.heading}>Expansion Panel 1</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//           <Typography paragraph>

//          <Typography paragraph>
//          Това е приложение за генериране на плейлисти в които няма да имате усещането, че слушате едно и също парче по много пъти!<br/>
//          </Typography>
//          Всяка една от композициите е избрана лично от висококласен музикален редактор с доказано добър вкус.<br/>
//          Изберете жанр, средно темпо и средна гръмкост и ще получите първите пет предложения.<br/>
//          С Diversity управлявате колко често да се сменят стила и темпата на траковете вътре в плейлистата.<br/>
//          Можете да харесвате и нехаресвате конкретен трак. <br/>
//          Регистрираните потребители могат да следват хората, които предлагат траковете и да запазват плейлисти<div className=""></div><div className=""></div>
//          <div className=""></div>
//        </Typography>
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2a-content"
//           id="panel2a-header"
//         >
//           <Typography className={classes.heading}>Expansion Panel 2</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel disabled>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3a-content"
//           id="panel3a-header"
//         >
//           <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
//         </ExpansionPanelSummary>
//       </ExpansionPanel>
//     </div>
//   )
// }
