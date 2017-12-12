export const UPDATE_MONEY = 'update_money';
export const UPDATE_BLOCK_CHAIN_DETAILS = 'update_block_chain_details';
export const UPDATE_BLOCK_CHAIN_LENGTH = 'update_block_chain_length';

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
					dispatch({
						type: UPDATE_BLOCK_CHAIN_LENGTH,
						payload: {
							blockNumber: blockchainLen
						}
					});
				}
			} else console.error(error);
		});
	};
}

export async function updateTotalTransactionDetails(web3) {
	return (dispatch) => {
		web3.eth.getBlockNumber((error, resultlen) => {
			if (!error) {
				{
					const blockchainLen = resultlen;
					let transactionHistory = [];
					for (let i = 0; i <= blockchainLen; i++) {
						let details = getBLockDetails(web3, i);
						transactionHistory.push(details);
					}
					dispatch({
						type: UPDATE_BLOCK_CHAIN_DETAILS,
						payload: {
							blockdetails: transactionHistory
						}
					});
				}
			} else console.error(error);
		});
	};
}

async function getBLockDetails(web3, i) {
	return await web3.eth.getBlock(i, (error, result) => {
		const newDetail = {
			transactionHash: result.transactions[0],
			blockNumber: result.number,
			blockHash: result.hash,
			parentHash: result.parentHash,
			gasUsed: result.gasUsed
		};
		return newDetail;
	});
}
