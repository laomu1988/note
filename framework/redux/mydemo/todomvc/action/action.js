import types from '../const/constant.js'

export default {
    todoAdd: text => ({type: types.Todo_Add, text}),
    todoRemove: id => ({type: types.Todo_Remove, id}),
    todoComplete: id => ({type: types.Todo_Complete, id}),
    todoSwitch: id => ({type: types.Todo_Switch, id}),
    todoActive: id => ({type: types.todoActive, id}),
    changeFilter: filter =>({type: filter}),
};
