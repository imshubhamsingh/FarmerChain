import React, { Component } from 'react'
import Login from './Login'
import Main from './Main'

class Sidebar extends Component{
    render(){
        const current = !this.props.login? <Login onLogin={this.props.loginRequest}/>: <Main/>
        return(
            <div className={'sidebar box ' + (!this.props.login? 'login-sidebar': '' )}>
                {current}             
            </div>            
        )
    }
}

export default Sidebar