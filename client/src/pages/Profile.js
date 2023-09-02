import styles from './Profile.module.css';

import { useState, useEffect } from 'react';

const Profile = ({ loggedInUser }) => {

    const [userStats, setUserStats] = useState({})

    const fetchLoggedInUserGames = async() => {
        try {
            const response = await fetch(`http://localhost:5555/games_by_user/${loggedInUser.id}`)
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
    }, [])

    return (
        <div className={styles.profileWrapperDiv}>
            <h1>Hi {loggedInUser.first_name}.</h1>
            <h2>Here's a rundown of your overall stats:</h2>
            <p>Total Games Played: {userStats.total_games}</p>
            <p>Wins: {userStats.total_wins}</p>
            <p>Losses: {userStats.total_losses}</p>
            <p>Average Score: {Math.round(userStats.average_score * 100) / 100}%</p>
            {/* <p>Wins/Losses: {winLossRatio}</p> */}
            <p>Average Guesses Per Win: {userStats.average_guesses > 0 ? Math.round(userStats.average_guesses * 100) / 100 : 'N/A'}</p>
            {/* {gamesBailedOn > 0 &&<p>(You bailed on {gamesBailedOn} games...)</p>} */}
        </div>
    )
}

export default Profile;