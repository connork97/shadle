import { type } from '@testing-library/user-event/dist/type';
import styles from './Guess.module.css';

import React, { useState } from 'react';

const Guess = ({ colorOfTheDay }) => {

    const [userGuess, setUserGuess] = useState([0, 0, 0])
    console.log(userGuess)
    const handleUserGuessChange = (event, index) => {
        const { value } = event.target;
        // console.log(name, value)
        setUserGuess(prevGuess => {
            const updatedGuess = [...prevGuess];
            updatedGuess[index] = parseInt(value);
            return updatedGuess;
        });
    };

    const handleGuessSubmit = (event) => {
        // console.log(userGuess)
        event.preventDefault();
        console.log("Color of the day", colorOfTheDay);
        if (userGuess[0] === colorOfTheDay[0] && userGuess[1] === colorOfTheDay[1] && userGuess[2] === colorOfTheDay[2]) {
            console.log("You got it!  The color of the day is: ", colorOfTheDay)
        } else {
            console.log("Sorry, try again.", userGuess)
        }
    };

    return (
        <div className={styles.guessWrapperDiv}>
            <form className={styles.guessForm} onSubmit={handleGuessSubmit}>
                <input
                    type="number"
                    value={userGuess[0]}
                    min={0}
                    max={255}
                    onChange={(event) => handleUserGuessChange(event, 0)}
                >
                </input>
                <input
                    type="number"
                    value={userGuess[1]}
                    min={0}
                    max={255}
                    onChange={(event) => handleUserGuessChange(event, 1)}
                >
                </input>
                <input
                    type="number"
                    value={userGuess[2]}
                    min={0}
                    max={255}
                    onChange={(event) => handleUserGuessChange(event, 2)}
                >
                </input>
                <button type="submit">Place Guess!</button>
            </form>
        </div>
    )
};

export default Guess;