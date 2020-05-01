import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Container } from '@material-ui/core';
import List from './components/List/List';
import { getAll, postItem, removeItem, updateItem } from "./config/Api";
import './App.css';

// TODO: CREAR MODAL FULLPAGE PARA MOSTRAR LA INFO DETALLADA POR ITEM
function App() {
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
                            <form id="to-do-form" onSubmit={addItem}>

                                <TextField
                                    id="outlined-full-width"
                                    style={{ margin: 8 }}
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

                                <Button type="submit" variant="outlined" color="primary" style={{ float: "right" }}>
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
