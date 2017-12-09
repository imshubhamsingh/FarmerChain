import React, { Component } from 'react';
import  gravatar from 'gravatar';
import {TimelineLite, Elastic} from 'gsap';
import { connect } from 'react-redux';
import {logout} from '../../Actions/UserActions';
import { Link, withRouter } from 'react-router-dom';
import {countAcceptedPool, orderProducts, transactionDone, transactionReceived} from '../../helpers/userServiceDetails';
import './main.css'
import logo from './logo-main.svg';

import $ from 'jquery';
const jQuery = $;

class Main extends Component{
    state = {
        money: 0,
        blockChainLen:0
    }
    componentDidMount(){
        // this.props.web3.eth.getBalance(this.props.ethaccount).then(money => {
        //     this.setState({
        //         money: parseFloat(money / 1e16).toFixed(2)
        //     })
        // })
        this.getMoneyFromAccount()
        this.getToatalTransaction()
        console.log("sidebar", this.props.web3)
        $(document).ready(function() {

            (function ($) {
                let img = $('.wrapper').children(),
                    name = $('#name'),
                    accountNo = $('#accountNo'),
                    details = $('.menu ul>li'),
                    logout = $('.logOut');
                let serviceList = [...name,...accountNo,...details,...logout];
                let t1Loader = new TimelineLite({delay:0.5});

                t1Loader.staggerFromTo(
                    serviceList,
                    0.25,
                    { y: +20, autoAlpha:0},
                    { y: 0, autoAlpha:1, ease: Elastic.SlowMo},
                    0.15
                )
                    .fromTo(img, 0.5, {y:50, autoAlpha:0},{ y: 0, autoAlpha:1, ease: Elastic.SlowMo}, '-=1.25');
            })(jQuery);

        });
    }
    logOutFn = () => {
        this.props.showSidebar()
        this.props.logout()
    }
    getMoneyFromAccount = ()=>{
        this.props.web3.eth.getBalance(this.props.ethaccount,(error, result)=>{
            if(!error)
            this.setState({
                money: parseFloat(result.toNumber()/ 1e16).toFixed(2)
            })
            else
                console.error(error);
        });
    }

    getToatalTransaction = ()=>{
        this.props.web3.eth.getBlockNumber((error, resultLen)=>{

            if(!error){
                const blockChainLen = resultLen;
                this.setState({
                    blockChainLen
                })

            }
            else
                console.error(error);
        })
    }

    render(){
        return(
            <div className="sidebar-main ">
                <span onClick={this.props.showSidebar} className="sideArrow"><i className ="fa fa-arrow-right" aria-hidden="true"></i></span>
                <img src={logo} alt="logo" className="logo-main" />
                <div className="wrapper">
                    <img alt="userPic"src={gravatar.url(this.props.user.email,{s:'200'})} className="image--cover" />
                </div>
                <h3 id="name">{this.props.displayName || this.props.user.displayName}</h3>
                <h6 id="accountNo" style={{marginLeft: "-8px",fontSize: "10px"}}>{this.props.account ||this.props.ethaccount}</h6>
                {console.log(this.props.user)}

                <div className="menu">
                    <ul>
                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Current Balance
                                </h6>
                                <h1>
                                 ₹{this.state.money}
                                </h1>
                            </div>
                        </li>
                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Pool Accepted
                                </h6>
                                <h1>
                                    {countAcceptedPool(this.props.pools, this.props.user)}
                                </h1>
                            </div>
                        </li>

                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Ordered Products
                                </h6>
                                <h1>
                                    {orderProducts(this.props.products, this.props.user)}
                                </h1>
                            </div>
                        </li>

                        <li className="menu-list">
                            <div className="menu-list-item">
                                <h6>
                                    Total Transaction Done
                                </h6>
                                <h1>
                                    {this.state.blockChainLen}
                                </h1>
                            </div>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="logOut" style={{textDecoration: "none"}} onClick={this.logOutFn}>
                    Log Out
                </Link>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        money: state.user.money,
        pools: state.pools,
        ethaccount: state.user.account,
        products: state.products,
        transactions: state.transactions,
    };
}


export default withRouter(connect(mapStateToProps,{logout})(Main));