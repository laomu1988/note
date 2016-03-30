import React from 'react';
import {render} from 'react-dom';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {linked: false}
    }

    handleClick() {
        this.setState({linked: !this.state.linked})
    }

    render() {
        const text = this.state.linked ? 'like' : 'have\'t linked';
        return (
            <p onClick={this.handleClick.bind(this)}>
                You {text} this. click to toggle.
            </p>
        );
    }
}


render(<LikeButton />, document.getElementById('demo'));