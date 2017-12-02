let getEthValueofAccount = (web3,account) => new Promise((resolve, reject) => {
    console.log("web3",web3)
    console.log(typeof account)
    web3.eth.getBalance(account, (value)=>{
        if (value = null) {
            reject(value);
        } else {
            console.log(value)
            resolve(value);
        }
    } )
})

export default getEthValueofAccount