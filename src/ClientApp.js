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
import { getUpdateLoanList} from './Actions/FarmerBankAction'
import { getAdminMoney } from './Actions/PoolActions'
import { updateWeb3 } from './Actions/Web3Action'

import getWeb3 from './utils/getWeb3'




class ClientApp extends Component{
    state = {
        web3: null,
        sidebar: false
    }
    componentWillMount(){
        getWeb3.then(result=>{
            console.log("result", result)
            this.setState({
                web3:result.web3
            })
        })
        this.props.getUser();
        this.props.getUpdateProductList();
        this.props.getUpdatePoolList();
        this.props.getUpdateTransactiontList();
        this.props.getUpdateLoanList();
        this.props.getAdminMoney()
        this.setState({
            sidebar: false
        })
    }
    showSidebar = ()=>{
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    render(){
        if(this.state.web3 ===null){
            return(
                <div></div>
            )
        }else return(
            < div className="app-layout">
                    <Sidebar sidebarShow={this.state.sidebar} showSidebar={this.showSidebar} web3={this.state.web3} />
                    {!this.props.user.loading?<div className='main-layout'  web3={this.state.web3}>
                        <Header showSidebar={this.showSidebar}/>
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
export default withRouter(connect(mapStateToProps,{ getAdminMoney,getUser, getUpdateProductList, getUpdatePoolList, getUpdateTransactiontList,getUpdateLoanList, updateWeb3})(ClientApp))