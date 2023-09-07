import styles from './Login.module.css';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner'

const Login = ({ setLoggedInUser }) => {

    const navigate = useNavigate();

    const [loggingIn, setLoggingIn] = useState(false);

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
        setLoggingIn(true);
        try {
            const response = await fetch('https://shadle-back-end.onrender.com/login', {
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
                window.alert("This username and/or password doesn't match our records. \nPlease double check them and try again.")
            }
            // setLoggingIn(false);
        }
        catch (error) {
            console.error("An error occurred during login: ", error);
            // setLoggingIn(false);
        }
        setLoggingIn(false);
    }
    return (
        <div className={styles.loginWrapperDiv}>
            <h1 className={styles.loginH1}>Login</h1>
            <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
                <input 
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={loginInfo.email}
                    className={styles.loginFormInput}
                    onChange={handleLoginInfoChange}
                    required
                    >
                </input>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={loginInfo.password}
                    className={styles.loginFormInput}
                    onChange={handleLoginInfoChange}
                    required
                    >
                </input>              
                <button type='submit' className={styles.loginButton}>Login</button>
                {loggingIn && 
                <div className={styles.loadingSpinner}>
                </div>
                }
            </form>
        </div>
    )
};

export default Login;