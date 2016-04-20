import React,{Component,PropTypes} from 'react';

export default class TodoAdd extends Component {
    render() {
        return (<div>
            <input type="text" ref='input'/>
            <button onClick={()=> this.handleClick()}>Add</button>
        </div>);
    }

    handleClick() {
        const node = this.refs.input;
        const text = node.value.trim();
        if (text) this.props.onAddClick(text);
        node.value = '';
    }
}

TodoAdd.propTypes = {
    onAddClick: PropTypes.func.isRequired
};
