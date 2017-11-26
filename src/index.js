import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import $ from 'jquery';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './Reducers/index'
import {createStore, applyMiddleware} from 'redux'
import ClientApp from './ClientApp'

const createStoreWithMiddleWare =createStore(rootReducer, applyMiddleware(thunk))

render(
    <Provider store={createStoreWithMiddleWare}>
        <BrowserRouter>
            <ClientApp/>
        </BrowserRouter>
    </Provider>
     ,document.getElementById('root'))