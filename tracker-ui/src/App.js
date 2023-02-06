import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

const App = () => {

  const [state, setState] = useState({
    amount: 0
  });

  const handleChange = event => {
    const result = event.target.value.replace(/\D/g, '');

    setState({ ...state, amount: result });
  };
  
  return (
    <div className="App">
      <h3> Money Tracker </h3>
      
      <input
        type="text"
        placeholder="Amount"
        // value={state.amount}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
