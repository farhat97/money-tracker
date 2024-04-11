import React from 'react';
import { getExpenseCategories, postNewExpense } from '../../services/serverService';

import CategoryCardComponent from '../category-card/CategoryCardComponent';
import { ThreeDots } from 'react-loader-spinner';


class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        amount: 0,
        expenseTypes: ["Test 1", "Test2"],
        selectedType: null,
        serverUrl: "",
        categoryButtonVariant: "outline-secondary",
        isLoading: true
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
  expenseCardsSection
  async getExpenseCategoriesAsync() {
    try {
      const response = await getExpenseCategories();
      this.setState({ expenseTypes: response });
      this.setState({ isLoading: false });
    } catch(error) {
      console.log('error retrieving categories', error);
      this.setState({ isLoading: false });
    }
  }

  async postNewExpenseAsync(expense) {
    try {
      const response = await postNewExpense(expense);
      this.setState({ isLoading: false });
    } catch(error) {
      console.log('error posting expense = ', error);
      this.setState({ isLoading: false });
    }
  }

  componentDidMount = () => {

    this.getExpenseCategoriesAsync();
  };


  postExpense = () => {
    this.setState({ isLoading: true });
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
    const expenseCardsSection = this.state.expenseTypes.map(type => (
      <CategoryCardComponent 
        type={type}
        selected={type === this.state.selectedType}
        onTypeSelect={this.handleTypeSelect}
      />
    ));

    return(
      <div className="App">
        <h3> Que onda </h3>
        
        <input
            type="number"
            pattern="[0-9]*"
            placeholder="Amount"
            onChange={this.handleAmountChange}
        />

        <br />
        <div className='expense-cards'>
          { 
            this.state.isLoading 
            ? (
                <ThreeDots 
                    color="#0d6efd" 
                    height={80} 
                    width={80} />
              )
            : expenseCardsSection 
          }
        </div>

        <input type="button" value="Submit" onClick={() => this.postExpense()}/>
      </div>
    );
  }
}

export default MainComponent;
