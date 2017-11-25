import React, { Component } from 'react'
import './bottombar.css'

class Bottombar extends Component{
    render(){
        return(
            <div className='bottombar box'>
                <div>
                    <ul id="bottombar-menu">
                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Current Balance
                                </h6>
                                <h1>
                                    $25
                                </h1>
                            </div>
                        </li>
                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Pool Accepted
                                </h6>
                                <h1>
                                    4
                                </h1>
                            </div>
                        </li>

                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Ordered Products
                                </h6>
                                <h1>
                                    2
                                </h1>
                            </div>
                        </li>

                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
                                <h6>
                                    Transaction Received
                                </h6>
                                <h1>
                                    20
                                </h1>
                            </div>
                        </li>
                        <li className="bottom-menu-list">
                            <div className="bottom-menu-list-item">
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
            </div>
        )
    }
}

export default Bottombar