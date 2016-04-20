import React,{Component,PropTypes} from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
    render() {
        let {todos,onTodoClick} = this.props;
        return (
            <ul>
                {this.props.todos.map((todo, index) =>
                        <Todo key={todo.id} todo={todo} onTodoClick={onTodoClick}/>
                )}
            </ul>);
    }
}
