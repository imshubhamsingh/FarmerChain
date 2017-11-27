import React, { Component } from 'react'
import  gravatar from 'gravatar'
import {TimelineLite, Elastic} from "gsap";
import { connect } from 'react-redux';
import {logout} from "../../Actions/UserActions";
import { withRouter } from 'react-router-dom'

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

    render(){
        return(
            <div className="sidebar-main">
                <div className="wrapper">
                    <img alt="userPic"src={gravatar.url(this.props.user.email,{s:'200'})} className="image--cover" />
                </div>
                <h3 id="name">{this.props.displayName || this.props.user.displayName}</h3>
                <h6 id="accountNo">{`0x${this.props.user.uid}`}</h6>

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
                <button className="logOut" onClick={this.props.logout}>
                    Log Out
                </button>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user

    };
}


export default withRouter(connect(mapStateToProps,{logout})(Main))