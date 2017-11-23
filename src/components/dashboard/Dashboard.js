import React, { Component } from 'react';
import './dashboard.css';
import Services from "./Services/services";
import PoolFarm from "./Pool Farming/PoolFarm";

class Dashboard extends Component{
    render(){
        return(        
            <div className='dashboard box'>
                {/*<Services/>*/}
                <PoolFarm/>
            </div>                              
        )
    }
}

export default Dashboard