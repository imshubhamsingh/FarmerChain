import React, { Component } from 'react'
import Login from './Login'


class Sidebar extends Component{
    state = {
        login: false
    }
    dashboard =  () =>{
        this.setState({login:true})
    }
    render(){
        const current = !this.state.login? <Login onLogin={this.dashboard}/>: '' 
        return(
            <div className={'sidebar box ' + (!this.state.login? 'login-sidebar': '' )}>
                {current}             
            </div>            
        )
    }
}

export default Sidebar