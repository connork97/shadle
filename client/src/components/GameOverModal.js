import useGetContrastColor from '../utils/useGetContrastColor';
import styles from './GameOverModal.module.css';

import { useEffect } from 'react';

const GameOverModal = ({ colorOfTheDay, gameIsPosted, roundedPercentScore, previousUserGuesses, contrastColor, gameResult, rgbColorOfTheDay, opaqueRgbColorOfTheDay, gameOverModalIsOpen, closeGameOverModal }) => {
    if (!gameOverModalIsOpen) return null;

    const lastUserGuess = `rgb(${previousUserGuesses[0][0]}, ${previousUserGuesses[0][1]}, ${previousUserGuesses[0][2]})`

    const overlayBackgroundColor = {
        backgroundColor: opaqueRgbColorOfTheDay
    }

    const buttonBackgroundColor ={
        backgroundColor: `${rgbColorOfTheDay}`,
        color: `${contrastColor}`,
        marginTop: `${gameResult && '2rem'}`
    }

    const colorOfTheDayStyle = {
        color: `${rgbColorOfTheDay}`
    }

    return (
        <div className={styles.gameOverModalOverlay} style={overlayBackgroundColor}>
            <div className={styles.gameOverModalDiv}>
                <p className={styles.resultP}>You Scored: {roundedPercentScore}% in {previousUserGuesses.length} guesses.</p>
                <p className={styles.guessesP}></p>
                {/* <p className={styles.percentScoreP}><b>Score: </b> {roundedPercentScore()}%</p> */}
                {!gameResult && <p className={styles.yourColorP}>Your final guess was: 
                <br></br>
                <span className={styles.colorP} style={{color: `${lastUserGuess}`, fontWeight: 'bold'}}>{lastUserGuess}</span>
                </p>
                }
                <p className={styles.correctColorP}>The correct color of the day {gameResult === true ? "is" : "was"}:</p>
                <p className={styles.colorP} style={colorOfTheDayStyle}>{rgbColorOfTheDay}</p>
                {/* <button className={styles.closeButton} style={buttonBackgroundColor} onClick={closeGameOverModal}>
                Close
                </button> */}
                {gameIsPosted ?
                <button className={styles.closeButton} style={buttonBackgroundColor} onClick={() => window.location.reload()}>
                    Play Again
                </button>
                :
                <div className={styles.loadingSpinner}>
                </div>
                }

            </div>
        </div>
    )
};

export default GameOverModal;