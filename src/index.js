import React from 'react'
import history from '../history'
import { render } from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {reducer} from './Reducers/index'
import {createStore, applyMiddleware} from 'redux'
import ClientApp from './ClientApp'
import { persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'




function configureStore () {
    // ...
    let store = createStore(reducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { persistor, store }
}

const { persistor, store } = configureStore()

render(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                   <ClientApp/>
                </Router>
            </PersistGate>
        </Provider>
     ,document.getElementById('root'))