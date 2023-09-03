import styles from './Login.module.css';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedInUser }) => {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleLoginInfoChange = (event => {
        const { name, value } = event.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value
          });
    })

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo),
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log("Login Response Data: ", responseData);
                setLoggedInUser(responseData)
                localStorage.setItem('_id_hash', responseData._id_hash)
                navigate('/profile');
            }
            else {
                console.log("Login Error: !response.ok")
            }
        }
        catch (error) {
            console.error("An error occurred during login: ", error);
        }
    }
    return (
        <div className={styles.loginWrapperDiv}>
            <h1 className={styles.loginH1}>Login Page</h1>
            <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
                <input 
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={loginInfo.email}
                    className={styles.loginFormInput}
                    onChange={handleLoginInfoChange}
                    >
                </input>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={loginInfo.password}
                    className={styles.loginFormInput}
                    onChange={handleLoginInfoChange}
                    >
                </input>
                <button type='submit' className={styles.loginButton}>Login</button>
            </form>
        </div>
    )
};

export default Login;