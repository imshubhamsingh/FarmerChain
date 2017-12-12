import Web3 from 'web3';

let getWeb3 = new Promise(function(resolve, reject) {
	// Wait for loading completion to avoid race conditions with web3 injection timing.
	window.addEventListener('load', function() {
		let results;
		let provider = new Web3.providers.HttpProvider('http://localhost:9545');
		let web3 = new Web3(provider);

		results = {
			web3: web3,
			filter: web3.eth.filter('latest')
		};

		console.log('Using Local web3.');
		console.log('Connected!');
		resolve(results);
		//}
	});
});

export default getWeb3;

export function web3(fn) {
	return getWeb3
		.then((results) => {
			const web3 = results.web3;
			return fn(web3);
		})
		.catch(() => {
			console.log('Error finding web3.');
		});
}
