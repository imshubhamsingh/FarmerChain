import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TimelineLite, Elastic } from 'gsap';
import { transactionDetailsSorted } from '../../../helpers/userAndTransaction';
import { deleteLoanRequest, setLoanRequest, payLoanBack, payToPool } from '../../../Actions/FarmerBankAction';
import { colorStatus } from '../../../helpers/bankHelper';
import { extractUserDetails } from '../../../helpers/userAndTransaction';
import { updateHeader } from '../../../Actions/HeaderTextAction';
import swal from 'sweetalert2';
import './farmerbank.css';
import { deployContract } from '../../../utils/deployContract';
import Blockchain from './Blockchain';

import $ from 'jquery';
const jQuery = $;

class FarmerBank extends Component {
	state = {
		loanDescription: '',
		amount: 0,
		amountPay: 0,
		buttonText: 'Request Loan',
		currentEtherbase: null,
		instance: null,
		fund: null,
		removeMember: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
		addMember: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
		addMod: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
		transactionHistory: [ {} ],
		blockChainLen: 0
	};
	async loadContractInstance(web3) {
		const instance = await deployContract(web3);
		window.instance = instance;
		this.setState({ instance });
	}

	componentDidMount() {
		this.props.updateHeader('Farmers Bank');
		this.checkFund();
		$(document).ready(function() {
			(function($) {
				$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

				$('.tab ul.tabs li a').click(function(g) {
					var tab = $(this).closest('.tab'),
						index = $(this).closest('li').index();
					console.log(index);

					tab.find('ul.tabs > li').removeClass('current');
					$(this).closest('li').addClass('current');

					tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
					tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

					g.preventDefault();
				});
			})(jQuery);
		});
		console.log(this.state.instance);
	}

	checkFund = () => {
		return this.loadContractInstance(this.props.web3).then(() => {
			this.state.instance.getBalance((error, result) => {
				if (!error)
					this.setState({
						fund: parseFloat(result.toNumber() / 1e16).toFixed(2)
					});
				else console.error(error);
			});
		});
	};

	checkIfLoanPaid = () => {
		let flag = false;
		this.props.loans !== null
			? this.props.loans.map((loan) => {
					if (loan.uid === this.props.user.uid) {
						if (loan.status === 'granted') {
							flag = true;
						}
					}
					return null;
				})
			: '';
		return flag;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.requestFromPool(this.state.amount);
	};

	showPastTransactions = () => {
		return transactionDetailsSorted(this.props.transactions, this.props.user.uid, 'loan');
	};

	payLoanBack = (loan) => {
		this.props.payLoanBack(loan, extractUserDetails(this.props.admin), extractUserDetails(this.props.user));
	};

	getReceipts = (hash) => {
		return new Promise((resolve, reject) => {
			this.props.web3.eth.getTransactionReceipt(hash, function(error, result) {
				if (!error) {
					console.log(result);
					resolve(result);
				} else {
					reject('Oops');
				}
			});
		});
	};

	payToPool = () => {
		swal({
			title: 'Enter amount to add to pool (₹)',
			input: 'number',
			showCancelButton: true,
			confirmButtonText: 'Submit',
			showLoaderOnConfirm: true,
			preConfirm: (number) => {
				let amount = number + '0000000000000000';
				return new Promise((resolve, reject) => {
					this.state.instance.addFundsorPayLoan.sendTransaction(
						{ from: this.props.web3.eth.accounts[0], value: amount },
						function(error, result) {
							if (error) {
								console.log('Error: ', error);
								reject(error);
							} else {
								console.log(result);
								resolve(result);
								// console.log(getReceipts(result));
								// getReceipts(result).then(function(receipt){
								//     console.log(receipt);
								//     swal({
								//         title: 'Details',
								//         type: 'success',
								//         html: '<b>Success!</b><br /><b>Transaction Hash</b>: ' + receipt.transactionHash + '<br /><b>Blockhash</b>:' + receipt.blockHash + '<br/><b>Gas Used<b>: ' + receipt.gasUsed
								//     })
								// }).catch(function(error){
								//     console.log(error);
								//     swal(
								//         'Oops...',
								//         error.toString(),
								//         'error'
								//     )
								// });
							}
						}
					);
				});
			},
			allowOutsideClick: false
		})
			.then((result) => {
				if (result.value) {
					console.log(result);
					this.getReceipts(result.value).then((result) => {
						console.log(result);
						swal({
							title: 'Details',
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
				}
			})
			.catch((error) => {
				swal('Oops...', error.toString(), 'error');
			});
	};

	requestFromPool = (amountRequested) => {
		swal({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			preConfirm: () => {
				let amountRequestedToWie = amountRequested + '0000000000000000';
				return new Promise((resolve) => {
					this.state.instance.requestLoan.sendTransaction(
						amountRequestedToWie,
						{ from: this.props.web3.eth.accounts[0] },
						function(error, result) {
							if (error) {
								console.log('Error: ', error);
								swal('Oops...', error.toString(), 'error');
							} else {
								console.log(result);
								resolve(result);
								// console.log(getReceipts(result));
								// getReceipts(result).then(function(receipt){
								//     console.log(receipt);
								//     swal({
								//         title: 'Details',
								//         type: 'success',
								//         html: '<b>Success!</b><br /><b>Transaction Hash</b>: ' + receipt.transactionHash + '<br /><b>Blockhash</b>:' + receipt.blockHash + '<br/><b>Gas Used<b>: ' + receipt.gasUsed
								//     })
								// }).catch(function(error){
								//     console.log(error);
								//     swal(
								//         'Oops...',
								//         error.toString(),
								//         'error'
								//     )
								// });
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
							title: 'Details',
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

	addMember = (event) => {
		event.preventDefault();
		swal({
			title: 'Are you want add member?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			preConfirm: () => {
				return new Promise((resolve) => {
					this.state.instance.addMembers.sendTransaction(
						this.state.addMember,
						{ from: this.props.web3.eth.accounts[0] },
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
	removeMember = (event) => {
		event.preventDefault();
		swal({
			title: 'Are you want remove member?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			preConfirm: () => {
				return new Promise((resolve) => {
					this.state.instance.removeMembers.sendTransaction(
						this.state.removeMember,
						{ from: this.props.web3.eth.accounts[0] },
						function(error, result) {
							console.log(result, error);
							if (error) {
								console.log('Error: ', error);
								swal('Oops...', error.toString(), 'error');
							} else {
								console.log(result);
								resolve(result);
								// console.log(getReceipts(result));
								// getReceipts(result).then(function(receipt){
								//     console.log(receipt);
								//     swal({
								//         title: 'Details',
								//         type: 'success',
								//         html: '<b>Success!</b><br /><b>Transaction Hash</b>: ' + receipt.transactionHash + '<br /><b>Blockhash</b>:' + receipt.blockHash + '<br/><b>Gas Used<b>: ' + receipt.gasUsed
								//     })
								// }).catch(function(error){
								//     console.log(error);
								//     swal(
								//         'Oops...',
								//         error.toString(),
								//         'error'
								//     )
								// });
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
							title: 'Member removed Successfully',
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
	addMod = (event) => {
		event.preventDefault();
		swal({
			title: 'Are you want make this person a moderator?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			preConfirm: () => {
				return new Promise((resolve) => {
					this.state.instance.addMods.sendTransaction(
						this.state.addMod,
						'',
						{ from: this.props.web3.eth.accounts[0] },
						function(error, result) {
							if (error) {
								console.log('Error: ', error);
								swal('Oops...', error.toString(), 'error');
							} else {
								console.log(result);
								resolve(result);
								// console.log(getReceipts(result));
								// getReceipts(result).then(function(receipt){
								//     console.log(receipt);
								//     swal({
								//         title: 'Details',
								//         type: 'success',
								//         html: '<b>Success!</b><br /><b>Transaction Hash</b>: ' + receipt.transactionHash + '<br /><b>Blockhash</b>:' + receipt.blockHash + '<br/><b>Gas Used<b>: ' + receipt.gasUsed
								//     })
								// }).catch(function(error){
								//     console.log(error);
								//     swal(
								//         'Oops...',
								//         error.toString(),
								//         'error'
								//     )
								// });
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
							title: 'Moderator added Successfully',
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

	transactionHistory = () => {
		// for(var i=2;i<= this.props.web3.eth.blockNumber;i++){
		//     var details = web3.eth.getBlock(i)
		//     var d= i===web3.eth.blockNumber? "none":"inherit"
		//     $("ul.history").prepend('<li key={'+i+'}><div className="info transactionhistory"><div class="arrowHash" style="display:'+d+'"><i class="fa fa-arrow-up" aria-hidden="true"></i></div><div className="name">Block number: '+details.number+'<br/> Hash:'+details.hash+'<br/>Transaction Hash: '+ details.transactions[0]|| n +'</div></div></li>');
		//
		// }
		this.setState({
			transactionHistory: []
		});
		this.props.web3.eth.getBlockNumber((error, resultLen) => {
			if (!error) {
				const blockChainLen = resultLen;
				this.setState({
					blockChainLen
				});
				for (let i = 0; i <= blockChainLen; i++) {
					this.props.web3.eth.getBlock(i, (error, result) => {
						console.log(result);
						const newDetail = {
							transactionHash: result.transactions[0],
							blockNumber: result.number,
							blockHash: result.hash,
							parentHash: result.parentHash,
							gasUsed: result.gasUsed
						};
						this.setState({ transactionHistory: [ ...this.state.transactionHistory, newDetail ] });
					});
				}
			} else console.error(error);
		});
	};

	render() {
		if (this.state.fund !== null) {
			return (
				<div>
					<div className="tab">
						<ul className="tabs active">
							<li className="current">
								<a>Services</a>
							</li>
						</ul>

						<div className="tab_content">
							<div className="tabs_item farmerBank-request">
								<div className="fund" onClick={() => this.checkFund()}>
									₹{this.state.fund}
								</div>
								<div className="details" style={{ textAlign: 'center', marginBottom: '12px' }}>
									General Public Funds
								</div>

								<label className="service-label" htmlFor="panel_1">
									Request a Loan
								</label>
								<input type="checkbox" name="panel" id="panel_1" />
								<div className="collapsible loan">
									<form onSubmit={this.handleSubmit} action="">
										<div>
											<label htmlFor="load-desc">Loan Description</label>
											<input
												type="text"
												id="load-desc"
												value={this.state.loanDescription}
												onChange={(event) =>
													this.setState({ loanDescription: event.target.value })}
												required
											/>
										</div>
										<div>
											<label htmlFor="loan-amt">Loan Amount (₹)</label>
											<input
												type="number"
												id="loan-amt"
												value={this.state.amount}
												onChange={(event) => this.setState({ amount: event.target.value })}
												min="0"
											/>
										</div>
										<button className="btn btn-effect" type="submit">
											{this.state.buttonText}
										</button>
									</form>
								</div>
								<label className="service-label" htmlFor="panel_2">
									Add Members
								</label>
								<input type="checkbox" name="panel" id="panel_2" />
								<div className="collapsible">
									<form onSubmit={this.addMember} action="">
										<div>
											<label htmlFor="load-desc">Select from registered Member</label>
											<select
												id="type"
												value={this.state.addMember}
												onChange={(event) => this.setState({ addMember: event.target.value })}
											>
												<option value="0x627306090abab3a6e1400e9345bc60c78a8bef57">
													0x627306090abab3a6e1400e9345bc60c78a8bef57
												</option>
												<option value="0xf17f52151ebef6c7334fad080c5704d77216b732">
													0xf17f52151ebef6c7334fad080c5704d77216b732
												</option>
												<option value="0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef">
													0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
												</option>
												<option value="0x821aea9a577a9b44299b9c15c88cf3087f3b5544">
													0x821aea9a577a9b44299b9c15c88cf3087f3b5544
												</option>
												<option value="0x0d1d4e623d10f9fba5db95830f7d3839406c6af2">
													0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
												</option>
												<option value="0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e">
													0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
												</option>
												<option value="0x2191ef87e392377ec08e7c08eb105ef5448eced5">
													0x2191ef87e392377ec08e7c08eb105ef5448eced5
												</option>
												<option value="0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5">
													0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
												</option>
												<option value="0x6330a553fc93768f612722bb8c2ec78ac90b3bbc">
													0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
												</option>
												<option value="0x5aeda56215b167893e80b4fe645ba6d5bab767de">
													0x5aeda56215b167893e80b4fe645ba6d5bab767de
												</option>
											</select>
										</div>
										<button className="btn btn-effect" type="submit">
											Add
										</button>
									</form>
								</div>
								<label className="service-label" htmlFor="panel_3">
									Remove Members
								</label>
								<input type="checkbox" name="panel" id="panel_3" />
								<div className="collapsible">
									<form onSubmit={this.removeMember} action="">
										<div>
											<label htmlFor="load-desc">Select from registered Member</label>
											<select
												id="type"
												value={this.state.removeMember}
												onChange={(event) =>
													this.setState({ removeMember: event.target.value })}
											>
												<option value="0x627306090abab3a6e1400e9345bc60c78a8bef57">
													0x627306090abab3a6e1400e9345bc60c78a8bef57
												</option>
												<option value="0xf17f52151ebef6c7334fad080c5704d77216b732">
													0xf17f52151ebef6c7334fad080c5704d77216b732
												</option>
												<option value="0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef">
													0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
												</option>
												<option value="0x821aea9a577a9b44299b9c15c88cf3087f3b5544">
													0x821aea9a577a9b44299b9c15c88cf3087f3b5544
												</option>
												<option value="0x0d1d4e623d10f9fba5db95830f7d3839406c6af2">
													0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
												</option>
												<option value="0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e">
													0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
												</option>
												<option value="0x2191ef87e392377ec08e7c08eb105ef5448eced5">
													0x2191ef87e392377ec08e7c08eb105ef5448eced5
												</option>
												<option value="0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5">
													0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
												</option>
												<option value="0x6330a553fc93768f612722bb8c2ec78ac90b3bbc">
													0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
												</option>
												<option value="0x5aeda56215b167893e80b4fe645ba6d5bab767de">
													0x5aeda56215b167893e80b4fe645ba6d5bab767de
												</option>
											</select>
										</div>
										<button className="btn btn-effect" type="submit">
											Remove
										</button>
									</form>
								</div>
								<label className="service-label" htmlFor="panel_4">
									Add Funds or Pay Loans
								</label>
								<input type="checkbox" name="panel" id="panel_4" onClick={this.payToPool} />
								<label className="service-label" htmlFor="panel_5">
									Add Moderators
								</label>
								<input type="checkbox" name="panel" id="panel_5" />
								<div className="collapsible">
									<form onSubmit={this.addMod} action="">
										<div>
											<label htmlFor="load-desc">Select from registered Member</label>
											<select
												id="type"
												value={this.state.addMod}
												onChange={(event) => this.setState({ addMod: event.target.value })}
											>
												<option value="0x627306090abab3a6e1400e9345bc60c78a8bef57">
													0x627306090abab3a6e1400e9345bc60c78a8bef57
												</option>
												<option value="0xf17f52151ebef6c7334fad080c5704d77216b732">
													0xf17f52151ebef6c7334fad080c5704d77216b732
												</option>
												<option value="0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef">
													0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
												</option>
												<option value="0x821aea9a577a9b44299b9c15c88cf3087f3b5544">
													0x821aea9a577a9b44299b9c15c88cf3087f3b5544
												</option>
												<option value="0x0d1d4e623d10f9fba5db95830f7d3839406c6af2">
													0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
												</option>
												<option value="0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e">
													0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
												</option>
												<option value="0x2191ef87e392377ec08e7c08eb105ef5448eced5">
													0x2191ef87e392377ec08e7c08eb105ef5448eced5
												</option>
												<option value="0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5">
													0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
												</option>
												<option value="0x6330a553fc93768f612722bb8c2ec78ac90b3bbc">
													0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
												</option>
												<option value="0x5aeda56215b167893e80b4fe645ba6d5bab767de">
													0x5aeda56215b167893e80b4fe645ba6d5bab767de
												</option>
											</select>
										</div>
										<button className="btn btn-effect" type="submit">
											Add
										</button>
									</form>
								</div>
								<div className="products-list">
									<h2>List of All Blocks and Transactions</h2>
									<div
										id="info"
										className="details"
										style={{
											fontSize: '80px',
											fontWeight: 'bold',
											textAlign: 'center',
											marginBottom: '12px'
										}}
									>
										<span id="totalBlock">{this.state.blockChainLen}</span>
									</div>
									<div className="details" style={{ textAlign: 'center', marginBottom: '12px' }}>
										Total Blocks mined
									</div>
									<button
										className="btn btn-effect"
										style={{ width: '256px' }}
										onClick={() => this.transactionHistory()}
										type="button"
									>
										Update Blocks history
									</button>
									<ul className="history" style={{ marginTop: '10px' }}>
										{this.state.transactionHistory.length !== 0 ? this.state.transactionHistory[0]
											.blockNumber !== undefined ? (
											this.state.transactionHistory.slice(0).reverse().map((historyDetails) => {
												return (
													<Blockchain
														historyDetails={historyDetails}
														key={historyDetails.transactionHash}
														blocklen={this.state.blockChainLen}
													/>
												);
											})
										) : (
											''
										) : (
											'Fetching details ... '
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					{swal(
						'Oops...',
						'Enable Metamask Chrome Plugin and run truffle server for testing purpose',
						'error'
					)}
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
		user: state.user.user,
		money: state.user.money,
		transactions: state.transactions,
		loans: state.loans,
		admin: state.admin
	};
}

export default connect(mapStateToProps, { setLoanRequest, deleteLoanRequest, payLoanBack, payToPool, updateHeader })(
	FarmerBank
);
