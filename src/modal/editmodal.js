import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth();
const db = getFirestore(app);


const EditModals = ({ show, onHide, taskName, id, handleUpdatedTask, taskData }) => {

    const [UpdateTask, SetUpdateTask] = useState();
    const [isValid, SetValid] = useState();

    // console.log("updataks", handleUpdatedTask)

    const onEdit = async () => {
        try {
            await setDoc(doc(db, `users/${auth.currentUser.uid}/tasks`, id), {
                taskName: UpdateTask,
                completed: false
            })
            // handleUpdatedTask(taskData);
            // SetValid(!isValid);

        } catch (e) {
            console.error(e);
        } finally {
            // console.log("Data Updated")
        }
    }

    const handleModal = () => {
        onEdit();
        onHide();
    }

    return (
        <>
            <Modal show={show}>
                <Modal.Header onClick={onHide} closeButton>
                    <Modal.Title>{taskName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control"
                            placeholder={taskName}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => SetUpdateTask(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModals;