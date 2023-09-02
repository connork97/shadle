import useGetContrastColor from '../utils/useGetContrastColor';
import styles from './GameOverModal.module.css';

const GameOverModal = ({ previousUserGuesses, contrastColor, gameResult, rgbColorOfTheDay, opaqueRgbColorOfTheDay, gameOverModalIsOpen, closeGameOverModal }) => {
    if (!gameOverModalIsOpen) return null;

    const lastUserGuess = `rgb(${previousUserGuesses[0][0]}, ${previousUserGuesses[0][1]}, ${previousUserGuesses[0][2]})`

    const overlayBackgroundColor = {
        backgroundColor: opaqueRgbColorOfTheDay
    }

    const buttonBackgroundColor ={
        backgroundColor: `${rgbColorOfTheDay}`,
        color: `${contrastColor}`
    }

    const colorOfTheDayStyle = {
        color: `${rgbColorOfTheDay}`
    }

    return (
        <div className={styles.gameOverModalOverlay} style={overlayBackgroundColor}>
            <div className={styles.gameOverModalDiv}>
                <p className={styles.resultP}>{gameResult === true ? "Congratulations, you won!" : "Sorry, you lost."}</p>
                {!gameResult && <p className={styles.yourColorP}>Your final guess was: 
                <br></br>
                <span className={styles.colorP} style={{color: `${lastUserGuess}`, fontWeight: 'bold'}}>{lastUserGuess}</span></p>
                }
                <p className={styles.correctColorP}>The correct color of the day {gameResult === true ? "is" : "was"}:</p>
                <p className={styles.colorP} style={colorOfTheDayStyle}>{rgbColorOfTheDay}</p>
                <button className={styles.closeButton} style={buttonBackgroundColor} onClick={closeGameOverModal}>
                Close
                </button>
                <button className={styles.closeButton} style={buttonBackgroundColor} onClick={() => window.location.reload()}>
                Play Again
                </button>
            </div>
        </div>
    )
};

export default GameOverModal;