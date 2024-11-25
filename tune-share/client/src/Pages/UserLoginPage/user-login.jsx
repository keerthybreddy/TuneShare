import './user-login.css'
import logo from '../../assets/logo.png'
import userIcon from '../../assets/userIcon.png'
import lockIcon from '../../assets/lockIcon.png'
import {Link, Navigate} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import {useAuthContext} from "../../context/AuthContext";

export function UserLogin() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState(null)
    const { setCurrentUser } = useAuthContext();  // Access setCurrentUser function from context

    // Define login method
    const login = async (username, password) => {
        try {
            axios.post('http://localhost:5000/user-login-page', {username: username, password: password})
                .then(data => {
                    if (data.data === "Login unsuccessful!") {
                        setLoginStatus(false)
                    } else {
                        setCurrentUser({username: username})
                        localStorage.setItem('currentUser', JSON.stringify({username: username}))
                        setLoginStatus(true)
                    }
                })
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password); // Call login method with entered username and password
    };

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
                    <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="login-input">
                    <img src={lockIcon} alt="icons" className="login-icons"/>
                    <input placeholder ="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <Link to="/registration-page">Create an Account</Link>
            </div>
            <div className="login-button">
                <button onClick={handleSubmit}>Sign In</button>
            </div>
            {loginStatus === false ? <p>Login was unsuccessful, please try again!</p> : loginStatus === true ? <Navigate to="/user-profile" replace={true} state={{username}}/> : null}
        </div>
    )
}

// -----------OLD VALIDATION --------

// const validateUserHandler = e => {
//     e.preventDefault()
//     axios.post('http://localhost:5000/user-login-page', {username: username, password: password})
//     .then(data => {
//         if (data.data === "Login unsuccessful!") {
//             setLoginStatus(false)
//         } else {
//             setLoginStatus(true)
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }