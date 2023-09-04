import styles from './Signup.module.css';

import React, { Fragment, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = ({ setLoggedInUser }) => {

    const navigate = useNavigate();

    const [userSignupInfo, setUserSignupInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [confirmPassword, setConfirmPassword] = useState('')

    const handleUserSignupInfoChange = (event) => {
        const { name, value } = event.target;
        setUserSignupInfo({
            ...userSignupInfo,
            [name]: value
          });
    }

    const handleUserSignupSubmit = async (event) => {
        event.preventDefault()
        if (userSignupInfo.password === confirmPassword) {
            try {
                const response = await fetch('https://shadle-back-end.onrender.com/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userSignupInfo),
                })
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Signup Response Data: ", responseData);
                    setLoggedInUser(responseData);
                    localStorage.setItem('_id_hash', responseData._id_hash)
                    navigate('/profile')
                }
                else {
                    window.alert("Sorry! This email is already taken.  Try a different one.")
                }
            }
            catch (error) {
                console.error("An error occurred during signup: ", error);
            }
        }
        else window.alert("Your passwords must match.")
        }



    return (
        <Fragment>
            {/* <Navbar openInstructionsModal={openInstructionsModal} /> */}
            <div>
                <h1 className={styles.signupH1}>Create An Account!</h1>
                <form className={styles.signupForm} onSubmit={handleUserSignupSubmit}>
                    <input
                        name='firstName'
                        type='text'
                        placeholder='First Name'
                        value={userSignupInfo.firstName}
                        className={styles.signupFormInput}
                        onChange={handleUserSignupInfoChange}
                        required
                    >
                    </input>
                    <input
                        name='lastName'
                        type='text'
                        placeholder='Last Name'
                        value={userSignupInfo.lastName}
                        className={styles.signupFormInput}
                        onChange={handleUserSignupInfoChange}
                        required
                    >
                    </input>
                    <input 
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={userSignupInfo.email}
                        className={styles.signupFormInput}
                        onChange={handleUserSignupInfoChange}
                        required
                    >
                    </input>
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={userSignupInfo.password}
                        className={styles.signupFormInput}
                        onChange={handleUserSignupInfoChange}
                        required
                    >
                    </input>
                    <input
                        name='password'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        className={styles.signupFormInput}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    >
                    </input>
                    <button type='submit' className={styles.createAccountButton}>Create Account!</button>
                </form>
            </div>
        </Fragment>
    )
}

export default Signup;