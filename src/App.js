import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

import Color from './components/Color';
import Guess from './components/Guess';
import PreviousGuesses from './components/PreviousGuesses';
import WinModal from './components/WinModal';
import useGetContrastColor from './utils/useGetContrastColor';

function App() {

  const [colorOfTheDay, setColorOfTheDay] = useState([0, 0, 0])
  const [rgbColorOfTheDay, setRgbColorOfTheDay] = useState(`rgb(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]})`)
  const [opaqueRgbColorOfTheDay, setOpaqueRgbColorOfTheDay] = useState(`rgba(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]}, 0.5)`)
  const [previousUserGuesses, setPreviousUserGuesses] = useState([])
  
  useEffect(() => {
    setRgbColorOfTheDay(`rgb(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]})`)
    setOpaqueRgbColorOfTheDay(`rgba(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]}, 0.25)`)
  }, [colorOfTheDay])

  console.log(opaqueRgbColorOfTheDay)
  useEffect(() => {
      const firstNum = Math.floor(Math.random() * 256)
      const secondNum = Math.floor(Math.random() * 256)
      const thirdNum = Math.floor(Math.random() * 256)
      setColorOfTheDay([firstNum, secondNum, thirdNum])
  }, []);

  const [winModalIsOpen, setWinModalIsOpen] = useState(false);

  const openWinModal = () => {
    setWinModalIsOpen(true);
  };

  const closeWinModal = () => {
    setWinModalIsOpen(false);
  };

  return (
    <div className="App">
      <h1 className="shadleH1">Welcome to Shadle!</h1>
      <h2 className="shadleH2">The RGB color guessing game!</h2>
      <WinModal
        colorOfTheDay={colorOfTheDay}
        rgbColorOfTheDay={rgbColorOfTheDay}
        opaqueRgbColorOfTheDay={opaqueRgbColorOfTheDay}
        winModalIsOpen={winModalIsOpen} 
        closeWinModal={closeWinModal}      
      />
      <Color
        colorOfTheDay={colorOfTheDay}
        rgbColorOfTheDay={rgbColorOfTheDay}
      />
      <div className='currentAndPastGuessWrapperDiv'>
        <Guess 
          colorOfTheDay={colorOfTheDay}
          rgbColorOfTheDay={rgbColorOfTheDay}
          previousUserGuesses={previousUserGuesses}
          setPreviousUserGuesses={setPreviousUserGuesses}
          openWinModal={openWinModal}
        />
        <PreviousGuesses
          className='PreviousGuesses'
          colorOfTheDay={colorOfTheDay}
          previousUserGuesses={previousUserGuesses}
        />
      </div>
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