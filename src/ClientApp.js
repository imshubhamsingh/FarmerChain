import React, { Component } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Bottombar from './components/bottombar/Bottombar';
import { withRouter } from 'react-router-dom';

import './App.css';

import { connect } from 'react-redux';
import { getUser } from './Actions/UserActions';
import { getUpdateProductList } from './Actions/CartFarmAction';
import { getUpdatePoolList } from './Actions/PoolFarmAction';
import { getUpdateTransactiontList } from './Actions/TransactionAction';
import { getUpdateLoanList } from './Actions/FarmerBankAction';
import { getAdminMoney } from './Actions/PoolActions';
import { updateWeb3 } from './Actions/Web3Action';
import { updateMoneyFromAccount, updateTotalTransaction } from './Actions/Web3Action';

import getWeb3 from './utils/getWeb3';
import { deployContract } from './utils/deployContract';

class ClientApp extends Component {
	state = {
		web3: null,
		sidebar: false,
		instance: null,
		filter: null,
		money: 0,
		transaction: 0,
		fund: 0
	};

	async loadWeb3(getWeb3) {
		const result = await getWeb3;
		this.setState({ web3: result.web3, filter: result.filter });
		return result.web3;
	}

	async loadContractInstance(web3) {
		const instance = await deployContract(web3);
		this.setState({ instance });
	}
	async componentWillMount() {
		this.loadWeb3(getWeb3).then(() => {
			if (this.props.ethaccount !== undefined) {
				this.props.updateMoneyFromAccount(this.state.web3, this.props.ethaccount);
				this.props.updateTotalTransaction(this.state.web3);
				this.state.filter.watch((error, result) => {
					this.props.updateMoneyFromAccount(this.state.web3, this.props.ethaccount);
					this.props.updateTotalTransaction(this.state.web3);
				});
			}
		});
		this.props.getUser();
		this.props.getUpdateProductList();
		this.props.getUpdatePoolList();
		this.props.getUpdateTransactiontList();
		this.props.getUpdateLoanList();
		this.props.getAdminMoney();
		this.setState({
			sidebar: false
		});
	}

	showSidebar = () => {
		this.setState({
			sidebar: !this.state.sidebar
		});
	};

	render() {
		if (this.state.web3 === null && this.state.instance === null) {
			return <div />;
		} else
			return (
				<div className="app-layout">
					<Sidebar sidebarShow={this.state.sidebar} showSidebar={this.showSidebar} web3={this.state.web3} />
					{!this.props.user.loading ? (
						<div className="main-layout" web3={this.state.web3}>
							<Header showSidebar={this.showSidebar} />
							<Dashboard web3={this.state.web3} contractInstance={this.state.instance} />
							{!this.props.user.loading ? <Bottombar web3={this.state.web3} /> : ''}
						</div>
					) : (
						''
					)}
				</div>
			);
	}
}

function mapStateToProps(state) {
	return { user: state.user, ethaccount: state.user.account };
}
export default withRouter(
	connect(mapStateToProps, {
		getAdminMoney,
		getUser,
		getUpdateProductList,
		getUpdatePoolList,
		getUpdateTransactiontList,
		getUpdateLoanList,
		updateMoneyFromAccount,
		updateTotalTransaction
	})(ClientApp)
);
