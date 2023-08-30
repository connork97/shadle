import { render } from '@testing-library/react';
import styles from './PreviousGuesses.module.css';

const PreviousGuesses = ({ colorOfTheDay, previousUserGuesses }) => {
    const getContrastColor = (color) => {
        const rgb = color.substring(4, color.length - 1).split(', ');
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness >= 128 ? 'black' : 'white';
      };
    const renderPreviousUserGuesses = previousUserGuesses.map((guess, index) => {
        let hintOne
        let hintTwo
        let hintThree
        if (guess[0] < colorOfTheDay[0]) hintOne = '↑'
        else hintOne = '↓'
        if (guess[1] < colorOfTheDay[1]) hintTwo = '↑'
        else hintTwo = '↓'
        if (guess[2] < colorOfTheDay[2]) hintThree = '↑'
        else hintThree = '↓'
        
        const guessRGB = `rgb(${guess[0]}, ${guess[1]}, ${guess[2]})`

        console.log(index)
        return (
            <p 
                className={styles.previousGuessP}
                style={{ backgroundColor: `${guessRGB}`, color: `${getContrastColor(guessRGB)}`}}
            >
                rgb({guess[0]}, {guess[1]}, {guess[2]}) → {hintOne} {hintTwo} {hintThree}
            </p>
        )
    })

    

    return (
        <div className={styles.previousGuessesWrapperDiv}>
            {renderPreviousUserGuesses}
        </div>
    );
};

export default PreviousGuesses;