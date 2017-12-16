export function getBlockDetails(web3, i) {
	return new Promise((resolve, reject) => {
		web3.eth.getBlock(i, (error, result) => {
			const newDetail = {
				transactionHash: result.transactions,
				blockNumber: result.number,
				blockHash: result.hash,
				parentHash: result.parentHash,
				gasUsed: result.gasUsed
			};
			resolve(newDetail);
		});
	});
}
