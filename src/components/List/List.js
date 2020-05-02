import React from "react";
import TableList from "../TableList";
import "./List.css";

function ListInfo({ rows, deleteItem, setUpdate, updateItem, reload, setState, state }) {

    return <TableList rows={rows} setUpdate={setUpdate} deleteItem={deleteItem} reload={reload} setState={setState} state={state} />;
}

export default ListInfo;