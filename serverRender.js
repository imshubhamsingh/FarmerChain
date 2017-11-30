import config from './config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ClientApp from './src/ClientApp';
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './src/Reducers/index'

let store = createStore(reducer, applyMiddleware(thunk))



let serverRender = (req) =>{
          return   ReactDOMServer.renderToString(<Provider store={store}>
                    <StaticRouter location={req.url}>
                        <ClientApp/>
                    </StaticRouter>
            </Provider>);

};

export {serverRender}   ;

