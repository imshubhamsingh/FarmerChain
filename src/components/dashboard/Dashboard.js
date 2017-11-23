import React, { Component } from 'react';
import './dashboard.css';

class Dashboard extends Component{
    render(){
        return(        
            <div className='dashboard box'>
                <ul className="card-list">
                    <li className="card-list-item">
                        <div className="card">
                            <div>Pool Farming</div>
                        </div>
                    </li>   
                    <li className="card-list-item">
                        <div className="card">Cart Farm</div>
                    </li>  
                    <li className="card-list-item">
                        <div className="card">Farmers' Bank</div>
                    </li>                                
                </ul>                
            </div>                              
        )
    }
}

export default Dashboard