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
    
    // const renderPreviousUserGuesses = previousUserGuesses.map((guess, index) => {
    //     let hintOne
    //     let hintTwo
    //     let hintThree
    //     if (guess[0] < colorOfTheDay[0]) hintOne = '↑'
    //     else if (guess[0] === colorOfTheDay[0]) hintOne = '✔'
    //     else hintOne = '↓'
    //     if (guess[1] < colorOfTheDay[1]) hintTwo = '↑'
    //     else if (guess[1] === colorOfTheDay[1]) hintTwo = '✔'
    //     else hintTwo = '↓'
    //     if (guess[2] < colorOfTheDay[2]) hintThree = '↑'
    //     else if (guess[2] === colorOfTheDay[2]) hintThree = '✔'
    //     else hintThree = '↓'
        
    //     const guessRGB = `rgb(${guess[0]}, ${guess[1]}, ${guess[2]})`

    //     console.log(index)
    //     return (
    //         <p 
    //             className={styles.previousGuessP}
    //             style={{ backgroundColor: `${guessRGB}`, color: `${getContrastColor(guessRGB)}`}}
    //         >
    //             rgb({guess[0]}, {guess[1]}, {guess[2]}) → {hintOne} {hintTwo} {hintThree}
    //         </p>
    //     )
    // })
    const renderPreviousUserGuesses = [];
    const remainingGuesses = Math.max(0, 6 - previousUserGuesses.length);
    
    if (remainingGuesses > 0) {
        renderPreviousUserGuesses.push(
            <p key={-1} className={styles.previousGuessP}>
                You have {remainingGuesses} guesses left.
            </p>
        );
    }
    
    for (let index = 0; index < 6; index++) {
        const guess = previousUserGuesses[index];
    
        if (guess) {
            const guessRGB = `rgb(${guess[0]}, ${guess[1]}, ${guess[2]})`;
    
            let hintOne, hintTwo, hintThree;
            if (guess[0] < colorOfTheDay[0]) hintOne = <FaArrowDown className={styles.hintArrow} />
            else if (guess[0] === colorOfTheDay[0]) hintOne = <ImCheckmark style={{color: `${getContrastColor(guessRGB)}`}} className={styles.checkmarkHint} />
            else hintOne = <FaArrowUp className={styles.hintArrow} />
            if (guess[1] < colorOfTheDay[1]) hintTwo = <FaArrowDown className={styles.hintArrow} />
            else if (guess[1] === colorOfTheDay[1]) hintTwo = <ImCheckmark className={styles.checkmarkHint} />
            else hintTwo = <FaArrowUp className={styles.hintArrow} />
            if (guess[2] < colorOfTheDay[2]) hintThree = <FaArrowDown className={styles.hintArrow} />
            else if (guess[2] === colorOfTheDay[2]) hintThree = <ImCheckmark className={styles.checkmarkHint} />
            else hintThree = <FaArrowUp className={styles.hintArrow} />
            // Logic for generating hints
            
            
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