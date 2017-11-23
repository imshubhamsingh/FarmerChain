import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import $ from 'jquery';
import ClientApp from './ClientApp'

render( <BrowserRouter><ClientApp/></BrowserRouter> ,document.getElementById('root'))