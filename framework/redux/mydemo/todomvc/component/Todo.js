import React,{Component} from 'react';



export default class Todo extends Component {
    render() {
        let {todo,onTodoClick} = this.props;
        return <li className={todo.complete ? 'todo complete':'todo'} todo_id={todo.id}
                   onClick={() => onTodoClick(todo.id) }>
            {todo.text}
        </li>
    }
}
