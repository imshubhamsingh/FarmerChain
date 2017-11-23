import React, { Component } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Bottombar from './components/bottombar/Bottombar'
import './App.css';


class ClientApp extends Component{
   
    render(){
        return(
            <div className="app-layout">
                    <Sidebar/>
                 <div>
                    <div className='main-layout'>            
                        <Header/>
                        <Dashboard/>                        
                    </div> 
                    <Bottombar/>  
                 </div>                   
            </div>                                
        )
    }
}

export default ClientApp