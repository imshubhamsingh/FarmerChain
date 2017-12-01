import React, { Component } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Bottombar from './components/bottombar/Bottombar'
import { withRouter } from 'react-router-dom'


import {connect} from 'react-redux'
import { getUser } from './Actions/UserActions';
import {getUpdateProductList} from './Actions/CartFarmAction'
import {getUpdatePoolList} from './Actions/PoolFarmAction'
import { getUpdateTransactiontList} from './Actions/TransactionAction'
import { getUpdateLoanList} from './Actions/FarmerBankAction'
import { getAdminMoney } from './Actions/PoolActions'

import getWeb3 from './utils/getWeb3'




class ClientApp extends Component{
    state = {
        web3: null,
        sidebar: false
    }
    componentWillMount(){
        this.props.getUser();
        this.props.getUpdateProductList();
        this.props.getUpdatePoolList();
        this.props.getUpdateTransactiontList();
        this.props.getUpdateLoanList();
        this.props.getAdminMoney()
        this.setState({
            sidebar: false
        })
        getWeb3
            .then(results => {
                this.setState({ web3: results.web3 })
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }
    showSidebar = ()=>{
        this.setState({
            sidebar: !this.state.sidebar
        })
    }
    render(){
        return(
            < div className="app-layout">
                    <Sidebar sidebarShow={this.state.sidebar} showSidebar={this.showSidebar}/>
                    {!this.props.user.loading?<div className='main-layout'  web3={this.state.web3}>
                        <Header showSidebar={this.showSidebar} />
                        <Dashboard  web3={this.state.web3} />
                        {!this.props.user.loading?<Bottombar  web3={this.state.web3}/>:''}
                    </div>:''}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}
export default withRouter(connect(mapStateToProps,{ getAdminMoney,getUser, getUpdateProductList, getUpdatePoolList, getUpdateTransactiontList,getUpdateLoanList})(ClientApp))