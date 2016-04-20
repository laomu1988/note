import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';

import {Provider} from 'react-redux';
import App from './container/app';
import todoApp from './reducer/index.js';

let store = createStore(todoApp);

let rootElement = document.getElementById('test');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
