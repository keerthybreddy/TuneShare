import './registration-page.css';
import logo from '/tune-share/client/src/assets/logo.png';
import userIcon from '/tune-share/client/src/assets/userIcon.png';
import lockIcon from '/tune-share/client/src/assets/lockIcon.png';
import email from '/tune-share/client/src/assets/email.png';
import {Link} from "react-router-dom";
export function RegistrationPage() {
    return (
        <div className="registration-container">
            <img src={logo} alt="Logo" className="registration-logo" />
            <div className="registration-header">
                <div className="text">WELCOME</div>
            </div>
            <div className="registration-inputs">
                <div className="registration-input">
                    <img src={userIcon} alt="Icons" className="registration-icons"/>
                    <input placeholder="Username" type="text" />
                </div>
                <div className="registration-input">
                    <img src={lockIcon} alt="Icons" className="registration-icons"/>
                    <input placeholder="Password" type="password" />
                </div>
                <div className="registration-input">
                    <img src={email} alt ="Icons" className="registration-icons"/>
                    <input placeholder="Email" type="text"/>
                </div>
                <Link to="/user-login-page">Already Have an Account?</Link>
            </div>
            <div className="register-button">
                <button>Register</button>
            </div>
        </div>
    );
}
