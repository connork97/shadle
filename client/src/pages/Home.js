import styles from './Home.module.css';

import { Fragment } from "react";

import Navbar from '../components/Navbar';
import Color from '../components/Color';
import Guess from '../components/Guess';
import PreviousGuesses from '../components/PreviousGuesses';

const Home = ({ openInstructionsModal, colorOfTheDay, rgbColorOfTheDay, setGameResult, previousUserGuesses, setPreviousUserGuesses, openGameOverModal}) => {
    return (
        <Fragment>
            {/* <Navbar 
                openInstructionsModal={openInstructionsModal}
            /> */}
            <Color
                colorOfTheDay={colorOfTheDay}
                rgbColorOfTheDay={rgbColorOfTheDay}
            />
            <div className='currentAndPastGuessWrapperDiv'>
                <Guess
                    setGameResult={setGameResult}
                    colorOfTheDay={colorOfTheDay}
                    rgbColorOfTheDay={rgbColorOfTheDay}
                    previousUserGuesses={previousUserGuesses}
                    setPreviousUserGuesses={setPreviousUserGuesses}
                    openGameOverModal={openGameOverModal}
                />
                <PreviousGuesses
                    className={styles.previousGuesses}
                    colorOfTheDay={colorOfTheDay}
                    previousUserGuesses={previousUserGuesses}
                />
            </div>
        </Fragment>
    )
}

export default Home;