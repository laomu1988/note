import {combineReducers} from 'redux';
import todos from './todos'
import filter from './filter'

console.log(todos);

const todoApp = combineReducers({
    todos,
    filter,
});


export default todoApp;
