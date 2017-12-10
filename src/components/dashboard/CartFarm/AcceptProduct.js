import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { payForProduct } from '../../../Actions/CartFarmAction';
import swal from 'sweetalert2';

class AcceptProduct extends Component {
	payToUser = (event) => {
		event.preventDefault();
		swal({
			title: 'Are you want pay?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			preConfirm: () => {
				return new Promise((resolve) => {
					this.props.web3.sendTransaction(
						{ from: this.props.ethaccount, to: this.props.product.account },
						function(error, result) {
							if (error) {
								console.log('Error: ', error);
								swal('Oops...', error.toString(), 'error');
							} else {
								console.log(result);
								resolve(result);
							}
						}
					);
				});
			}
		})
			.then((result) => {
				if (result.value) {
					this.getReceipts(result.value).then((result) => {
						console.log(result);
						swal({
							title: 'Member added Successfully',
							type: 'success',
							html:
								'<b>Success!</b><br /><b>Transaction Hash</b> ' +
								result.transactionHash +
								'<br /><b>Blockhash</b><br/>' +
								result.blockHash +
								'<br/><b>Gas Used</b><br/> ' +
								result.gasUsed
						});
					});
					this.setState({
						loanDescription: '',
						amount: 0
					});
				}
			})
			.catch((error) => {
				swal('Oops...', error.toString(), 'error');
			});
	};
	pay = () => {
		swal({
			title: `Do you want to Pay ${this.props.boughtbyDetails.displayName} for buying ${this.props.product
				.productName} (${this.props.product.quantity}kg) for ₹ ${this.props.boughtbyDetails.price}`,
			showCancelButton: true,
			confirmButtonText: 'Yes',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve();
					}, 2000);
				});
			},
			allowOutsideClick: false
		}).then((result) => {
			if (result.value) {
				const { displayName, email, uid } = this.props.user;
				const info = {
					productName: this.props.product.productName,
					quantity: this.props.product.quantity,
					price: this.props.boughtbyDetails.price,
					id: this.props.product.id
				};
				console.log(this.props.web3.eth);
				let flag = false;
				this.props.web3.eth.sendTransaction(
					{
						from: this.props.web3.eth.accounts[0],
						to: this.props.boughtbyDetails.boughtAccount,
						value: this.props.boughtbyDetails.price + '0000000000000000'
					},
					(error, result) => {
						if (!error) {
							console.log(result);
							flag = true;
							this.props.payForProduct(
								info,
								{ displayName, email, uid },
								this.props.boughtbyDetails,
								result
							);
							swal({
								type: 'success',
								title: 'Transaction was complete'
							});
						} else {
							console.log('No');
							swal({
								type: 'error',
								title: 'Transaction failed'
							});
						}
					}
				);
				if (!flag) {
					swal({
						type: 'error',
						title: 'Enable MetaMask to Pay and run truffle develop'
					});
				}
			}
		});
	};

	render() {
		console.log(this.props.boughtbyDetails);
		return (
			<li>
				<div className="info">
					<div className="name">{`${this.props.product.productName} (${this.props.product.quantity}kg)`}</div>
				</div>
				<button
					className="btn-pool btn-effect"
					onClick={() => this.pay()}
					style={{ backgroundColor: 'green' }}
				>{`Pay ${this.props.boughtbyDetails.displayName}( ₹ ${this.props.boughtbyDetails.price} )`}</button>
			</li>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.user,
		money: state.user.money
	};
}

export default withRouter(connect(mapStateToProps, { payForProduct })(AcceptProduct));
