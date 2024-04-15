import React from 'react';

import Button from 'react-bootstrap/Button';

class CategoryCardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };
    }

    componentDidMount = () => {
        
    }

    handleCategoryClick = () => {
        this.onTypeSelected();
    }

    onTypeSelected = () => {
        let selectedType = this.props.type;
        this.props.onTypeSelect(selectedType);
    }

    render() {
        const buttonVariant = this.props.selected ? 'primary' : 'outline-secondary';
        return(
            <div>
                <Button variant={buttonVariant} size="lg" onClick={this.handleCategoryClick}>
                    { this.props.type }
              </Button>  
            </div>
        )
    }
}

export default CategoryCardComponent;