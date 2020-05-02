import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Container, Typography } from '@material-ui/core';
import List from './components/List/List';
import Widget from "./components/Widget/Widget";
import { getAll, postItem, removeItem, updateItem } from "./config/Api";
import './App.css';


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
        setReload(true);
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
        const items = state.items;

        // eslint-disable-next-line array-callback-return
        items.map(item => {
            if (item.id === data.id) {
                item.text = data.value;
            }
        })
        setState({
            ...state,
            items,
        });

        // API
        updateItem(data);
    }

    // FIXME: ARREGLAR FIX ACA
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
                        </header>
                        <br/>
                        <br/>
                        <List rows={state.items} state={state} setState={setState} deleteItem={deleteItem} setUpdate={setUpdate} reload={reload} />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
