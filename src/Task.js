export const Task = (props) => {
    return (
        <>
            <ul className="d-flex align-items-center">
                <li><input type="checkbox"
                    onClick={() => props.completeTask(props.id)} className="CheckBox" /></li>
                <li><p className="todo-task">{props.taskName}</p></li>
                <li><button className="btn td-btn" >Edit</button></li>
                <li><button className="btn td-btn"
                    onClick={() => props.deleteTask(props.id)}>Delete</button></li>
            </ul>
        </>
    )
}