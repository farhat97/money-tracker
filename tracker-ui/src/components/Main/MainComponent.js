import React from 'react';
import { getExpenseCategories, postNewExpense } from '../../services/serverService';


class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        amount: 0,
        expenseTypes: ["Test 1", "Test2"],
        selectedType: null,
        serverUrl: ""
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
  
  async getExpenseCategoriesAsync() {
    try {
      const response = await getExpenseCategories();
      this.setState({ expenseTypes: response });
    } catch(error) {
      console.log('error retrieving categories', error);
    }
  }

  async postNewExpenseAsync(expense) {
    try {
      const response = await postNewExpense(expense);
    } catch(error) {
      console.log('error posting expense = ', error);
    }
  }

  componentDidMount = () => {

    this.getExpenseCategoriesAsync();
  };


  postExpense = () => {
    console.log('got expense amount = ', this.state.amount);

    let expenseFormatted = {
      "Category": this.state.selectedType,
      "Amount": this.state.amount
    };

    this.postNewExpenseAsync(expenseFormatted);
    
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
