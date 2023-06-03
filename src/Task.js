import React from "react"
import { useState } from "react"
import EditModals from "./modal/editmodal"

const Task = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <ul className="d-flex align-items-center">
                <li><input type="checkbox"
                    onClick={() => props.completeTask(props.id)} className="CheckBox" /></li>
                <li><p className="todo-task">{props.taskName}</p></li>
                <li><button className="btn td-btn" onClick={handleShow} > Edit</button></li>
                <li><button className="btn td-btn"
                    onClick={() => props.deleteTask(props.id)}>Delete</button></li>
            </ul>

            {show && <EditModals
                taskName={props?.taskName}
                id = {props.id}
                show={show}
                onHide={handleClose}
                handleUpdatedTask={props.handleUpdatedTask}
            />}
        </>
    )
}

export default Task;