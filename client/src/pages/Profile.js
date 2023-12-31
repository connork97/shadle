import styles from './Profile.module.css';

import { useState, useEffect, Fragment } from 'react';

import Spinner from '../components/Spinner';

const Profile = ({ loggedInUser }) => {

    const [userStats, setUserStats] = useState({})

    const [statsAreFetched, setStatsAreFetched] = useState(false);

    // console.log(loggedInUser)

    const fetchLoggedInUserGames = async() => {
        try {
            const response = await fetch(`https://shadle-back-end.onrender.com/games_by_user/${loggedInUser._id_hash}`)
            setStatsAreFetched(true);
            if (response.ok) {
                const gameData = await response.json();
                console.log("User game data: ", gameData)
                setUserStats(gameData)
            }
            else console.log("User game data error: !response.ok")
        }
        catch (error) {
            console.error("An error occurred when fetching user game data", error)
        }
    }

    useEffect(() => {
        fetchLoggedInUserGames();
    }, [loggedInUser])

    return (
        <div className={styles.profileWrapperDiv}>
            <h1 className={styles.profileH1}>Hi {loggedInUser.first_name}.</h1>
            <h2 className={styles.profileH2}>Take a look at your stats:</h2>

        {!statsAreFetched ? 
        // <div className={styles.mainProfileDiv}>
        <div className={styles.loadingSpinner}>
        </div>
        // </div>
        :
        <div className={styles.mainProfileDiv}>
            <p className={styles.profileP}>Total Games Played: {userStats.total_games}</p>
            <p className={styles.profileP}>Wins: {userStats.total_wins}
            <span className={styles.lossesSpan}>Losses: {userStats.total_losses}</span>
            </p>
            <p className={styles.profileP}>Average Score: {Math.round(userStats.average_score * 100) / 100}%</p>
            {/* <p>Wins/Losses: {winLossRatio}</p> */}
            <p className={styles.profileP}>Average Guesses Per Win: {userStats.average_guesses > 0 ? Math.round(userStats.average_guesses * 100) / 100 : 'N/A'}</p>
            {/* {gamesBailedOn > 0 &&<p>(You bailed on {gamesBailedOn} games...)</p>} */}
            </div>
        }
        </div>
    )
}

export default Profile;