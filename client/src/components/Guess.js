import { type } from '@testing-library/user-event/dist/type';
import styles from './Guess.module.css';

import React, { useState } from 'react';

import useGetContrastColor from '../utils/useGetContrastColor';

const Guess = ({ postGameResults, setGameResult, colorOfTheDay, rgbColorOfTheDay, previousUserGuesses, setPreviousUserGuesses, openGameOverModal, openLoseModal }) => {

    const [currentUserGuess, setCurrentUserGuess] = useState([0, 0, 0]);

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
        // console.log("Color of the day", colorOfTheDay);
        if (!JSON.stringify(previousUserGuesses).includes(JSON.stringify(currentUserGuess)) && previousUserGuesses.length < 6) {
            if (JSON.stringify(currentUserGuess) === JSON.stringify(colorOfTheDay)) {
                setPreviousUserGuesses((prevGuesses) => {
                    return [currentUserGuess, ...prevGuesses]
                });
                setGameResult(true);
                // postGameResults();
                openGameOverModal();
            // } else if (previousUserGuesses.length > 1 && (previousUserGuesses[0][0] === previousUserGuesses[1][0] && previousUserGuesses[0][0] !== colorOfTheDay[0]) || (previousUserGuesses[0][1] === previousUserGuesses[1][1]  && previousUserGuesses[0][1] !== colorOfTheDay[1]) || (previousUserGuesses[0][2] === previousUserGuesses[1][2]  && previousUserGuesses[0][2] !== colorOfTheDay[2])) {
                // window.confirm("It looks like you have the same incorrect value as your last guess for one or more of your answers. Are you sure you want to continue?")
            } 
            else if (previousUserGuesses.length === 5) {
                setPreviousUserGuesses((prevGuesses) => {
                    return [currentUserGuess, ...prevGuesses]
                });
                setGameResult(false);
                // postGameResults();
                openGameOverModal();
                // window.alert("Sorry, you lost.")
            } 
            else {
                setPreviousUserGuesses((prevGuesses) => {
                    return [currentUserGuess, ...prevGuesses]
                });
            };
            document.body.style.backgroundColor = `rgba(${currentUserGuess[0]}, ${currentUserGuess[1]}, ${currentUserGuess[2]}, 0.25)`;
        } else {
            window.alert("You already guessed that!  Try again.")
        }
    };

    return (
        <div className={styles.guessWrapperDiv}>
            <form className={styles.guessForm} onSubmit={handleGuessSubmit}>
                <div className={styles.userGuessesWrapper}>
                    <div className={styles.userGuessDiv}>
                        <label className={styles.userGuessLabel}>R</label>
                        <input
                            type="number"
                            value={currentUserGuess[0]}
                            min={0}
                            max={255}
                            className={styles.userGuessInput}
                            onChange={(event) => handleUserGuessChange(event, 0)}
                            >
                        </input>
                    </div>
                    {/* <br></br> */}
                    <div className={styles.userGuessDiv}>
                        <label className={styles.userGuessLabel}>G</label>
                        <input
                            type="number"
                            value={currentUserGuess[1]}
                            min={0}
                            max={255}
                            className={styles.userGuessInput}
                            onChange={(event) => handleUserGuessChange(event, 1)}
                            >
                        </input>
                    </div>
                    {/* <br></br> */}
                    <div className={styles.userGuessDiv}>
                        <label className={styles.userGuessLabel}>B</label>
                        <input
                            type="number"
                            value={currentUserGuess[2]}
                            min={0}
                            max={255}
                            className={styles.userGuessInput}
                            onChange={(event) => handleUserGuessChange(event, 2)}
                        >
                        </input>
                    </div>
                </div>
                {/* <br></br> */}
                <button className={styles.submitGuessButton} style={{backgroundColor: `${rgbColorOfTheDay}`, color: `${useGetContrastColor(rgbColorOfTheDay)}`}} type="submit">Place Guess!</button>
            </form>
        </div>
    )
};

export default Guess;