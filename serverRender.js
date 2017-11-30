import config from './config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ClientApp from './src/ClientApp';
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './src/Reducers/index'
import { persistStore, autoRehydrate } from 'redux-persist'
import CookieStorage from 'redux-persist-cookie-storage'


let serverRender = (req) =>{
    const store = createStore(reducer, applyMiddleware(thunk),autoRehydrate())
    const cookies = req.cookies
    persistStore(store, { storage: new CookieStorage({ cookies }) })
    return   ReactDOMServer.renderToString( <Provider store={store}>
                  <StaticRouter>
                      <ClientApp/>
                  </StaticRouter>
          </Provider>);

};

export {serverRender}   ;

