import React, { useEffect, useState } from "react";
import { Task } from "./Task";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "./firebase";

const auth = getAuth();
const db = getFirestore(app);

export const Todos = () => {
    //Always ensure that the following keys are always present in a Todo List object
    //1.id
    //2.taskName
    //3.completed
    const [TodoList, SetTodoList] = useState([]);
    const [newTask, SetnewTask] = useState()
    const [currUser, SetcurrUser] = useState();

    function handleChange(event) {
        const task = event.target.value
        SetnewTask(task);
    }

    const addTask = async () => {
        const task = {
            taskName: newTask,
            completed: false,
        }
        let updatedTodoList = [...TodoList, await AddToFireStore(task)]
        SetTodoList(updatedTodoList)
        console.log(updatedTodoList)
    }

    const AddToFireStore = async (task) => {
        const newCollectionRef = collection(db, 'users', auth.currentUser.uid, 'tasks')

        let firebaseTaskDocRef = await addDoc(newCollectionRef, task = {
            taskName: newTask,
            completed: false,
        });

        return {
            id: firebaseTaskDocRef.id,
            ...task
        };

    }

    const deleteTask = (id) => {
        SetTodoList(TodoList.filter((task) => task.id !== id));
    }

    const completeTask = (id) => {
        SetTodoList(
            TodoList.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: true };
                }
                else {
                    return task;
                }
            })
        )
    }

    const fetchData = async () => {
        onAuthStateChanged(auth, async (user) => {

            //Collection Snapshot,contains list of task documents
            const querySnapshot = await getDocs(collection(db, "users", user.uid, "tasks"))

            // console.log(querySnapshot.docs);

            //empty array 
            const tasks = [];

            console.log("querysnapshot data",querySnapshot.docs);

            querySnapshot.forEach((doc) => {

                //creating new task object with ID
                let task = {
                    id: doc.id,
                    ...doc.data()
                }

                tasks.push(task)
            });
            
            SetTodoList(tasks)
            console.log(tasks)
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            getDoc(doc(db, "users", user.uid))
                .then(docSnap => {
                    if (docSnap.exists()) {
                        const UserData = docSnap.data().userName;
                        SetcurrUser(UserData)
                        console.log("User Data from firebase", UserData)
                    } else {
                        SetcurrUser(null)
                        console.log("No Such Document");
                    }
                })
        })
    }, []);

    return (
        <div className="continaer-fluid h-100">

            <div className="row h-100">

                <div className="col-md-3 logo-bg d-flex  flex-column">
                    <div className="user-border">
                        <i class="fa-solid fa-user icons"></i>
                    </div>
                    <div className="user-Name mt-3">
                        <p>{currUser}</p>
                    </div>
                    <button className="btn todo-btn">LogOut</button>
                </div>

                <div className="col-md-9 form-content d-flex">
                    <div className="container d-flex justify-content-center align-items-center flex-column">
                        <div className="row">
                            <div class="col">
                                <div class="input-group">
                                    <input type="text"
                                        class="form-control rounded-0"
                                        placeholder="Enter Task"
                                        onChange={handleChange}
                                    />
                                    <button onClick={addTask}
                                        type="submit"
                                        class="btn rounded-0 todo_btn">Add Task</button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 todo-list">
                            <h3>Todo List</h3>
                            {TodoList.map((task) => {
                                return (
                                    <Task
                                        taskName={task.taskName}
                                        id={task.id}
                                        completed={task.complete}
                                        deleteTask={deleteTask}
                                        completeTask={completeTask}
                                    />
                                )
                            })}

                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}