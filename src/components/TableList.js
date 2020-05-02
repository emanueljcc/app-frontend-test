import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    FormControlLabel,
    IconButton,
    Checkbox,
    Tooltip,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "./Modal";
import withLoaderTable from "./HOC/withLoaderTable";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginLeft: "10%",
    },
    opacity: {
        opacity: 0.4,
    },
    appBar: {
        position: "relative",
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

function TableList({ rows, setUpdate, deleteItem, setState, state }) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState({
        checked: null,
        id: "",
        text: "",
        notes: "",
    });

    const handleOpenModal = item => {
        setRow({
            ...row,
            ...item
        });
        setOpen(true);
    }

    const updatedItem = (item) => {
        const itemsUpdated = rows.map((itemOrigin) => {
            if (item.id === itemOrigin.id) return item;

            return itemOrigin;
        });
        setRow({
            ...row,
            ...item
        });

        setState({
            ...state,
            items: itemsUpdated
        });

        // TODO: call update api
        setUpdate(item);
    }

    const handleCheck = (e, x) => {
        // toggle checked
        setRow({ ...x });
        x.checked = !x.checked;
        // CALL API UPDATE
        setUpdate(x);
    }

    return (
        <>
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableBody key={Math.random()}>
                        {rows.map((item, key) => (
                            <TableRow key={item.id + `${key}`}>
                                <TableCell key={item.id + (new Date()).getTime() + Math.random() + `${key}`} component="th" scope="row"  style={{ width: "8%" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedItem"
                                                checked={item.checked}
                                                onChange={e => handleCheck(e, item)}
                                            />
                                        }
                                    />
                                </TableCell>
                                <Tooltip title="Click me" placement="top">
                                    <TableCell
                                        align="left"
                                        style={{cursor: "pointer", color: "#393943"}}
                                        onClick={() => handleOpenModal(item)}
                                        key={item.id + (new Date()).getTime()}
                                    >
                                        {item.text ? item.text : " - "}
                                    </TableCell>
                                </Tooltip>
                                <TableCell align="right" key={`${key}`}>
                                    <Tooltip title="Remove" placement="right">
                                        <IconButton
                                            aria-label="delete"
                                            className={[classes.margin, classes.btnColor].join(" ")}
                                            onClick={() => deleteItem(item)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open} setOpen={setOpen} row={row} setRow={updatedItem} />
        </>
    )
}

export default withLoaderTable(TableList);