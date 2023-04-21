import {useState, setState} from 'react';
import React from 'react';
import { testApiCall } from '../../services/serverService';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        amount: 0,
        expenseTypes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.testApi = this.testApi.bind(this);
  }

  handleChange(event) {
    const result = event.target.value.replace(/\D/g, '');

    this.setState({ ...this.state, amount: result });
  };

  // TODO: remove
  testApi = () =>  {
    testApiCall();
  };

  componentDidMount = () => {
    console.log('component did mount');
    this.testApi();
  };
  
  render() {
    return(
        <div className="App">
        <h3> Money Tracker </h3>
        
        <input
            type="text"
            placeholder="Amount"
            // value={state.amount}
            onChange={this.handleChange}
        />

        <input 
            type="button"
            value="tester"
            onClick={this.testApi}
        />
        </div>
    );
  }
}

export default MainComponent;
