import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    Dialog,
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Slide,
    IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import debounce from "lodash.debounce";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
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

export default function Modal({ open, setOpen, row, setRow }) {
    const classes = useStyles();

    // setear inputs
    const handleChange = debounce((e) => {
        setRow({
            ...row,
            [e.target.name]: e.target.value,
        });
    }, 300);

    const handleClose = () => setOpen(false);

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar style={{ padding: "40px 0 40px 0" }}>
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
                            defaultValue={row.text}
                            onChange={e => {
                                e.persist();
                                return handleChange(e);
                            }}
                            placeholder="Ingresar Texto"
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
                            defaultValue={row.notes}
                            onChange={e => {
                                e.persist();
                                return handleChange(e);
                            }}
                            placeholder="Ingresar Notas"
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
