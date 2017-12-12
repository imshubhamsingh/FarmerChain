export const UPDATE_MONEY = 'update_money';
export const UPDATE_BLOCK_CHAIN = 'update_block_chain';

export function updateMoneyFromAccount(web3, account) {
	return (dispatch) => {
		web3.eth.getBalance(account, (error, result) => {
			if (!error)
				dispatch({
					type: UPDATE_MONEY,
					payload: {
						money: parseFloat(result.toNumber() / 1e16).toFixed(2)
					}
				});
			else console.error(error);
		});
	};
}

export function updateTotalTransaction(web3) {
	return (dispatch) => {
		web3.eth.getBlockNumber((error, resultlen) => {
			if (!error) {
				{
					const blockchainLen = resultlen;
					let transactionHistory = [];
					for (let i = 0; i <= blockchainLen; i++) {
						web3.eth.getBlock(i, (error, result) => {
							const newDetail = {
								transactionHash: result.transactions[0],
								blockNumber: result.number,
								blockHash: result.hash,
								parentHash: result.parentHash,
								gasUsed: result.gasUsed
							};
							transactionHistory.push(newDetail);
						});
					}
					dispatch({
						type: UPDATE_BLOCK_CHAIN,
						payload: {
							blockNumber: blockchainLen,
							blockdetails: transactionHistory
						}
					});
				}
			} else console.error(error);
		});
	};
}
