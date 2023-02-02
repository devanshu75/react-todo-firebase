import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth();

export const Registration = () => {

    const navigate = useNavigate();

    const [formData, SetFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const [formErrors, SetformErrors] = useState({});

    const handleChange = (event) => {
        SetFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        let validation = validate();
        let isFormValid = Object.keys(validation).length === 0;

        if (isFormValid) {
            StoreData();
        }
        else {
            SetformErrors(validation)
        }
    }

    const StoreData = () => {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const docRef = doc(db, "users", user.uid);
                try {
                    setDoc(docRef, {
                        userName: formData.userName,
                        email: formData.email,
                    })
                    console.log("Document writtent with ID:", docRef.id);
                } catch (e) {
                    console.error("Error adding document:", e);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const validate = () => {
        const errors = {}

        if (!formData.userName) {
            errors.userName = "User Name is required"
        }
        if (!formData.email) {
            errors.email = "Email is required"
        }
        if (!formData.password) {
            errors.password = "Password is required"
        }
        if (formData.password.length <= 4) {
            errors.password = "Password must be min of 4 character"
        }
        if (!formData.confirm_password) {
            errors.confirm_password = "Confirm password is required"
        }
        if (formData.confirm_password !== formData.password) {
            errors.confirm_password = "Password must be same "
        }
        return errors;
    }

    return (
        <div className="continaer-fluid h-100">
            <div className="row h-100">
                <div className="col-md-3 logo-bg d-flex">
                    <h1>Registration Form</h1>
                </div>
                <div className="col-md-9 form-content d-flex justify-content-center align-items-center">
                    <form className="w-50" onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="username" class="form-label">UserName</label>
                            <input type="text"
                                onChange={handleChange}
                                name="userName"
                                value={formData.userName}
                                class="form-control" placeholder="Enter UserName" />
                            <p className="error">{formErrors.userName}</p>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="text"
                                onChange={handleChange}
                                name="email"
                                value={formData.email}
                                class="form-control" placeholder="example@gmail.com" />
                            <p className="error">{formErrors.email}</p>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password"
                                onChange={handleChange}
                                name="password"
                                value={formData.password}
                                class="form-control" placeholder="Password must be 8 Character" />
                            <p className="error">{formErrors.password}</p>
                        </div>
                        <div class="mb-3">
                            <label for="Confirm-password" class="form-label">Confirm Password</label>
                            <input type="password"
                                onChange={handleChange}
                                name="confirm_password"
                                value={formData.confirm_password}
                                class="form-control" placeholder="Confirm Password" />
                            <p className="error">{formErrors.confirm_password}</p>
                        </div>
                        <div className="justify-content-center align-items-center d-flex">
                            <button type="submit" class="btn form_btn">SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}