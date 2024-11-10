import './registration-page.css';
import logo from './logo.png';
import userIcon from './userIcon.png';
import lockIcon from './lockIcon.png';
import email from './email.png';
export function RegistrationPage() {
    return (
        <div className="registration-container">
            <img src={logo} alt="Logo" className="registration-logo" />
            <div className="header">
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
            </div>
            <div className="register-button">
                <button>Register</button>
            </div>
        </div>
    );
}
