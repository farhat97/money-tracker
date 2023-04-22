import {useState, setState} from 'react';
import React from 'react';
import { getExpenseCategories } from '../../services/serverService';

import axios from 'axios';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        amount: 0,
        expenseTypes: ["Test 1", "Test2"]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const result = event.target.value.replace(/\D/g, '');

    this.setState({ ...this.state, amount: result });
  };

  getExpenseTypes = () => {
    getExpenseCategories();
  }

  componentDidMount = () => {
    console.log('component did mount');

    axios.get("https://localhost:7284/api/expenses/expenseCategories")
      .then(result => {
        this.setState({ expenseTypes: result.data })
      });
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

        <br />
        <select name="selectList" id="selectList">
            { 
              this.state.expenseTypes.map(type => (
                  <option value="type"> { type } </option>
              ))
            }
        </select>
        </div>
    );
  }
}

export default MainComponent;
