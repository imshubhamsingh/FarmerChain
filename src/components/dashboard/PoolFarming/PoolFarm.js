import React, { Component } from 'react';
import './poolfarm.css';
import $ from 'jquery';
const jQuery = $;

class PoolFarm extends Component{
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
                        <li><a href="#">Pool Request</a></li>
                        <li><a href="#">Accepted Pools</a></li>
                        <li><a href="#">Pooling Offers</a></li>
                    </ul>

                    <div className="tab_content">

                        <div className="tabs_item">
                            <form action="">
                                <div>
                                    <label htmlFor="pool">Pool Description</label>
                                    <input type="text" id="pool"/>
                                </div>
                                <div>
                                    <label htmlFor="type">Pool Type</label>
                                    <select id="type">
                                        <option value="volvo">Hand</option>
                                        <option value="saab">Machine</option>
                                        <option value="mercedes">Storage</option>
                                    </select>
                                </div>
                                <button className="btn btn-effect" type="submit">Submit Request</button>

                            </form>
                        </div>

                        <div className="tabs_item pool-list">
                            <ul>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                Hand
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                </li>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                Storage
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                </li>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                Machine
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="tabs_item pool-list">
                            <ul>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                Hand
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Accept Pool</button>
                                </li>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                Storage
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Accept Pool</button>
                                </li>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                Machine
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Accept Pool</button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default PoolFarm