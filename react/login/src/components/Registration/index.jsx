import React from "react";
import { useState, useRef, useCallback } from "react";

let host;
if (import.meta.env.DEV) {
    host = "http://localhost:8080";
} else {
    host = "";
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
            console.log(responseBody);
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

export default Registration