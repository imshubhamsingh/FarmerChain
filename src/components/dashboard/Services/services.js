import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './services.css';
import {TimelineLite, Elastic} from "gsap";
import $ from 'jquery';
const jQuery = $;

class Services extends Component{
    componentDidMount(){
        $(document).ready(function() {

            (function ($) {
                let serviceList = $('ul.card-list').children();
                console.log(serviceList);
                let t1Loader = new TimelineLite();

                t1Loader.staggerFromTo(
                    serviceList,
                    1,
                    { y: +20, autoAlpha:0},
                    { y: 0, autoAlpha:1, ease:Elastic.easeIn},
                    0.5
                )
            })(jQuery);

        });
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