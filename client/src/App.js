import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Account from './pages/Account';

import Color from './components/Color';
import Guess from './components/Guess';
import PreviousGuesses from './components/PreviousGuesses';
import GameOverModal from './components/GameOverModal';
import InstructionsModal from './components/InstructionsModal';
import useGetContrastColor from './utils/useGetContrastColor';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';

function App() {

  const [gameResult, setGameResult] = useState(null);

  const [colorOfTheDay, setColorOfTheDay] = useState([0, 0, 0])
  const [rgbColorOfTheDay, setRgbColorOfTheDay] = useState(`rgb(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]})`)
  const [opaqueRgbColorOfTheDay, setOpaqueRgbColorOfTheDay] = useState(`rgba(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]}, 0.5)`)
  const [previousUserGuesses, setPreviousUserGuesses] = useState([])
  const contrastColor = useGetContrastColor(rgbColorOfTheDay)
  const [gameOverModalIsOpen, setGameOverModalIsOpen] = useState(false);

    // if (gameOverModalIsOpen) {
    //   setContrastColor(useGetContrastColor(rgbColorOfTheDay))
    // }

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

  const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(true);

  const openInstructionsModal = () => {
    setInstructionsModalIsOpen(true)
  }

  const closeInstructionsModal = () => {
    setInstructionsModalIsOpen(false)
  }

  const router = createBrowserRouter([
    { path: '/', element: 
      <Home
        openInstructionsModal={openInstructionsModal}
        setGameResult={setGameResult}
        colorOfTheDay={colorOfTheDay}
        rgbColorOfTheDay={rgbColorOfTheDay}
        previousUserGuesses={previousUserGuesses}
        setPreviousUserGuesses={setPreviousUserGuesses}
        openGameOverModal={openGameOverModal}
      />
    },
    { path: '/signup', element: <Signup openInstructionsModal={openInstructionsModal} />}
  ])

  return (
    <div className="App">
      {/* <Navbar 
        openInstructionsModal={openInstructionsModal}
      /> */}
      <InstructionsModal
        instructionsModalIsOpen={instructionsModalIsOpen}
        closeInstructionsModal={closeInstructionsModal}      
      />
      <GameOverModal
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
      {/* <Color
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
          className='PreviousGuesses'
          colorOfTheDay={colorOfTheDay}
          previousUserGuesses={previousUserGuesses}
        />
      </div> */}
    </div>
  );
}

export default App;

{/* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header> */}