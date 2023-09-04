import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

import Account from './pages/Account';

import Color from './components/Color';
import Guess from './components/Guess';
import PreviousGuesses from './components/PreviousGuesses';
import GameOverModal from './components/GameOverModal';
import InstructionsModal from './components/InstructionsModal';
import useGetContrastColor from './utils/useGetContrastColor';
import Navbar from './components/Navbar';
import GlobalStats from './pages/GlobalStats';
import Logout from './pages/Logout';

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState({});

  const [gameResult, setGameResult] = useState(null);
  const [percentScore, setPercentScore] = useState(0);
  
  const [colorOfTheDay, setColorOfTheDay] = useState([0, 0, 0])
  const [rgbColorOfTheDay, setRgbColorOfTheDay] = useState(`rgb(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]})`)
  const [opaqueRgbColorOfTheDay, setOpaqueRgbColorOfTheDay] = useState(`rgba(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]}, 0.5)`)
  const [previousUserGuesses, setPreviousUserGuesses] = useState([])
  const contrastColor = useGetContrastColor(rgbColorOfTheDay)
  const [gameOverModalIsOpen, setGameOverModalIsOpen] = useState(false);
  const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(true);
  
    // if (gameOverModalIsOpen) {
    //   setContrastColor(useGetContrastColor(rgbColorOfTheDay))
    // }

  const checkLoginStatus = async(idHash) => {
    const response = await fetch(`https://shadle-back-end.onrender.com/check-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'_id_hash': idHash})
    })
    if (response.ok) {
      const userData = await response.json()
      console.log(userData)
      setLoggedInUser(userData)
    }
  }
  useEffect(() => {
    const idHash = localStorage.getItem('_id_hash')
    if (idHash) {
      checkLoginStatus(idHash);
      // .then((response) => response.json())
      // .then((userData) => console.log(userData))
    }
    else console.log("no _id_hash to login user with")
  }, [])

  useEffect(() => {
    setRgbColorOfTheDay(`rgb(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]})`)
    setOpaqueRgbColorOfTheDay(`rgba(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]}, 0.25)`)
  }, [colorOfTheDay])

  useEffect(() => {
    document.body.style.backgroundColor = `rgba(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]}, 0.25)`;
  }, [])

  console.log(opaqueRgbColorOfTheDay)
  useEffect(() => {
      const firstNum = Math.floor(Math.random() * 256)
      const secondNum = Math.floor(Math.random() * 256)
      const thirdNum = Math.floor(Math.random() * 256)
      setColorOfTheDay([firstNum, secondNum, thirdNum])
  }, []);


  const openGameOverModal = () => {
    setGameOverModalIsOpen(true);
  };

  const closeGameOverModal = () => {
    setGameOverModalIsOpen(false);
  };
  

  const openInstructionsModal = () => {
    setInstructionsModalIsOpen(true)
  }

  const closeInstructionsModal = () => {
    setInstructionsModalIsOpen(false)
  }
  // const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    if (previousUserGuesses.length > 0) {
      let total = 768;
      let difference = 0;
      for (let i = 0; i < 3; i++) {
        if (colorOfTheDay[i] > previousUserGuesses[0][i]) {
          difference += (colorOfTheDay[i] - previousUserGuesses[0][i]);
        } else if (colorOfTheDay[i] < previousUserGuesses[0][i]) {
          difference += (previousUserGuesses[0][i] - colorOfTheDay[i]);
        }
      };
      const decimalScore = 1 - difference / total;
      const newPercentScore = Math.round(decimalScore * 10000) / 100
      setPercentScore(newPercentScore)
    }
  }, [previousUserGuesses])
  
  const postGameResults = async() => {
      let gameResultsBody = {
        rgb: `${colorOfTheDay}`,
        win: gameResult,
        guesses: previousUserGuesses.length,
        percent_score: percentScore,
        user_id: null
      }
      if (Object.keys(loggedInUser).length > 0) {
        gameResultsBody.user_id = loggedInUser.id
      }
      try {
        const response = await fetch('https://shadle-back-end.onrender.com/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(gameResultsBody),
        })
        if (response.ok) {
          const gameResultsResponseData = await response.json();
          console.log("Game Results Response Data: ", gameResultsResponseData);
        }
        else console.log("Game results error: !response.ok");
      }
      catch (error) {
        console.error("An error occurred when posting game results: ", error);
      }
      console.log(gameResultsBody)
    }

    useEffect(() => {
      if (previousUserGuesses.length > 0) {
        postGameResults();
      }
    }, [gameResult]);
    
    const router = createBrowserRouter([
      {
        element: 
          <Navbar
            loggedInUser={loggedInUser}
            // showDropdown={showDropdown}
            // setShowDropdown={setShowDropdown}
            openInstructionsModal={openInstructionsModal}
            />,
        children: [   
          { path: '/', element: 
            <Home
              postGameResults={postGameResults}
              openInstructionsModal={openInstructionsModal}
              setGameResult={setGameResult}
              colorOfTheDay={colorOfTheDay}
              rgbColorOfTheDay={rgbColorOfTheDay}
              previousUserGuesses={previousUserGuesses}
              setPreviousUserGuesses={setPreviousUserGuesses}
              openGameOverModal={openGameOverModal}
            />
          },
          { path: '/signup', element: <Signup setLoggedInUser={setLoggedInUser} openInstructionsModal={openInstructionsModal} /> },
          { path: '/login', element: <Login setLoggedInUser={setLoggedInUser} /> },
          { path: '/logout', element: <Logout loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> },
          { path: '/profile', element: <Profile loggedInUser={loggedInUser} /> },
          { path: '/stats', element: <GlobalStats /> }
        ]
      }
    ])
  
    return (
    <div className="App">
      <InstructionsModal
        instructionsModalIsOpen={instructionsModalIsOpen}
        closeInstructionsModal={closeInstructionsModal}      
        />
      <GameOverModal
        percentScore={percentScore}
        previousUserGuesses={previousUserGuesses}
        contrastColor={contrastColor}
        gameResult={gameResult}
        colorOfTheDay={colorOfTheDay}
        rgbColorOfTheDay={rgbColorOfTheDay}
        opaqueRgbColorOfTheDay={opaqueRgbColorOfTheDay}
        gameOverModalIsOpen={gameOverModalIsOpen} 
        closeGameOverModal={closeGameOverModal}      
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;