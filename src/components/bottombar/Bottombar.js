import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { orderProducts, countAcceptedPool, transactionDone, transactionReceived} from '../../helpers/userServiceDetails'

class Bottombar extends Component{
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
                                    ₹{this.props.money}
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
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        money: state.user.money,
        pools: state.pools,
        products: state.products,
        transactions: state.transactions
    };
}


export default withRouter(connect(mapStateToProps,null)(Bottombar))