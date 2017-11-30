import config from './config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ClientApp from './src/ClientApp';
import thunk from 'redux-thunk'
import {BrowserRouter as Router} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import {reducer} from './src/Reducers/index'


let store = createStore(reducer, applyMiddleware(thunk))

const serverRender = () =>{
            const html = renderToString(ReactDOMServer.renderToString(<Provider store={store}>
                    <Router>
                        <ClientApp/>
                    </Router>
            </Provider>));
            return {
                initialMarkup: html,
                initialData: null
            };
};

export default serverRender;

