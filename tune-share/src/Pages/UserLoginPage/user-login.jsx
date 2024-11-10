import './user-login.css'


export function UserLogin() {
    return (
        <div className="login-container">
            <div className="header">
                <img src="" alt=""/>
                <div className="text">Sign In</div>
                <div className="underline"></div>
            </div>
            <div className="login-inputs">
                <div className="input">
                    <img src="" alt=""/>
                    <input placeholder="Username" type="text"/>
                </div>
                <div className="input">
                    <img src="" alt=""/>
                    <input placeholder ="Password" type="password"/>
                </div>
            </div>
            <div className="button">
                <button>Sign In</button>
            </div>
        </div>
    )
}