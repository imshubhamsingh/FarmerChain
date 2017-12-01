import React from 'react'
import history from '../history'
import { hydrate } from 'react-dom'
import { Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {reducer} from './Reducers/index'
import {createStore, applyMiddleware} from 'redux'
import ClientApp from './ClientApp'



let store = createStore(reducer, applyMiddleware(thunk))



hydrate(
        <Provider store={store}>
            <Router history={history}>
                   <ClientApp/>
                </Router>
        </Provider>
     ,document.getElementById('root'))