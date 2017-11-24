import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './services.css';
import {TimelineLite} from "gsap";
import $ from 'jquery';
const jQuery = $;


class Services extends Component{
    componentDidMount(){
        let serviceList = $('ul.card-list').children();
        let t1Loader = new TimelineLite();

        t1Loader.staggerFromTo(
            serviceList,
            0.05,
            { y: +20, autoAlpha:0},
            { y: 0, autoAlpha:1},
            0.33
        )
    }
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