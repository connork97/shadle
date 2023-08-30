import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

import Color from './components/Color';
import Guess from './components/Guess';

function App() {

  const [colorOfTheDay, setColorOfTheDay] = useState([0, 0, 0])
    
  useEffect(() => {
      const firstNum = Math.floor(Math.random() * 256)
      const secondNum = Math.floor(Math.random() * 256)
      const thirdNum = Math.floor(Math.random() * 256)
      setColorOfTheDay([firstNum, secondNum, thirdNum])
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Shadle!</h1>
      <h2>The RGB color guessing game!</h2>
      <Color colorOfTheDay={colorOfTheDay} />
      <Guess colorOfTheDay={colorOfTheDay} />
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