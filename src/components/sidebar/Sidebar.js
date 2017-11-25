import React, { Component } from 'react'
import Login from './Login'
import Main from './Main'
import {LoginCheckModule} from "../../firebase/firebase";

class Sidebar extends Component{
    render(){
        const current = this.props.user?<Main/>:<Login/>
        return(
            <div className={'sidebar box ' + (this.props.user?'login-sidebar':'')}>
                {current}
            </div>            
        )
    }
}

export default Sidebar