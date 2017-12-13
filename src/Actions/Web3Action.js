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
