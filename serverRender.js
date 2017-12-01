"use strict"
import React from 'react';
import {renderToString} from 'react-dom/server';
import ClientApp from './src/ClientApp';
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './src/Reducers/index'

let store = createStore(reducer, applyMiddleware(thunk))



let serverRender = (url) =>{
          return   renderToString(<Provider store={store}>
                    <StaticRouter location={url}>
                        <ClientApp/>
                    </StaticRouter>
            </Provider>);

};

export {serverRender}   ;

