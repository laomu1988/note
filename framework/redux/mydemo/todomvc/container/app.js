import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import TodoAdd from '../component/TodoAdd.js';
import TodoList from '../component/TodoList.js';
import Filter from '../component/Filter.js';
import actions from '../action/action.js';
import types from '../const/constant.js'

class App extends Component {
    render() {
        let {dispatch,todos,filter} = this.props;
        if (filter !== types.Show_All) {
            todos = todos.filter(todo => (filter === types.Show_Complete ) == todo.complete);
        }
        return (<div>
            <TodoAdd onAddClick={text=> dispatch(actions.todoAdd(text))}/>
            <TodoList todos={todos} onTodoClick={id=>dispatch(actions.todoSwitch(id))}/>
            <Filter changeFilter={filter=>dispatch(actions.changeFilter(filter))}/>
        </div>);
    }
}
export default connect((state)=>state)(App)
