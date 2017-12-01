let getAccounts = web3 => new Promise((resolve, reject) => {
    web3.eth.getAccounts((e, accounts) => {
        if (e != null) {
            reject(e);
        } else {
            resolve(accounts);
        }
    })
})

export default getAccounts