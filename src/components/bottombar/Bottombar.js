import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { orderProducts, countAcceptedPool, transactionDone, transactionReceived} from '../../helpers/userServiceDetails';
import './bottombar.css'

class Bottombar extends Component{
    state = {
        money:''
    }
    componentDidMount(){
     this.props.web3.eth.getBalance(this.props.ethaccount).then(money => {
            this.setState({
                money: parseFloat(money / 1e16).toFixed(2)
            })
        })
    }
    render(){
        return(
            <div className='bottombar box'>
                <div className="main-menu">
                    <ul id="bottombar-menu">
                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Current Balance
                                </h6>
                                <h1>
                                    ₹{this.state.money}
                                </h1>
                            </div>
                        </li>
                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Pool Accepted
                                </h6>
                                <h1>
                                    {countAcceptedPool(this.props.pools, this.props.user)}
                                </h1>
                            </div>
                        </li>

                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Ordered Products
                                </h6>
                                <h1>
                                    {orderProducts(this.props.products, this.props.user)}
                                </h1>
                            </div>
                        </li>

                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Transaction Received
                                </h6>
                                <h1>
                                    {transactionReceived(this.props.transactions,this.props.user.uid)}
                                </h1>
                            </div>
                        </li>
                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Transaction Done
                                </h6>
                                <h1>
                                    {transactionDone(this.props.transactions,this.props.user.uid)}
                                </h1>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        money: state.user.money,
        pools: state.pools,
        products: state.products,
        transactions: state.transactions,
        ethaccount: state.user.account
    };
}


export default withRouter(connect(mapStateToProps,null)(Bottombar));