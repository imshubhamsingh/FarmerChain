import config from './config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/ClientApp';

import {BrowserRouter as Router} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/Reducers/index'
import { persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

function configureStore () {
    let store = createStore(reducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { persistor, store }
}

const { persistor, store } = configureStore()


const serverRender = () =>{
            const html = renderToString(ReactDOMServer.renderToString(<Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Router>
                        <ClientApp/>
                    </Router>
                </PersistGate>
            </Provider>));
            return {
                initialMarkup: html,
            };
};

export default serverRender;

