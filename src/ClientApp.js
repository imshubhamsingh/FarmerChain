import React, { Component } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Bottombar from './components/bottombar/Bottombar'
import './App.css';


class ClientApp extends Component{
    state = {
        login: false
    }

    loginRequest =  () =>{
        this.setState({login:true})
    }

    showDashBoard = () => {
        if(this.state.login) return (
            <div className='main-layout'>
                <Header/>
                <Dashboard/>
            </div>
        )
    }

    showBottomBar = () => {
        if(this.state.login) return (
            <Bottombar/>
        )
    }
   
    render(){
        return(
            <div className="app-layout">
                    <Sidebar loginRequest={this.loginRequest} login={this.state.login}/>
                 <div>
                     {this.showDashBoard()}
                     {this.showBottomBar()}
                 </div>                   
            </div>                                
        )
    }
}

export default ClientApp