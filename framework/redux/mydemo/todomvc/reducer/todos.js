/**
 * 数据结构
 *
 * todos：[{id:1,text:0,complete: false}
 * ]
 *
 *
 * 关键点：
 *   怎么为todo增加id
 *   怎样避免修改当前state：修改属性时和删除属性时
 * */

import types from '../const/constant.js'

export default function (state, action) {
    console.log('reducer todos');
    if (typeof state === 'undefined') {
        return [{id: 0, text: 'default todo.', complete: false}];
    }
    switch (action.type) {
        case types.Todo_Add:
            return [{
                id: state.reduce((prev, todo)=> Math.max(prev, todo.id), 0) + 1,
                text: action.text,
                complete: false
            },
                ...state];
        case types.Todo_Complete:
            var todos = Object.assign(state);
            todos = todos.map(function (todo) {
                if (todo.id === action.id) {
                    todo = Object.assign(todo);
                    todo.complete = true;
                }
                return todo;
            });
            return todos;
        case types.Todo_Active:
            var todos = Object.assign(state);
            todos = todos.map(function (todo) {
                if (todo.id === action.id) {
                    todo = Object.assign(todo);
                    todo.complete = false;
                }
                return todo;
            });
            return todos;
        case types.Todo_Switch:
            var todos = Object.assign(state);
            todos = todos.map(function (todo) {
                if (todo.id === action.id) {
                    todo = Object.assign(todo);
                    todo.complete = !todo.complete;
                }
                return todo;
            });
            return todos;
        case types.Todo_Remove:
            var todos = Object.assign(state);
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === action.id) {
                    todos.splice(i, 1);
                    break;
                }
            }
            return todos;
        default:
            return state;
    }
};
