import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    IconButton,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FlipMove from 'react-flip-move';
import './List.css';
import Modal from "../Modal";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    margin: {
        marginLeft: "10%",
    },
    opacity: {
        opacity: 0.4,
    },
    table: {
        marginLeft: "2%",
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    btnColor: {
        color: "#6580ff",
    },
    appBar: {
        position: 'relative',
        backgroundColor: "white",
        color: "#000"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));




// FIXME: DAR MAS ESTILO
function ListInfo(props) {
    const classes = useStyles();
    const { items: { items } } = props;
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FlipMove duration={500} easing="ease-in-out">
                {items.map(item => (
                    <TableContainer className={classes.table} component={Paper} key={item.id}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row" style={{ padding: 0, width: "8%" }}>
                                        <FormControlLabel value="female" control={<Radio />} />
                                    </TableCell>
                                    <TableCell align="left" style={{cursor: "pointer", color: "#393943"}} onClick={handleClickOpen}>
                                        {item.text ? item.text : " - "}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" className={[classes.margin, classes.btnColor].join(" ")}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ))}
                <Modal open={open} setOpen={setOpen} classes={classes} />
            </FlipMove>
        </div>
    );
}

export default ListInfo;