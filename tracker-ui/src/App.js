import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { testApiCall } from './services/serverService';
import MainComponent from './components/Main/MainComponent';

const App = () => {
  
  return (
    <div className="App">
      <MainComponent />
    </div>
  );
}

export default App;
