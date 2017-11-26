import React, { Component } from 'react';
import './farmerbank.css'
import $ from 'jquery';
const jQuery = $;

class FarmerBank extends Component{
    componentDidMount(){
        $(document).ready(function() {

            (function ($) {
                $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

                $('.tab ul.tabs li a').click(function (g) {
                    var tab = $(this).closest('.tab'),
                        index = $(this).closest('li').index();

                    tab.find('ul.tabs > li').removeClass('current');
                    $(this).closest('li').addClass('current');

                    tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                    tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

                    g.preventDefault();
                } );
            })(jQuery);

        });
    }

    render(){
        return(
            <div>
                <div className="tab">

                    <ul className="tabs">
                        <li><a>Request a Loan</a></li>
                        <li><a>Add Funds</a></li>
                        <li><a>Transaction History</a></li>
                    </ul>

                    <div className="tab_content">

                        <div className="tabs_item farmerBank-request">
                            <form action="">
                                <div>
                                    <label htmlFor="pool">Loan Description</label>
                                    <input type="text" id="pool"/>
                                </div>
                                <div>
                                    <label htmlFor="pool">Loan Amount (ETH)</label>
                                    <input type="number" id="pool"/>
                                </div>
                                <button className="btn btn-effect" type="submit">Request Loan</button>

                            </form>
                        </div>

                        <div className="tabs_item pool-list">
                            <ul>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                20 ETH
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Add</button>
                                </li>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                100 ETH
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Add</button>
                                </li>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                300 ETH
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Add</button>
                                </li>
                            </ul>
                        </div>



                    </div>
                </div>
            </div>
        )
    }

}


export default FarmerBank;
