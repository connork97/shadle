import styles from './Signup.module.css';

import React, { Fragment, useState } from 'react';

import Navbar from '../components/Navbar';

const Signup = ({ openInstructionsModal }) => {

    const [userSignupInfo, setUserSignupInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleUserSignupInfoChange = (event) => {
        const { name, value } = event.target;
        setUserSignupInfo({
            ...userSignupInfo,
            [name]: value
          });
    }

    const handleUserSignupSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:5555/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userSignupInfo),
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log("Signup Response Data: ", responseData);
            }
            else {
                console.log("Signup Error: !response.ok")
            }
        }
        catch (error) {
            console.error("An error occurred during signup: ", error);
        }
    }

    // const handleUserSignupSubmit = (event) => {
    //     event.preventDefault();
    //     fetch('http://localhost:5555/signup', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(userSignupInfo),
    //     })
    //     .then((response) => response.json())
    //     .then((signupData) => console.log(signupData))
    // }

    return (
        <Fragment>
            <Navbar openInstructionsModal={openInstructionsModal} />
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
                        >
                    </input>
                    <input
                        name='lastName'
                        type='text'
                        placeholder='Last Name'
                        value={userSignupInfo.lastName}
                        className={styles.signupFormInput}
                        onChange={handleUserSignupInfoChange}
                    >
                    </input>
                    <input 
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={userSignupInfo.email}
                        className={styles.signupFormInput}
                        onChange={handleUserSignupInfoChange}
                        >
                    </input>
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={userSignupInfo.password}
                        className={styles.signupFormInput}
                        onChange={handleUserSignupInfoChange}
                        >
                    </input>
                    <button type='submit' className={styles.createAccountButton}>Create Account!</button>
                </form>
            </div>
        </Fragment>
    )
}

export default Signup;