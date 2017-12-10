import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Blockchain extends Component {
	render() {
		return (
			<li className="transaction-list">
				<div
					className="arrowHash"
					style={{ display: this.props.historyDetails.blockNumber === this.props.blocklen ? 'none' : '' }}
				>
					<i class="fa fa-arrow-up" aria-hidden="true" />
				</div>
				<div className="info">
					<div className="name">
						<div className="product-user">{`Block Number:  ${this.props.historyDetails.blockNumber}`}</div>
					</div>
					<div className="info" style={{ textAlign: 'left' }}>
						<b>Transaction Hash</b>
						<br />{' '}
						{this.props.historyDetails.transactionHash !== undefined ? (
							this.props.historyDetails.transactionHash
						) : (
							'Genesis Block'
						)}
						<br />
						<b>Gas Used</b> <br />
						{this.props.historyDetails.gasUsed}
						<br />
						<b>Block Hash</b> <br /> {this.props.historyDetails.blockHash}
						<br />
						<b>Parent Hash</b> <br />
						{this.props.historyDetails.parentHash}
					</div>
				</div>
			</li>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.user
	};
}

export default withRouter(connect(mapStateToProps, {})(Blockchain));
