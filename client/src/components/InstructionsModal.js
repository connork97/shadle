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
                <p className={styles.instructionsP}>You have <u><b><em>6 attempts</em></b></u> to guess the exact RGB value of the color on the screen.</p>
                <p className={styles.instructionsP}>You'll also get hints along the way!  Here's the rubric:</p>
                <div className={styles.rubricDiv}>
                    <div className={styles.hintDiv}>
                        <p className={styles.arrowHintP}><FaArrowUp className={styles.instructionsIcon} /> - The answer is <b><em>higher</em></b> than you guessed.</p>
                        <p className={styles.arrowHintP}><FaArrowDown className={styles.instructionsIcon} /> - The answer is <b><em>lower</em></b> than you guessed.</p>
                        <p className={styles.arrowHintP}><ImCheckmark className={styles.instructionsIcon} /> - You got it on the dot!</p>
                    </div>
                    <div className={styles.hintDiv}>
                        <p className={styles.colorHintP}><span style={{color: 'green', fontWeight: 'bold'}}>Green Arrows</span> mean you're <em><b>very</b></em> close.</p>
                        <p className={styles.colorHintP}><span style={{color: 'gold', fontWeight: 'bold'}}>Yellow Arrows</span> mean you're close.</p>
                        <p className={styles.colorHintP}><span style={{color: 'rgb(255, 109, 40)', fontWeight: 'bold'}}>Orange Arrows</span> mean you're not far off.</p>
                        <p className={styles.colorHintP}><span style={{color: 'red', fontWeight: 'bold'}}>Red Arrows</span> mean you're far off.</p>
                    </div>
                </div>
                <button className={styles.closeButton} onClick={closeInstructionsModal}>
                    <span className={styles.closeButtonSpan} style={{opacity: '1'}}>Got it!</span>
                </button>
            </div>
        </div>
    )
};

export default InstructionsModal;