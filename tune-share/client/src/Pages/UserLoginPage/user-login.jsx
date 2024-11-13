import './user-login.css'
import logo from './logo.png'
import userIcon from './userIcon.png'
import lockIcon from './lockIcon.png'
import {Link} from "react-router-dom";

export function UserLogin() {
    return (
        <div className="login-container">
            <img src={logo} alt="logo" className="login-logo"/>
            <div className="login-header">
                <div className="text">Sign In</div>
                <div className="underline"></div>
            </div>
            <div className="login-inputs">
                <div className="login-input">
                    <img src={userIcon} alt="icons" className="login-icons"/>
                    <input placeholder="Username" type="text"/>
                </div>
                <div className="login-input">
                    <img src={lockIcon} alt="icons" className="login-icons"/>
                    <input placeholder ="Password" type="password"/>
                </div>
                <Link to="/registration-page">Create an Account</Link>
            </div>
            <div className="login-button">
                <button>Sign In</button>
            </div>

        </div>
    )
}