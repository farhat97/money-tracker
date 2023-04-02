import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { testApiCall } from './services/serverService';

const App = () => {

  const [state, setState] = useState({
    amount: 0,
    expenseTypes: []
  });

  const handleChange = event => {
    const result = event.target.value.replace(/\D/g, '');

    setState({ ...state, amount: result });
  };

  const testApi = () => {
    testApiCall();
  };

  // TODO: seems like I need to create a child component (using ...extends React.Component) and render it here since 
  // lifecycle methods might not work here
  const componentDidMount = () => {
    console.log('component did mount');
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

      <input 
        type="button"
        value="tester"
        onClick={testApi}
      />
    </div>
  );
}

export default App;
