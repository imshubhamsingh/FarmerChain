import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {TimelineLite, Elastic} from 'gsap';
import {connect} from 'react-redux';
import { updateHeader } from '../../../Actions/HeaderTextAction';
import $ from 'jquery';
import PoolFarmImg from './poolFarming.jpg'
import FarmerBank from './farmerBank.png'
import CartFarm from './cartFarm.jpg'
import './services.css'
const jQuery = $;

class Services extends Component{
    componentDidMount(){
        this.props.updateHeader('Home');
        console.log(this.props);
        $(document).ready(function() {

            (function ($) {
                let serviceList = $('ul.card-list').children();
                let t1Loader = new TimelineLite();

                t1Loader.staggerFromTo(
                    serviceList,
                    1,
                    { y: +20, autoAlpha:0},
                    { y: 0, autoAlpha:1, ease:Elastic.easeIn},
                    0.5
                );
            })(jQuery);

        });
    }

    render(){
        return(
            <ul className="card-list">
                <Link to="/poolFarm" style={{ textDecoration: 'none' }} className="card-list-item">
                    <div className="card" style={{background:`url(${PoolFarmImg}) center`,overflow:'hidden', position:'relative'}}>
                        <div className="service-card" style={{backgroundColor:'lime'}}>Pool Farming</div>
                    </div>
                </Link>
                <Link to="/cartFarm" style={{ textDecoration: 'none' }} className="card-list-item">
                    <div className="card" style={{background:`url(${CartFarm}) center`,overflow:'hidden', position:'relative',objectFit: 'cover',objectPosition: 'center right'}}>
                        <div className="service-card" style={{backgroundColor:'yellow'}}>Cart Farming</div>
                    </div>
                </Link>
                <Link to="/farmerBank" style={{ textDecoration: 'none' }} className="card-list-item">
                    <div className="card" style={{background:`url(${FarmerBank}) center`,overflow:'hidden', position:'relative'}}>
                        <div className="service-card" style={{backgroundColor:'blue'}}>Farmers' Bank</div>
                    </div>
                </Link>
            </ul>
        );
    }
}
export default connect(null,{updateHeader})(Services);