import React, { Component } from 'react';
import './cartfarm.css';
import $ from 'jquery';
const jQuery = $;

class CartFarm extends Component{
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
                        <li><a>Place Order</a></li>
                        <li><a>Added Items</a></li>
                        <li><a>Track Items</a></li>
                        <li><a>Pay for Items</a></li>
                    </ul>

                    <div className="tab_content">

                        <div className="tabs_item product-request">
                            <form action="">
                                <div>
                                    <label htmlFor="pool">Product Name</label>
                                    <input type="text" id="pool"/>
                                </div>
                                <div>
                                    <label htmlFor="type">Quantity(kg)</label>
                                    <select id="type">
                                        <option value="volvo">1</option>
                                        <option value="saab">2</option>
                                        <option value="mercedes">3</option>
                                        <option value="mercedes">4</option>
                                    </select>
                                </div>
                                <button className="btn btn-effect" type="submit">Order</button>

                            </form>
                        </div>

                        <div className="tabs_item pool-list">
                            <div className="product-list">
                                <div className="products-list">
                                    <h2>Global Product List</h2>
                                    <ul>
                                        <li>
                                            <div className="info">
                                                <div className="name">Manure (10kg)
                                                    <div className="type">
                                                        Added By Shubham
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-pool btn-effect" type="submit">Volunteer to Buy</button>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <div className="name">Manure (10kg)
                                                    <div className="type">
                                                        Added By Shubham
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-pool btn-effect" type="submit">Volunteer to Buy</button>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <div className="name">Manure (10kg)
                                                    <div className="type">
                                                        Added By Shubham
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-pool btn-effect" type="submit">Volunteer to Buy</button>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <div className="name">Manure (10kg)
                                                    <div className="type">
                                                        Added By Shubham
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-pool btn-effect" type="submit">Volunteer to Buy</button>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <div className="name">Manure (10kg)
                                                    <div className="type">
                                                        Added By Shubham
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-pool btn-effect" type="submit">Volunteer to Buy</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="products-list">
                                    <h2>Your buying List</h2>
                                    <ul>
                                        <li>
                                            <div className="info">
                                                <div className="name">Manure (10kg)
                                                    <div className="type">
                                                        Added By Shubham
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-pool btn-effect yet-to-buy" type="submit">Yet to Buy</button>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <div className="name">Manure (10kg)
                                                    <div className="type">
                                                        Added By Shubham
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-pool btn-effect yet-to-buy" type="submit">Yet to Buy</button>
                                        </li>
                                        <li>
                                            <div className="info">
                                                <div className="name">Manure (10kg)
                                                    <div className="type">
                                                        Added By Shubham
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-pool btn-effect bought" type="submit">Bought</button>
                                        </li>
                                    </ul>
                                </div>


                            </div>

                        </div>

                        <div className="tabs_item pool-list">
                            <iframe
                                title="currentlocation"
                                style={
                                {
                                    width:'100%',
                                    height:'100%',
                                    margin: '0',
                                    padding: '0',
                                    border: 'none'
                            }} type="image/svg+xml" src="https://dashboard.hypertrack.com/widget/list/users;id=b0d9fa85-e2d5-440a-b9bd-20e53991db85?show_all=true&ordering=-last_heartbeat_at&key=sk_5749169650188a0b995add7fa81b5d536bcf36fa" >
                            </iframe>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default CartFarm