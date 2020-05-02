import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    Button,
    Dialog,
    ListItemText,
    ListItem,
    List,
    Divider,
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Slide,
    IconButton,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: "white",
        color: "#000"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    green: {
        color: "green",
    },
    red: {
        color: "red",
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ open, setOpen, row, setRow, setUpdate }) {
    const classes = useStyles();

    const handleChange = e => {
        setRow({
            ...row,
            [e.target.name]: e.target.value,
        });
    }

    const handleClose = () => setOpen(false);


    useEffect(() => {
        if (row.text) {
            console.log(row)
            setUpdate(row);
        }
    }, [row])


    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {row.text}
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <Typography variant="h4" gutterBottom>
                            <FiberManualRecordIcon className={row.checked ? classes.green : classes.red} />
                            {row.text}
                        </Typography>


                        <TextField
                            id="text"
                            style={{ margin: 8, background: "#fff" }}
                            name="text"
                            value={row.text}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />

                        <TextField
                            id="notes"
                            style={{ margin: 8, background: "#fff" }}
                            name="notes"
                            value={row.notes}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />

                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    )
}
