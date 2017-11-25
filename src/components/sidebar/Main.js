import React, { Component } from 'react'
import  gravatar from 'gravatar'
import {TimelineLite, Elastic} from "gsap";
import { auth } from '../../firebase/firebase'

import './main.css'

import $ from 'jquery';
const jQuery = $;

class Main extends Component{
    componentDidMount(){
        $(document).ready(function() {

            (function ($) {
                let img = $('.wrapper').children(),
                    name = $('#name'),
                    accountNo = $('#accountNo'),
                    details = $('.menu ul>li');
                let serviceList = [...name,...accountNo,...details];
                console.log(serviceList);
                let t1Loader = new TimelineLite({delay:0.5});

                t1Loader.staggerFromTo(
                    serviceList,
                    1,
                    { y: +20, autoAlpha:0},
                    { y: 0, autoAlpha:1, ease: Elastic.SlowMo},
                    0.5
                )
                    .fromTo(img, 0.5, {y:50, autoAlpha:0},{ y: 0, autoAlpha:1, ease: Elastic.SlowMo}, "-=3.25")
            })(jQuery);

        });
    }
    logout = ()=>{
        auth.signOut().then(function() {
            // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
    }
    render(){
        return(
            <div className="sidebar-main">
                <div className="wrapper">
                    <img src={gravatar.url('imshubhamsingh97@gmail.com',{s:'200'})} className="image--cover" />
                </div>
                <h3 id="name">Shubham Singh</h3>
                <h6 id="accountNo">0x43254543mn45kj435h43jh445</h6>

                <div className="menu">
                    <ul>
                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Current Balance
                                </h6>
                                <h1>
                                    $25
                                </h1>
                            </div>
                        </li>
                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Pool Accepted
                                </h6>
                                <h1>
                                   4
                                </h1>
                            </div>
                        </li>

                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Ordered Products
                                </h6>
                                <h1>
                                    2
                                </h1>
                            </div>
                        </li>

                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Transaction Received
                                </h6>
                                <h1>
                                    20
                                </h1>
                            </div>
                        </li>
                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Transaction Done
                                </h6>
                                <h1>
                                    2
                                </h1>
                            </div>
                        </li>
                    </ul>                    
                </div>
                <button className="logOut" onClick={this.logout}>
                    Log Out
                </button>

            </div>
        )
    }
}

export default Main