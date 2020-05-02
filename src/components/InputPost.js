import React from "react";
import { Button, Typography, TextField } from "@material-ui/core";

export default function InputPost({ classes, state, addItem, handleInput }) {
    return (
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
    )
}
