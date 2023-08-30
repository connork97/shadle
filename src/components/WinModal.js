import styles from './WinModal.module.css';

const WinModal = ({ colorOfTheDay, rgbColorOfTheDay, opaqueRgbColorOfTheDay, winModalIsOpen, closeWinModal }) => {
    if (!winModalIsOpen) return null;

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
                <p className={styles.youWonP}>You won!</p>
                <p className={styles.correctColorP}>The correct collor of the day is:</p>
                <p className={styles.colorP} style={colorOfTheDayStyle}>{rgbColorOfTheDay}</p>
                <button className={styles.closeButton} style={buttonBackgroundColor} onClick={closeWinModal}>
                Close
                </button>
            </div>
        </div>
    )
};

export default WinModal;