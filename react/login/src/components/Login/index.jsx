import githubIcon from '../../assets/github-mark.svg'
import googleIcon from '../../assets/google-icon.svg'
import React, { useCallback, useState, useRef } from "react";

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

const Registration = ({handleRegistration}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const emailRef = useRef();

    const inputs = [
        {name: "username", placeholder: "Username", type: "text", value: username},
        {name: "password", placeholder: "Password", type: "password", autoComplete: "new-password", value: password},
        {name: "email", placeholder: "Email", type: "email", value: email, ref: emailRef},
        {name: "phone", placeholder: "Phone", type: "tel", value: phone},
    ]

    const setters = {
        "username": setUsername,
        "password": setPassword,
        "email": setEmail,
        "phone": setPhone
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setters[name](value);
    }

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const body = {
            "username": username,
            "password": password,
            "email": email,
            "phone": phone === "" ? null : phone
        }

        const string = isValid(body, emailRef);
        if (string) {
            setError(string);
            return;
        }
        
        const response = await fetch(`${host}/api/user`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        
        if (response.status >= 400) {
            const responseBody = await response.json();
            setError(responseBody.message);
            return;
        }

        handleRegistration(username, password);
    }, [username, password, email, phone]);

    return (
        <form className='modal'>
            {inputs.map(input => (
                <input key={input.name} {...input} onChange={handleChange}/>
            ))}

            <input 
                type="submit" 
                name="submit" 
                value="Register"
                onClick={handleSubmit}
            />

            {<p className='error' hidden={error.length == 0}>Error: {error}</p>}
        </form>
    )
}

function isValid(body, emailRef) {
    if (body.username.length === 0) {
        return "Please provide a username.";
    } 
    if (body.password.length === 0) {
        return "Please provide a password.";
    }
    if (body.email.length === 0 || !emailRef.current.validity.valid) {
        return "Please provide a valid email.";
    }
    if (body.phone && body.phone.length > 0 && !isValidPhoneNumber(body.phone)) {
        return "Please provide a valid phone number.";
    }

    return null;
}

function isValidPhoneNumber(phone) {
    const pattern = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
    return pattern.test(phone);
}

export default Login