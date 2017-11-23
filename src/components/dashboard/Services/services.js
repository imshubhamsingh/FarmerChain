import React, { Component } from 'react';
import './services.css';

class Services extends Component{
    render(){
        return(
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
        )
    }
}

export default Services