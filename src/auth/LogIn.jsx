import { useState } from "react"
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export const LogIn = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otherError, setotherError] = useState('');

    const onLogin = async (e) => {
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("todos")
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                
                console.log(errorMessage);
                console.log(errorCode);
                
                if (errorCode === "auth/user-not-found") {
                    setotherError("user not found");
                }
                if (errorCode === "auth/user-not-found") {
                    setotherError("User Not found");
                }
                if (errorCode === "auth/wrong-password") {
                    setotherError("Wrong Password");
                }
                else {
                    setotherError("Invalid Credential")
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
                    <form className="w-50">
                        <div class="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                className="form-control"
                                placeholder="example@gmail.com" />
                        </div>

                        <div class="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                className="form-control"
                                placeholder="Enter your password" />
                        </div>
                        <div>
                            <p className="login_text error">Forgot Your Password?</p>
                        </div>
                        <div className="justify-content-center align-items-center d-flex">
                            <button type="submit" className="btn form_btn" onClick={onLogin}>LogIn</button>
                        </div>
                        <div className="text-center mt-4"><p className="error">{otherError}</p></div>
                    </form>
                </div>

            </div>
        </div>
    )
}