import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Container, Typography, TextField } from "@material-ui/core";
import { fadeIn } from 'react-animations'
import Radium, {StyleRoot} from 'radium';
import List from "./components/List/List";
import Widget from "./components/Widget/Widget";
import { getAll, postItem, removeItem, updateItem } from "./config/Api";
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

            // CREATE
            postItem(data);
            setReload(true);
        }
    }

    const deleteItem = (key) => {
        const filteredItems = state.items.filter(item => item.id !== key.id);
        setState({
            ...state,
            items: filteredItems
        });
        removeItem(key.id);
    }

    const setUpdate = (data) => {
        // TODO: CALL API
        return updateItem(data);
    }

    useEffect(() => {
        (async () => {
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

                                    <div style={styles.fadeIn15}>
                                        <form id="to-do-form" onSubmit={addItem}>
                                            <Typography className={classes.left2} variant="subtitle1" gutterBottom>
                                                Añade las tareas que desea realizar
                                            </Typography>

                                            <TextField
                                                id="outlined-full-width"
                                                style={{ margin: 8, background: "#fff" }}
                                                value={state.currentItem.text}
                                                onChange={handleInput}
                                                placeholder="Ej: Comprar materiales para trabajar"
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                            />
                                            <Button
                                                type="submit"
                                                classes={{
                                                    root: classes.root,
                                                    label: classes.label,
                                                }}
                                            >
                                                Añadir Tarea
                                            </Button>
                                        </form>
                                    </div>
                                </header>
                                <br/>
                                <br/>
                                <div style={styles.fadeIn2}>
                                    <List rows={state.items} state={state} setState={setState} deleteItem={deleteItem} setUpdate={setUpdate} reload={reload} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
        </StyleRoot>
    );
}

// animations
const styles = {
    fadeIn1: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    fadeIn15: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    fadeIn2: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
};

export default App;
