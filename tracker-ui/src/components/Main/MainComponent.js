import {useState, setState} from 'react';
import React from 'react';
import { getExpenseCategories } from '../../services/serverService';

import axios from 'axios';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        amount: 0,
        expenseTypes: ["Test 1", "Test2"],
        selectedType: null
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleAmountChange(event) {
    const result = event.target.value.replace(/\D/g, '');

    this.setState({ ...this.state, amount: result });
  };

  handleCategoryChange(event) {
    this.setState({ ...this.state, selectedType: event.target.value });
  }

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
  
  postExpense = () => {
    console.log('got expense amount = ', this.state.amount);

    let expenseFormatted = {
      "category": this.state.selectedType,
      "amount": this.state.amount
    };

    axios.post("https://localhost:7284/api/expenses/add-expense", expenseFormatted)
      .then(res => {
        console.log('Got response = ', res);
      })
      .catch(err => {
        console.log('Got error = ', err);
      })
  }

  render() {
    return(
        <div className="App">
        <h3> Money Tracker </h3>
        
        <input
            type="text"
            placeholder="Amount"
            // value={state.amount}
            onChange={this.handleAmountChange}
        />

        <br />
        <select name="selectList" id="selectList" onChange={this.handleCategoryChange}>
            { 
              this.state.expenseTypes.map(type => (
                  <option value={this.state.selectedType}> { type } </option>
              ))
            }
        </select>
        <input type="button" value="Submit" onClick={() => this.postExpense()}/>
        </div>
    );
  }
}

export default MainComponent;
