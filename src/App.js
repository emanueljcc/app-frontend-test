import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Container, Typography } from '@material-ui/core';
import List from './components/List/List';
import { getAll, postItem, removeItem, updateItem } from "./config/Api";
import './App.css';

import Widget from "./components/Widget/Widget";

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(40deg, #6f70d7 18%, #81caff 107%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 7px 10px -4px rgba(53, 59, 155, 0.51);',
        float: 'right'
    },
    label: {
        textTransform: 'capitalize',
    },
    backgroundWhite: {
        background: "#fff",
    },
    left2: {
        marginLeft: "2%",
    }
});

// TODO: CREAR MODAL FULLPAGE PARA MOSTRAR LA INFO DETALLADA POR ITEM
function App() {
    const classes = useStyles();

    const [state, setState] = useState({
        items : [],
        currentItem: {
        text: '',
        key: ''
        }
    });

    const handleInput = (e) => {
        setState({
        ...state,
        currentItem: {
            text: e.target.value,
            key: Date.now()
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
        postItem(data);

        if (newItem.text !== '') {
            const newItems = [...state.items, newItem];
            setState({
                items: newItems,
                currentItem: {
                    text: '',
                    key: ''
                }
            });
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

    const setUpate = (value, id) => {
        const items = state.items;
        // eslint-disable-next-line array-callback-return
        items.map(item => {
            if (item.id === id) {
                item.text = value;
            }
        })
        setState({
            ...state,
            items
        });

        updateItem(value, id);
    }

    // FIXME: ARREGLAR FIX ACA
    useEffect(() => {
        (async () => {
            const data = await getAll();
            setState({
                ...state,
                items: data,
            });
        })();
    }, []);

    return (
        <Container maxWidth="sm">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="App">
                        <header>
                            <Widget />
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

                                {/* <Button type="submit" variant="outlined" color="primary" style={{ float: "right" }}>
                                    Añadir Tarea
                                </Button> */}
                                <Button
                                    type="submit"
                                    classes={{
                                        root: classes.root, // class name, e.g. `classes-nesting-root-x`
                                        label: classes.label, // class name, e.g. `classes-nesting-label-x`
                                    }}
                                >
                                    Añadir Tarea
                                </Button>
                            </form>
                        </header>
                        <br/>
                        <br/>
                        <List items={state} deleteItem={deleteItem} setUpdate={setUpate}/>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
