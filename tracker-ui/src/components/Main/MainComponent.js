import React from 'react';
import { getExpenseCategories, postNewExpense } from '../../services/serverService';

import CategoryCardComponent from '../category-card/CategoryCardComponent';
import Button from 'react-bootstrap/Button';


class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        amount: 0,
        expenseTypes: ["Test 1", "Test2"],
        selectedType: null,
        serverUrl: "",
        categoryButtonVariant: "outline-secondary"
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

  handleCategoryClick = (event) => {
    console.log('clickeddd', event);
    console.log(event.target.innerText);
  }

  handleTypeSelect = (typeSelected) => {
    console.log('got type selected = ', typeSelected);
    this.setState({ selectedType: typeSelected });
  }

  render() {
    const expenseCards = this.state.expenseTypes.map(type => (
      <CategoryCardComponent 
        type={type}
        selected={type === this.state.selectedType}
        onTypeSelect={this.handleTypeSelect}
      />
    ));
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
        <div>
          { expenseCards }
        </div>

        <input type="button" value="Submit" onClick={() => this.postExpense()}/>
      </div>
    );
  }
}

export default MainComponent;
