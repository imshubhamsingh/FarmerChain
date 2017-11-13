import React, { Component } from 'react'
import Login from './Login'


class Sidebar extends Component{
    state = {
        login: false
    }
    render(){
        const current = !this.state.login? <Login/>: '' 
        return(
            <div className={'sidebar box ' + (!this.state.login? 'login-sidebar': '' )}>
                {current}             
            </div>            
        )
    }
}

export default Sidebar