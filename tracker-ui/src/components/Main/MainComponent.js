import {useState, setState, useEffect} from 'react';
import React from 'react';
import { getExpenseCategories } from '../../services/serverService';

import axios from 'axios';

import tunnels from '../../ngrok-tunnels.json';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        amount: 0,
        expenseTypes: ["Test 1", "Test2"],
        selectedType: null,
        serverUrl: "",
        axiosOptions: {
          headers: {
            "ngrok-skip-browser-warning": true,
          }
        }
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
  
  async test() {
    try {
      const response = await getExpenseCategories();
      this.setState({ expenseTypes: response });
    } catch(error) {
      console.log('error retrieving categories', error);
    }
  }

  componentDidMount = () => {
    
    // Get server uri (generated when running ngrok and populating ngrok-tunnels.json)
    let clientTunnel = tunnels.tunnels.filter(tunnel => tunnel.name === "server");
    // console.log('client tunnel stuff = ', clientTunnel[0].public_url);
    // NOTE: using setState here does not work
    
    // this.state.serverUrl = clientTunnel[0].public_url;
    this.state.serverUrl = "http://localhost:5284";
    
    // axios.get(this.state.serverUrl + "/api/expenses/expense-categories", this.state.axiosOptions)
    //   .then(result => {
    //     this.setState({ expenseTypes: result.data });
    //     this.setState({ selectedType: result.data[0] });
    //   });
    this.test();
  };


  postExpense = () => {
    console.log('got expense amount = ', this.state.amount);

    let expenseFormatted = {
      "category": this.state.selectedType,
      "amount": this.state.amount
    };

    axios.post(this.state.serverUrl + "/api/expenses/add-expense", expenseFormatted, this.state.axiosOptions)
      .then(res => {
        console.log('Got response = ', res);
        // TODO: add a success flag for UI feedback
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
                  <option value={ type }> { type } </option>
              ))
            }
        </select>
        <input type="button" value="Submit" onClick={() => this.postExpense()}/>
        </div>
    );
  }
}

export default MainComponent;
