import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { fadeIn } from 'react-animations'
import Radium, {StyleRoot} from 'radium';
import List from "./components/List";
import Widget from "./components/Widget";
import { getAll, postItem, removeItem, updateItem } from "./config/Api";
import InputPost from "./components/InputPost";
import Alerts from "./components/Alerts";
import "./App.css";

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(40deg, #6f70d7 18%, #81caff 107%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 7px 10px -4px rgba(53, 59, 155, 0.51);",
        float: "right"
    },
    label: {
        textTransform: "capitalize",
    },
    backgroundWhite: {
        background: "#fff",
    },
    left2: {
        marginLeft: "2%",
    }
});

function App() {
    const classes = useStyles();

    // estados para las alertas
    const [openAlerts, setOpenAlerts] = useState({ open: false, msg: '', type: '' });

    const [state, setState] = useState({
        items : [],
        currentItem: {
            text: "",
            key: ""
        }
    });
    const [reload, setReload] = useState(false);

    const handleInput = (e) => {
        setState({
            ...state,
            currentItem: {
                text: e.target.value,
                key: Date.now(),
            }
        });
    }

    const addItem = (e) => {
        e.preventDefault();
        const newItem = state.currentItem;

        const { text } = newItem;

        const data = {
            text
        };

        if (text !== "") {
            const newItems = [...state.items, newItem];
            setState({
                items: newItems,
                currentItem: {
                    text: "",
                    key: ""
                }
            });

            setOpenAlerts({
                open: true,
                msg: 'Created successfully.',
                type: 'success',
            });

            // CREATE
            postItem(data);
            setReload(true);
        } else {
            setOpenAlerts({
                open: true,
                msg: 'Please fill input text.',
                type: 'warning',
            });
        }
    }

    const deleteItem = (key) => {
        const filteredItems = state.items.filter(item => item.id !== key.id);
        setState({
            ...state,
            items: filteredItems
        });

        setOpenAlerts({
            open: true,
            msg: 'Deleted successfully.',
            type: 'success',
        });

        removeItem(key.id);
    }

    const setUpdate = (data) => {
        setOpenAlerts({
            open: true,
            msg: 'Updated successfully.',
            type: 'success',
        });

        // TODO: CALL API
        return updateItem(data);
    }

    useEffect(() => {
        (async () => {
            // TODO: getAll API
            const data = await getAll();

            setState({
                ...state,
                items: data,
            });

            setReload(false);
        })();
    }, [reload]);

    return (
        <StyleRoot>
                <Container maxWidth="sm">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="App">
                                <header>
                                    <div style={styles.fadeIn1}>
                                        <Widget style={styles.fadeIn1}/>
                                    </div>

                                    <div style={styles.fadeIn2}>
                                        <InputPost classes={classes} state={state} addItem={addItem} handleInput={handleInput} />
                                    </div>
                                </header>
                                <br/>
                                <br/>
                                <div style={styles.fadeIn3}>
                                    <List rows={state.items} state={state} setState={setState} deleteItem={deleteItem} setUpdate={setUpdate} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    {/* alerts */}
                    <Alerts openAlerts={openAlerts} setOpenAlerts={setOpenAlerts} />
                </Container>
        </StyleRoot>
    );
}

// animations
const styles = {
    fadeIn1: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    fadeIn2: {
        animation: 'x 2.5s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    fadeIn3: {
        animation: 'x 3s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
};

export default App;
