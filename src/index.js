import React from 'react'
import history from '../history'
import { render } from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {reducer} from './Reducers/index'
import {createStore, applyMiddleware} from 'redux'
import ClientApp from './ClientApp'
import { persistStore, autoRehydrate } from 'redux-persist'
import CookieStorage from 'redux-persist-cookie-storage'

let store = createStore(reducer, applyMiddleware(thunk),autoRehydrate())

persistStore(store, { storage: new CookieStorage() })

persistStore(store, { storage: new CookieStorage({
    expiration: {
        'default': 365 * 86400 // Cookies expire after one year
    }
  })
})

persistStore(store, { storage: new CookieStorage({
    expiration: {
        'default': null, // Session cookies used by default
        'storeKey': 600 // State in key `storeKey` expires after 10 minutes
    }
})
})



render(
        <Provider store={store}>
                <Router>
                   <ClientApp/>
                </Router>
        </Provider>
     ,document.getElementById('root'))