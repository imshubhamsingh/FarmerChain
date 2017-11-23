import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './services.css';

class Services extends Component{
    render(){
        return(
                <ul className="card-list">
                    <Link to="/poolFarm" style={{ textDecoration: 'none' }} className="card-list-item">
                        <div className="card">
                            <div>Pool Farming</div>
                        </div>
                    </Link>
                    <Link to="/cartFarm" style={{ textDecoration: 'none' }} className="card-list-item">
                        <div className="card">Cart Farm</div>
                    </Link>
                    <Link to="/farmerBank" style={{ textDecoration: 'none' }} className="card-list-item">
                        <div className="card">Farmers' Bank</div>
                    </Link>
                </ul>
        )
    }
}

export default Services