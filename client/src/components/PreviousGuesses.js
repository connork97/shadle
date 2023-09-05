import { render } from '@testing-library/react';
import styles from './PreviousGuesses.module.css';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ImCheckmark } from 'react-icons/im';

const PreviousGuesses = ({ colorOfTheDay, previousUserGuesses }) => {
    
    const getContrastColor = (color) => {
        const rgb = color.substring(4, color.length - 1).split(', ');
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness >= 128 ? 'black' : 'white';
      };

    const renderPreviousUserGuesses = [];
    const remainingGuesses = Math.max(0, 6 - previousUserGuesses.length);
    
    if (remainingGuesses > 0) {
        renderPreviousUserGuesses.push(
            <p key={-1} className={styles.previousGuessP}>
                You have {remainingGuesses} guess{remainingGuesses !== 1 && "es"} left.
            </p>
        );
    }
    
    for (let index = 0; index < 6; index++) {
        const guess = previousUserGuesses[index];
    
        if (guess) {
            const guessRGB = `rgb(${guess[0]}, ${guess[1]}, ${guess[2]})`;

            let hintOne, hintTwo, hintThree;
            if (guess[0] < colorOfTheDay[0]) {
                if (guess[0] >= (colorOfTheDay[0] - 10)) hintOne = <FaArrowUp className={styles.hintArrow} style={{background: 'green'}} />
                else if (guess[0] >= (colorOfTheDay[0] - 25)) hintOne = <FaArrowUp className={styles.hintArrow} style={{background: 'gold'}} />
                else if (guess[0] >= (colorOfTheDay[0] - 50)) hintOne = <FaArrowUp className={styles.hintArrow} style={{background: 'rgb(255, 109, 40)'}} />
                else if (guess[0] < (colorOfTheDay[0] - 50)) hintOne = <FaArrowUp className={styles.hintArrow} style={{background: 'red'}} />
            } else if (guess[0] > colorOfTheDay[0]) {
                if (guess[0] <= (colorOfTheDay[0] + 10)) hintOne = <FaArrowDown className={styles.hintArrow} style={{background: 'green'}} />
                else if (guess[0] <= (colorOfTheDay[0] + 25)) hintOne = <FaArrowDown className={styles.hintArrow} style={{background: 'gold'}} />
                else if (guess[0] <= (colorOfTheDay[0] + 50)) hintOne = <FaArrowDown className={styles.hintArrow} style={{background: 'rgb(255, 109, 40)'}} />
                else if (guess[0] > (colorOfTheDay[0] + 50)) hintOne = <FaArrowDown className={styles.hintArrow} style={{background: 'red'}} />
            } else hintOne = <ImCheckmark style={{color: `${getContrastColor(guessRGB)}`}} className={styles.checkmarkHint} />
            // if (guess[0] >= (colorOfTheDay[1] - 25) && guess[1] < colorOfTheDay[1]) hintOne = <FaArrowDown className={styles.hintArrow} style={{background: 'green'}} />
            if (guess[1] < colorOfTheDay[1]) {
                if (guess[1] >= (colorOfTheDay[1] - 10)) hintTwo = <FaArrowUp className={styles.hintArrow} style={{background: 'green'}} />
                else if (guess[1] >= (colorOfTheDay[1] - 25)) hintTwo = <FaArrowUp className={styles.hintArrow} style={{background: 'gold'}} />
                else if (guess[1] >= (colorOfTheDay[1] - 50)) hintTwo = <FaArrowUp className={styles.hintArrow} style={{background: 'rgb(255, 109, 40)'}} />
                else if (guess[1] < (colorOfTheDay[1] - 50)) hintTwo = <FaArrowUp className={styles.hintArrow} style={{background: 'red'}} />
            } else if (guess[1] > colorOfTheDay[1]) {
                if (guess[1] <= (colorOfTheDay[1] + 10)) hintTwo = <FaArrowDown className={styles.hintArrow} style={{background: 'green'}} />
                else if (guess[1] <= (colorOfTheDay[1] + 25)) hintTwo = <FaArrowDown className={styles.hintArrow} style={{background: 'gold'}} />
                else if (guess[1] <= (colorOfTheDay[1] + 50)) hintTwo = <FaArrowDown className={styles.hintArrow} style={{background: 'rgb(255, 109, 40)'}} />
                else if (guess[1] > (colorOfTheDay[1] + 50)) hintTwo = <FaArrowDown className={styles.hintArrow} style={{background: 'red'}} />
            } else hintTwo = <ImCheckmark style={{color: `${getContrastColor(guessRGB)}`}} className={styles.checkmarkHint} />
            if (guess[2] < colorOfTheDay[2]) {
                if (guess[2] >= (colorOfTheDay[2] - 10)) hintThree = <FaArrowUp className={styles.hintArrow} style={{background: 'green'}} />
                else if (guess[2] >= (colorOfTheDay[2] - 25)) hintThree = <FaArrowUp className={styles.hintArrow} style={{background: 'gold'}} />
                else if (guess[2] >= (colorOfTheDay[2] - 50)) hintThree = <FaArrowUp className={styles.hintArrow} style={{background: 'rgb(255, 109, 40)'}} />
                else if (guess[2] < (colorOfTheDay[2] - 50)) hintThree = <FaArrowUp className={styles.hintArrow} style={{background: 'red'}} />
            } else if (guess[2] > colorOfTheDay[2]) {
                if (guess[2] <= (colorOfTheDay[2] + 10)) hintThree = <FaArrowDown className={styles.hintArrow} style={{background: 'green'}} />
                else if (guess[2] <= (colorOfTheDay[2] + 25)) hintThree = <FaArrowDown className={styles.hintArrow} style={{background: 'gold'}} />
                else if (guess[2] <= (colorOfTheDay[2] + 50)) hintThree = <FaArrowDown className={styles.hintArrow} style={{background: 'rgb(255, 109, 40)'}} />
                else if (guess[2] > (colorOfTheDay[2] + 50)) hintThree = <FaArrowDown className={styles.hintArrow} style={{background: 'red'}} />
            } else hintThree = <ImCheckmark style={{color: `${getContrastColor(guessRGB)}`}} className={styles.checkmarkHint} />
            
            renderPreviousUserGuesses.push(
                <p 
                    key={index}
                    className={styles.previousGuessP}
                    style={{ backgroundColor: `${guessRGB}`, color: `${getContrastColor(guessRGB)}`}}
                >
                    rgb({guess[0]}{hintOne}, {guess[1]}{hintTwo}, {guess[2]}{hintThree})
                </p>
            );
        } else if (renderPreviousUserGuesses.length < 6) {
            renderPreviousUserGuesses.push(
                <p 
                    key={index}
                    className={styles.previousGuessP}
                >
                    {/* You have {6 - previousUserGuesses.length} guesses remaining. */}
                    &nbsp;
                </p>
            );
        }
    }
    

    return (
        <div className={styles.previousGuessesWrapperDiv}>
            {renderPreviousUserGuesses}
        </div>
    );
};

export default PreviousGuesses;