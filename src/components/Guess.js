import { type } from '@testing-library/user-event/dist/type';
import styles from './Guess.module.css';

import React, { useState } from 'react';

const Guess = ({ colorOfTheDay, previousUserGuesses, setPreviousUserGuesses, openWinModal }) => {

    const [currentUserGuess, setCurrentUserGuess] = useState([0, 0, 0])

    const handleUserGuessChange = (event, index) => {
        const { value } = event.target;
        setCurrentUserGuess(prevGuess => {
            const updatedGuess = [...prevGuess];
            updatedGuess[index] = parseInt(value);
            return updatedGuess;
        });
    };

    const handleGuessSubmit = (event) => {
        event.preventDefault();
        console.log("Color of the day", colorOfTheDay);
        if (!JSON.stringify(previousUserGuesses).includes(JSON.stringify(currentUserGuess))) {
            if (JSON.stringify(currentUserGuess) === JSON.stringify(colorOfTheDay)) {
                console.log("You got it!  The color of the day is: ", colorOfTheDay)
                openWinModal()
            } else {
                console.log("Sorry, try again.", currentUserGuess)
            };
            setPreviousUserGuesses((prevGuesses) => {
                return [currentUserGuess, ...prevGuesses]
            });
            setCurrentUserGuess([0, 0, 0]);
        } else {
            console.log("You already guessed that number!")
        }
    };

    return (
        <div className={styles.guessWrapperDiv}>
            <form className={styles.guessForm} onSubmit={handleGuessSubmit}>
                <input
                    type="number"
                    value={currentUserGuess[0]}
                    min={0}
                    max={255}
                    onChange={(event) => handleUserGuessChange(event, 0)}
                >
                </input>
                <input
                    type="number"
                    value={currentUserGuess[1]}
                    min={0}
                    max={255}
                    onChange={(event) => handleUserGuessChange(event, 1)}
                >
                </input>
                <input
                    type="number"
                    value={currentUserGuess[2]}
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