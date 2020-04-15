import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [exampleData, setExampleData] = useState('');

  useEffect(() => {
    fetch('/example').then(res => res.json()).then(data => {
      setExampleData(data.message);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {exampleData}
        </p>
      </header>
    </div>
  );
}

export default App;
