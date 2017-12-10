import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	orderProducts,
	countAcceptedPool,
	transactionDone,
	transactionReceived
} from '../../helpers/userServiceDetails';
import './bottombar.css';

class Bottombar extends Component {
	state = {
		money: 0,
		blockChainLen: 0
	};
	componentDidMount() {
		this.getMoneyFromAccount();
		this.getTotalTransaction();
	}

	getMoneyFromAccount = () => {
		this.props.web3.eth.getBalance(this.props.ethaccount, (error, result) => {
			if (!error)
				this.setState({
					money: parseFloat(result.toNumber() / 1e16).toFixed(2)
				});
			else console.error(error);
		});
	};

	getTotalTransaction = () => {
		this.props.web3.eth.getBlockNumber((error, resultLen) => {
			if (!error) {
				const blockChainLen = resultLen;
				this.setState({
					blockChainLen
				});
			} else console.error(error);
		});
	};

	render() {
		return (
			<div className="bottombar box">
				<div className="main-menu">
					<ul id="bottombar-menu">
						<li className="bottom-menu-list">
							<div className="bottom-menu-list-item" onClick={() => this.getMoneyFromAccount()}>
								<h6>Current Balance</h6>
								<h1>₹{this.state.money}</h1>
							</div>
						</li>
						<li className="bottom-menu-list">
							<div className="bottom-menu-list-item">
								<h6>Pool Accepted</h6>
								<h1>{countAcceptedPool(this.props.pools, this.props.user)}</h1>
							</div>
						</li>

						<li className="bottom-menu-list">
							<div className="bottom-menu-list-item">
								<h6>Ordered Products</h6>
								<h1>{orderProducts(this.props.products, this.props.user)}</h1>
							</div>
						</li>

						<li className="bottom-menu-list">
							<div className="bottom-menu-list-item" onClick={() => this.getTotalTransaction()}>
								<h6>Total Transaction Done</h6>
								<h1>{this.state.blockChainLen}</h1>
							</div>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.user,
		money: state.user.money,
		pools: state.pools,
		products: state.products,
		transactions: state.transactions,
		ethaccount: state.user.account
	};
}

export default withRouter(connect(mapStateToProps, null)(Bottombar));
