import React, { Component } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Bottombar from './components/bottombar/Bottombar'
import './App.css';


import { firebaseApp } from './firebase/firebase'



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

    componentWillMount(){
        firebaseApp.auth().onAuthStateChanged(user=>{
            if(user){
                console.log('user has signed in or up', user)
                this.setState({login:true});
            }else{
                console.log('user has signed out or still needs to sign in.')
                this.setState({login:false});
            }
        });
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