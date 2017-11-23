import React, { Component } from 'react'
import Login from './Login'
import Main from './Main'

class Sidebar extends Component{
    state = {
        login: true
    }
    dashboard =  () =>{
        this.setState({login:true})
    }
    render(){
        const current = !this.state.login? <Login onLogin={this.dashboard}/>: <Main/>
        return(
            <div className={'sidebar box ' + (!this.state.login? 'login-sidebar': '' )}>
                {current}             
            </div>            
        )
    }
}

export default Sidebar