import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    FormControlLabel,
    Radio,
    IconButton,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "../components/Modal";
import withLoaderTable from "../components/HOC/withLoaderTable";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginLeft: "10%",
    },
    opacity: {
        opacity: 0.4,
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
    table: {
        marginLeft: "2%",
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    btnColor: {
        color: "#6580ff",
    },
    radioColor: {
        color: "#34d26e",
    },
}));

function TableList({ rows, setUpdate, deleteItem, reload, setState, state }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState({
        checked: null,
        id: '',
        text: '',
        notes: '',
    });

    const handleOpenModal = item => {
        setRow({
            ...row,
            ...item
        });
        setOpen(true);
    }

    const updatedItem = (item) => {
        const itemsUpdated = [
            ...rows,
            item
        ];




        setRow({
            ...row,
            ...item
        });

        setState({
            ...state,
            items: itemsUpdated
        })
    }


    return (
        <>
            {rows.map(item => (
                <TableContainer className={classes.table} component={Paper} key={item.id + (new Date()).getTime()}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ padding: 0, width: "8%" }}>
                                    <FormControlLabel value="female" control={<Radio className={classes.radioColor}/>} />
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{cursor: "pointer", color: "#393943"}}
                                    onClick={() => handleOpenModal(item)}
                                >
                                    {item.text ? item.text : " - "}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        aria-label="delete"
                                        className={[classes.margin, classes.btnColor].join(" ")}
                                        onClick={() => deleteItem(item)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
            <Modal open={open} setOpen={setOpen} row={row} setRow={updatedItem} setUpdate={setUpdate} />
        </>
    )
}

export default withLoaderTable(TableList);
