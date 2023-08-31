import styles from './InstructionsModal.module.css';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ImCheckmark } from 'react-icons/im';

const InstructionsModal = ({ instructionsModalIsOpen, closeInstructionsModal }) => {
    if (!instructionsModalIsOpen) return null;

    return (
        <div className={styles.instructionsModalOverlay}>
            <div className={styles.instructionsModalDiv}>
                <h1 className={styles.welcomeH1}>Welcome to
                    <span style={{color: 'red'}}>&nbsp;S</span>
                    <span style={{color: 'orange'}}>h</span>
                    <span style={{color: 'gold'}}>a</span>
                    <span style={{color: 'green'}}>d</span>
                    <span style={{color: 'blue'}}>l</span>
                    <span style={{color: 'indigo'}}>e</span>
                    <span style={{color: 'darkviolet'}}>!</span>
                </h1>
                <h2 className={styles.welcomeH2}>The RGB Color Guessing Game</h2>
                <p className={styles.instructionsP}>You have 6 attempts to guess the exact RGB value of the color on the screen.</p>
                <p className={styles.instructionsP}>You'll also get hints along the way!  Here's the rubric:</p>
                <p className={styles.hintsP}><FaArrowDown /> - You guessed too low.</p>
                <p className={styles.hintsP}><FaArrowUp /> - You guessed too high.</p>
                <p className={styles.hintsP}><ImCheckmark /> - You got it on the dot!</p>
                {/* <p className={styles.colorP}>{rgbColorOfTheDay}</p> */}
                <button className={styles.closeButton} onClick={closeInstructionsModal}>
                    <span className={styles.closeButtonSpan} style={{opacity: '1'}}>Got it!</span>
                </button>
            </div>
        </div>
    )
};

export default InstructionsModal;