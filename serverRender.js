import config from './config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ClientApp from './src/ClientApp';
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './src/Reducers/index'
import { persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

function configureStore () {
    // ...
    let store = createStore(reducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { persistor, store }
}

const { persistor, store } = configureStore()

let serverRender = (req) =>{
          return   ReactDOMServer.renderToString( <Provider store={store}>
              <PersistGate persistor={persistor}>
                  <StaticRouter>
                      <ClientApp/>
                  </StaticRouter>
              </PersistGate>
          </Provider>);

};

export {serverRender}   ;

