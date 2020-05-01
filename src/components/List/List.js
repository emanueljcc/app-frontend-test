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

const useStyles = makeStyles(() => ({
    margin: {
        marginLeft: "10%",
    },
}));

// FIXME: DAR MAS ESTILO
function List(props) {
    const classes = useStyles();
    const { items: { items } } = props;

    const list = items.map(item => {
        return <div className="list" key={item.id}>
                    <p>
                        <FormControlLabel value="female" control={<Radio />} />
                        <input
                            type="text"
                            className={classes.margin}
                            id={item.id}
                            value={item.text}
                            onChange={(e) => {props.setUpdate(e.target.value, item.id)}}
                        />
                        <IconButton aria-label="delete" className={classes.margin} onClick={() => props.deleteItem(item)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </p>
                </div>
    });

    return (
        <div>
            <FlipMove duration={500} easing="ease-in-out">
                {list}
            </FlipMove>
        </div>
    );
}

export default List;