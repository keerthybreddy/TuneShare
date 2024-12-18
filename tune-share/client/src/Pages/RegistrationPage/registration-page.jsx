import './registration-page.css';

import {Link} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export function RegistrationPage() {

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:5000/registration-page', {username: username, firstName: firstName, lastName: lastName, password: password, email: email}).then((data) => {
            setUsername('')
            setFirstName('')
            setLastName('')
            setPassword('')
            setEmail('')
        })
    }

    return (
        <div className="registration-container">
            <img src="/assets/logo.png" alt="Logo" className="registration-logo" />
            <div className="registration-header">
                <div className="text">WELCOME</div>
            </div>
            <div className="registration-inputs">
                <div className="registration-input">
                    <img src="/assets/userIcon.png" alt="Icons" className="registration-icons"/>
                    <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="registration-input">
                    <img src="/assets/name-icon.png" alt ="Icons" className="registration-icons"/>
                    <input placeholder="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="registration-input">
                    <img src="/assets/name-icon.png" alt="Icons" className="registration-icons"/>
                    <input placeholder="Last Name" type="text"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="registration-input">
                    <img src="/assets/lockIcon.png" alt="Icons" className="registration-icons"/>
                    <input placeholder="Password" type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="registration-input">
                    <img src="/assets/email.png" alt ="Icons" className="registration-icons"/>
                    <input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <Link to="/user-login-page">Already Have an Account?</Link>
            </div>
            <div className="register-button">
                <button onClick={submitHandler}>Register</button>
            </div>
        </div>
        //
    );
}
