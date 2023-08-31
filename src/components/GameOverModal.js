import styles from './GameOverModal.module.css';

const GameOverModal = ({ gameResult, rgbColorOfTheDay, opaqueRgbColorOfTheDay, gameOverModalIsOpen, closeGameOverModal }) => {
    if (!gameOverModalIsOpen) return null;

    const overlayBackgroundColor = {
        backgroundColor: opaqueRgbColorOfTheDay
    }

    const buttonBackgroundColor ={
        backgroundColor: `${rgbColorOfTheDay}`
    }

    const colorOfTheDayStyle = {
        color: `${rgbColorOfTheDay}`
    }

    return (
        <div className={styles.winModalOverlay} style={overlayBackgroundColor}>
            <div className={styles.winModalDiv}>
                <p className={styles.youWonP}>{gameResult === true ? "Congratulations, you won!" : "Sorry, you lost."}</p>
                <p className={styles.correctColorP}>The correct collor of the day {gameResult === true ? "is" : "was"}:</p>
                <p className={styles.colorP} style={colorOfTheDayStyle}>{rgbColorOfTheDay}</p>
                <button className={styles.closeButton} style={buttonBackgroundColor} onClick={closeGameOverModal}>
                Close
                </button>
            </div>
        </div>
    )
};

export default GameOverModal;