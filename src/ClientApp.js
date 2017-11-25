import React, { Component } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Bottombar from './components/bottombar/Bottombar'
import './App.css';


import {LoginCheckModule, auth} from "./firebase/firebase";



class ClientApp extends Component{
    state = {
        user: null
    }
    componentWillMount(){
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    login = ()=> {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    logout = ()=>{
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    render(){
        return(
            < div className="app-layout">
                    <Sidebar user={this.state.user}/>
                    {this.state.user?<div className='main-layout'>
                        <Header/>
                        <Dashboard/>
                    </div>:''}
                     {this.state.user?<Bottombar/>:''}
            </div>
        )
    }
}

export default ClientApp