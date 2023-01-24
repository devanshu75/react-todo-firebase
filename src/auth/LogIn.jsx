export const LogIn = () => {
    return (
        <div className="continaer-fluid h-100">
        <div className="row h-100">
            <div className="col-md-3 logo-bg d-flex">
                <h1>Login</h1>
            </div>
            <div className="col-md-9 form-content d-flex justify-content-center align-items-center">
                <form className="w-50">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="text" class="form-control" placeholder="example@gmail.com" />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" placeholder="Enter your password" />
                    </div>
                    <div>
                        <p className="login_text">Forgot Your Password?</p>
                    </div>
                    <div className="justify-content-center align-items-center d-flex">
                        <button type="button" class="btn form_btn">LogIn</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}