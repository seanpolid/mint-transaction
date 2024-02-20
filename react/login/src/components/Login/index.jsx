import githubIcon from '../../assets/github-mark.svg'
import googleIcon from '../../assets/google-icon.svg'
import React, { useState } from "react";
import Registration from '../Registration';

let host;
if (import.meta.env.DEV) {
    host = "http://localhost:8080";
} else {
    host = "";
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleModalVisibility = () => {
        setIsModalVisible(prevIsModalVisible => !prevIsModalVisible);
    }

    const handleRegistration = (username, password) => {
        handleModalVisibility();
        setUsername(username);
        setPassword(password);
        setRegistrationSuccessful(true);
        setTimeout(() => {
            setRegistrationSuccessful(false);
        }, 8000);
    }

    return (
        <main>
            <form className="login" method="POST" action={`${host}/login`}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={username} 
                    onChange={handleUsernameChange}
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={handlePasswordChange}
                    autoComplete="current-password" 
                    required
                />
                
                <div className="forgotRegion">
                    <a href="/login/help/username">Forgot username</a>
                    <a href="/login/help/password">Forgot password</a>
                </div>
                
                <input type="submit" value="Login" />
            </form>
            
            <button type="button" onClick={handleModalVisibility}>Create New Account</button>
            
            <div className="oauthOptions">
                <a href={`${host}/oauth2/authorization/github`}>
                    <img className="icon" src={githubIcon} />
                </a>
                <a href={`${host}/oauth2/authorization/google`}>
                    <img className="icon" src={googleIcon} />
                </a>
            </div>

            {isModalVisible ? <Overlay onClick={handleModalVisibility} /> : null}
            {isModalVisible ? <Registration handleRegistration={handleRegistration} /> : null}
            {registrationSuccessful ? <p className='successMessage'>Registration successful!</p> : null}
        </main>
    )
}

const Overlay = ({onClick}) => {
    return (
        <div className='overlay' onClick={onClick}></div>
    )
}

export default Login