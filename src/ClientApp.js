import React, { Component } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Bottombar from './components/bottombar/Bottombar'
import { withRouter } from 'react-router-dom'

import './App.css';

import {connect} from 'react-redux'
import { getUser } from './Actions/UserActions';
import {getUpdateProductList} from './Actions/CartFarmAction'
import {getUpdatePoolList} from './Actions/PoolFarmAction'
import { getUpdateTransactiontList} from './Actions/TransactionAction'

import getWeb3 from './utils/getWeb3'




class ClientApp extends Component{
    state = {
        web3: null
    }
    componentWillMount(){
        this.props.getUser();
        this.props.getUpdateProductList();
        this.props.getUpdatePoolList();
        this.props.getUpdateTransactiontList()
        getWeb3
            .then(results => {
                this.setState({ web3: results.web3 })
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    render(){
        return(
            < div className="app-layout">
                    <Sidebar/>
                    {!this.props.user.loading?<div className='main-layout'  web3={this.state.web3}>
                        <Header/>
                        <Dashboard  web3={this.state.web3}/>
                        {!this.props.user.loading?<Bottombar  web3={this.state.web3}/>:''}
                    </div>:''}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}
export default withRouter(connect(mapStateToProps,{getUser, getUpdateProductList, getUpdatePoolList, getUpdateTransactiontList})(ClientApp))