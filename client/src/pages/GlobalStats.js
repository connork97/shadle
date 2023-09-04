import { Fragment } from 'react';
import styles from './GlobalStats.module.css';

import { useState, useEffect } from 'react';

const GlobalStats = () => {

    const [globalStats, setGlobalStats] = useState({})

    const fetchGlobalStats = async() => {
        try {
            const response = await fetch('https://shadle-back-end.onrender.com/global-stats')
            if (response.ok) {
                const globalStatsData = await response.json();
                console.log(globalStatsData);
                setGlobalStats(globalStatsData);
            }
            else console.log("error: !response.ok")
        }
        catch(error) {
            console.error("error: ", error)
        }
    }

    useEffect(() => {
        fetchGlobalStats();
    }, [])

    const renderLeaders = (category) => category.map((leader) => {
        return (
            <p className={styles.leaderP}>{leader.name}. ({Math.round(leader.count * 100) / 100}
            {category === globalStats.average_score_leaders && '%'})</p>
        )
    })

    return (
        <Fragment>
            <h1 className={styles.statsH1}>Global Stats</h1>
            <div className={styles.statsWrapperDiv}>
            <div className={styles.averageStatsDiv}>
                <p className={styles.statsTitle}>Site Totals</p>
                <p className={styles.statsLabel}>Games Played: {globalStats.total_games_played}</p>                
                <p className={styles.statsLabel}>Average Score: {Math.round(globalStats.average_score * 100) / 100}%</p>
                <p className={styles.statsLabel}>Wins: {globalStats.total_wins}
                <span style={{marginLeft: '3rem'}}>Losses: {globalStats.total_games_played - globalStats.total_wins}</span>
                </p>
                <p className={styles.statsLabel}>Average Guesses Per Win: {Math.round(globalStats.average_guesses * 100) / 100}</p>
            </div>
            <div className={styles.leaderboardDiv}>
                <p className={styles.statsTitle}>Leaders</p>
                <div className={styles.innerLeaderboardWrapper}>
                    <div className={styles.leadersDiv}>
                        <p className={styles.statsLabel}>Games Played:</p>
                        {Object.keys(globalStats).length > 0 && renderLeaders(globalStats.games_played_leaders)}
                    </div>
                    <div className={styles.leadersDiv}>
                        <p className={styles.statsLabel}>Wins:</p>
                        {Object.keys(globalStats).length > 0 && renderLeaders(globalStats.win_leaders)}
                    </div>
                    <div className={styles.leadersDiv}>
                        <p className={styles.statsLabel}>Average Score:</p>
                        {Object.keys(globalStats).length > 0 && renderLeaders(globalStats.average_score_leaders)}
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
};

export default GlobalStats;