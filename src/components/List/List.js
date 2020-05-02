import React from 'react';
import FlipMove from 'react-flip-move';
import TableList from '../../pages/TableList';
import './List.css';

function ListInfo({ rows, deleteItem, setUpdate, updateItem, reload, setState, state }) {

    return (
        <div>
            <FlipMove duration={500} easing="ease-in-out">

                <TableList rows={rows} setUpdate={setUpdate} deleteItem={deleteItem} reload={reload} setState={setState} state={state} />

            </FlipMove>
        </div>
    );
}

export default ListInfo;