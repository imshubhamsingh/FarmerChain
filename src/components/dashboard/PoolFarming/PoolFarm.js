import React, { Component } from 'react';
import {setPoolRequest, getPoolList, getUpdatePoolList} from '../../../Actions/PoolFarmAction'
import {connect} from 'react-redux'
import './poolfarm.css';
import $ from 'jquery';
const jQuery = $;

class PoolFarm extends Component{
    componentDidMount(){
        this.props.getPoolList();
        this.props.getUpdatePoolList();
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
    state = {
        description:'',
        poolType:'Hand'
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.setPoolRequest({...this.state});
    }
    render(){
        return(
            <div>
                <div className="tab">

                    <ul className="tabs">
                        <li><a>Pool Request</a></li>
                        <li><a>Accepted Pools</a></li>
                        <li><a>Pooling Offers</a></li>
                    </ul>

                    <div className="tab_content">

                        <div className="tabs_item pool-request">
                            <form onSubmit={this.handleSubmit} action="">
                                <div>
                                    <label htmlFor="pool">Pool Description</label>
                                    <input type="text" id="pool" onChange={event=> this.setState({description:event.target.value})}/>
                                </div>
                                <div>
                                    <label htmlFor="type">Pool Type</label>
                                    <select id="type" value={this.state.poolType} onChange={event=> this.setState({poolType:event.target.value})}>
                                        <option value="hand">Hand</option>
                                        <option value="machine">Machine</option>
                                        <option value="storage">Storage</option>
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
                                {this.props.pools.map((pool)=> <li key={pool.id}>
                                    <div className="info">
                                        <div className="name">{pool.username}
                                            <div className="type">
                                                {pool.poolType}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details">
                                        {pool.description}
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Accept Pool</button>
                                </li>
                                )}

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.pools)
    return { pools: state.pools };
}

export default connect(mapStateToProps,{setPoolRequest, getPoolList, getUpdatePoolList})(PoolFarm)