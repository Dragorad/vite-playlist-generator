import { useState } from 'react'
import { makeStyles } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
// import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'


// props arr for items , title for the listTitle

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 220,
        backgroundColor: theme.palette.background.paper,
    },
}))

export function ItemsList(props) {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(1)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label={props.title}>
                {props.arr.map((elem, index) => (
                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        {/* <ListItemIcon>
                            <InboxIco />
                        </ListItemIcon> */}
                        <ListItemText primary={elem} />
                    </ListItem>
                ))}
            </List>
            <Divider />

        </div>
    )
}
