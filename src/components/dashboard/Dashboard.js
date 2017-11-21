import React, { Component } from 'react';
import './dashboard.css';

class Dashboard extends Component{
    render(){
        return(        
            <div className='dashboard box'>
                <ul className="card-list">
                    <li className="card-list-item">
                        <div className="card"></div>
                    </li>   
                    <li className="card-list-item">
                        <div className="card"></div>
                    </li>  
                    <li className="card-list-item">
                        <div className="card"></div>
                    </li>                                
                </ul>                
            </div>                              
        )
    }
}

export default Dashboard