import React, { useEffect, useState } from "react";
import Task from "./Task";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, addDoc, deleteDoc } from "firebase/firestore";
import { app } from "./firebase";
import FirefetchData from "./db";

const auth = getAuth();
const db = getFirestore(app);

export const Todos = () => {

    const navigate = useNavigate();

    const [TodoList, SetTodoList] = useState([]);
    const [newTask, SetnewTask] = useState()
    const [currUser, SetcurrUser] = useState();

    console.log(TodoList)

    const handleChange = (event) => {
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

    const deleteTask = async (id) => {

        SetTodoList(TodoList.filter((task) => task.id !== id));

        FirebaseDocDelete(id);
    }

    const FirebaseDocDelete = async (id) => {
        await deleteDoc(doc(db, `users/${auth.currentUser.uid}/tasks`, id))
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

    const Logout = () => {
        signOut(auth).then(() => {
            navigate('/todos/login');
        }).catch((error) => {
            console.log(error)
        })
    }

    // const fetchData = async () => {
    //     onAuthStateChanged(auth, async (user) => {

    //         //Collection Snapshot,contains list of task documents
    //         const querySnapshot = await getDocs(collection(db, "users", user.uid, "tasks"))

    //         //empty array 
    //         const tasks = [];

    //         querySnapshot.forEach((doc) => {
    //             //creating new task object with ID
    //             let task = {
    //                 id: doc.id,
    //                 ...doc.data()
    //             }
    //             tasks.push(task)
    //         });

    //         SetTodoList(tasks)
    //     })
    // }

    useEffect(() => {
        // fetchData();
        FirefetchData()
            .then((data) => {
                console.log("then", data)
                SetTodoList(data);
            })
            .catch((error) => {
                console.log("catch", error)
            })
        // console.log(tasksData);
    }, [])

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            getDoc(doc(db, "users", user.uid))
                .then(docSnap => {
                    if (docSnap.exists()) {
                        const UserData = docSnap.data().userName;
                        SetcurrUser(UserData)
                    } else {
                        SetcurrUser(null)
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
                    <button className="btn todo-btn" onClick={Logout}>LogOut</button>
                </div>

                <div className="col-md-9 form-content d-flex">
                    <div className="container d-flex justify-content-center align-items-center flex-column">
                        <div className="row">
                            <div class="col">
                                <div class="input-group">
                                    <input type="text"
                                        class="form-control rounded-0"
                                        placeholder=""
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
                            {TodoList.map((task, key) => {
                                return (
                                    <Task
                                        taskName={task.taskName}
                                        key={key}
                                        id={task.id}
                                        completed={task.complete}
                                        deleteTask={deleteTask}
                                        completeTask={completeTask}
                                        handleTask={SetTodoList}
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