import React from 'react';

import Button from 'react-bootstrap/Button';

class CategoryCardComponent extends React.Component {
    constructor(props) {
        super(props);
        const type = this.props.type;
        const test = this.props.test;
        this.state = {
            buttonVariant: "outline-secondary"
        };
    }

    componentDidMount = () => {
        console.log('props from child = ', this.test);
        console.log('props from child = ', this.type);
    }

    handleCategoryClick = () => {
        console.log('clicked');
    }

    render() {
        return(
            <div>
                <Button variant={this.state.buttonVariant} size="lg" onClick={this.handleCategoryClick}>
                    { this.props.type }
              </Button>  
            </div>
        )
    }
}

export default CategoryCardComponent;