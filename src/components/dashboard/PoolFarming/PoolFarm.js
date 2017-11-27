import React, { Component } from 'react';
import {setPoolRequest, getPoolList, getUpdatePoolList, deletePoolRequest} from '../../../Actions/PoolFarmAction'
import {connect} from 'react-redux'
import './poolfarm.css';


import $ from 'jquery';
import PoolOffers from "./PoolOffers";
const jQuery = $;

class PoolFarm extends Component{
    componentDidMount(){
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
        poolType:'hand',
        buttonText: 'Submit Request'
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            buttonText: 'Submitting Request'
        })
        this.props.setPoolRequest({
            description:this.state.description,
            poolType: this.state.poolType,
            createdAt: Date.now()
        }).then(()=>{
            this.setState({
                buttonText: 'Request Accepted'
            })

            setTimeout(()=>{
                this.setState({
                    description:'',
                    poolType:'hand',
                    buttonText: 'Submit Request'
                })
            },2000)


        })

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
                                    <input type="text" id="pool" value={this.state.description} onChange={event=> this.setState({description:event.target.value})}/>
                                </div>
                                <div>
                                    <label htmlFor="type">Pool Type</label>
                                    <select id="type" value={this.state.poolType} onChange={event=> this.setState({poolType:event.target.value})}>
                                        <option value="hand">Hand</option>
                                        <option value="machine">Machine</option>
                                        <option value="storage">Storage</option>
                                    </select>
                                </div>
                                <button className="btn btn-effect" type="submit">{this.state.buttonText}</button>

                            </form>
                            <div className="user-pool-list">
                                <h3>Your request pool</h3>
                                <ul>
                                    {this.props.pool!==null?this.props.pools.map((pool)=> {
                                        if(pool.userId === this.props.user.uid){
                                            return <li key={pool.id}>
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
                                                <button className="btn-pool btn-effect" onClick={deletePoolRequest(pool)} style={{backgroundColor:'red'}}>Delete Pool</button>
                                            </li>
                                        }
                                        return '';


                                    }):''}

                                </ul>
                            </div>

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
                                {this.props.pool!==null?this.props.pools.map((pool)=> {
                                    if(pool.userId !== this.props.user.uid){
                                        console.log(typeof (pool.acceptedBy))
                                        if(pool.acceptedBy.indexOf(this.props.user.uid) <=-1){
                                            return <PoolOffers pool={pool} user={this.props.user} />
                                        }

                                    }
                                    return '';


                                }):''}

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        pools: state.pools,
        user: state.user.user

    };
}

export default connect(mapStateToProps,{setPoolRequest, getPoolList, getUpdatePoolList, deletePoolRequest})(PoolFarm)