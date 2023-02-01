import { useState } from "react"
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export const LogIn = () => {
    const [formData, SetFormData] = useState({
        email: '',
        password: '',
    })

    const [passError, SetPassError] = useState("");
    const [emailError, SetemailError] = useState("");
    const [FormError, SetFormError] = useState({});
    const [isSubmit, SetisSubmit] = useState(false);

    const handleChange = (event) => {
        SetFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if (isSubmit === false) {
            SetFormError(validate())
        }
        else {
            console.log(FormError)
            Login();
        }
    }

    const validate = () => {
        const errors = {}

        if (!formData.email) {
            errors.email = "email is required"
        }
        if (!formData.password) {
            errors.password = "Password is required"
        }
        SetisSubmit("true");

        return errors;
    }

    const Login = () => {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Login Successful")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log(errorCode);

                if (errorCode === "auth/invalid-email") {
                    SetemailError("Enter Valid Email")
                } else if (errorCode === "auth/invalid-password") {
                    SetPassError("Password wrong");
                } else {
                    SetFormError("Login Fail! Enter a valid credential");
                }
            });
    }

    return (
        <div className="continaer-fluid h-100">
            <div className="row h-100">
                <div className="col-md-3 logo-bg d-flex">
                    <h1>Login</h1>
                </div>
                <div className="col-md-9 form-content d-flex justify-content-center align-items-center">
                    <form onSubmit={handleSubmit} className="w-50">
                        <div class="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="text"
                                onChange={handleChange}
                                name="email"
                                className="form-control"
                                value={formData.email}
                                placeholder="example@gmail.com" />
                            <p>{FormError.email}</p>
                            <p>{emailError}</p>
                        </div>

                        <div class="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password"
                                onChange={handleChange}
                                value={formData.password}
                                name="password"
                                className="form-control"
                                placeholder="Enter your password" />
                            <p>{FormError.password}</p>
                            <p>{passError}</p>
                        </div>
                        <div>
                            <p className="login_text error">Forgot Your Password?</p>
                        </div>
                        <p>{}</p>
                        <div className="justify-content-center align-items-center d-flex">
                            <button type="submit" className="btn form_btn">LogIn</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}