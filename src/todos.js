import React from "react";

export const Todos = () => {
    return (
        <div className="continaer-fluid h-100">

            <div className="row h-100">

                <div className="col-md-3 logo-bg d-flex  flex-column">
                    <div className="user-border">
                        <i class="fa-solid fa-user icons"></i>
                    </div>
                    <div className="user-Name mt-3">
                        <p>@UserName</p>
                    </div>
                    <button className="btn todo-btn">LogOut</button>
                </div>

                <div className="col-md-9 form-content d-flex">
                    <div className="container d-flex justify-content-center align-items-center flex-column">
                        <div className="row">
                            <div class="col">
                                <div class="input-group">
                                    <input type="text" class="form-control rounded-0" placeholder="Enter Task" />
                                    <button type="submit" class="btn rounded-0 todo_btn">Add Task</button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 todo-list">
                            <h3>Todo List</h3>
                            <ul className="d-flex align-items-center">
                                <li><input type="checkbox"className="CheckBox" /></li>
                                <li><p className="todo-task">Sample task</p></li>
                                <li><button className="btn td-btn">Edit</button></li>
                                <li><button className="btn td-btn">Delete</button></li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}