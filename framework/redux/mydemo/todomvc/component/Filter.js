import React,{Component} from 'react';
import types from '../const/constant.js'

let Filter = (changeFilter) =>  (
    <div>
        <button onClick={()=> changeFilter(types.Show_All)}>show All</button>
        <button onClick={()=> changeFilter(types.Show_Active)}>show active</button>
        <button onClick={()=> changeFilter(types.Show_Complete)}>show complete</button>
    </div>
);

export default Filter;
