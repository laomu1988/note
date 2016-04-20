import React,{Component} from 'react';
import types from '../const/constant.js'

export default class Filter extends Component {
    render() {
        var changeFilter = this.props.changeFilter;
        return (
            <div>
                <button onClick={()=> changeFilter(types.Show_All)}>show All</button>
                <button onClick={()=> changeFilter(types.Show_Active)}>show active</button>
                <button onClick={()=> changeFilter(types.Show_Complete)}>show complete</button>
            </div>);
    }
}
