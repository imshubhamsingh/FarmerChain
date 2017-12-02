import { web3 } from './getWeb3'
let getEthValueofAccount = (account) =>{
    let moneyVal = 0;
    web3((web3)=>{
        return web3.eth.getBalance(account).then(money=>{
            console.log(money)
            moneyVal = money
        })
    })
    return moneyVal
}


export default getEthValueofAccount