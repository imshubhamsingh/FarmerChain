var abidef = '[{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_memberaddress","type":"address"}],"name":"removeMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"addFundsorPayLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"loanAmount","type":"uint256"}],"name":"requestLoan","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_memberaddress","type":"address"}],"name":"addMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_modAddress","type":"address"},{"name":"_modName","type":"string"}],"name":"addMods","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAmoundAdded","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"whoAdded","type":"address"},{"indexed":false,"name":"howMuch","type":"uint256"}],"name":"addedFunds","type":"event"}]';
var contractAddress = '0x51fc52fd0b30fa0319d97893defe0201fed39c4c';


// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider);
// } else {
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
// }

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
}

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
      alert('Unlock Metamask');
      console.log("Connected!");
      deployContract();
  } else {
      alert('Install and Unlock Metamask');
      console.log("Disconnected!");
    }
  });


function printcoinbase(){
  console.log("coinbase: ", currentEtherbase);
  $("#currentAccount").text = toString(currentEtherbase);
}

function deployContract(){
  window.currentEtherbase = web3.eth.coinbase;
  var abidefinition = JSON.parse(abidef);
  contract = web3.eth.contract(abidefinition);
  instance = contract.at(contractAddress);

  console.log(instance);
  console.log(instance.address);

  // var con = web3.eth.contract([{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_memberaddress","type":"address"}],"name":"removeMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"addFundsorPayLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"loanAmount","type":"uint256"}],"name":"requestLoan","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_memberaddress","type":"address"}],"name":"addMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_modAddress","type":"address"},{"name":"_modName","type":"string"}],"name":"addMods","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAmoundAdded","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"whoAdded","type":"address"},{"indexed":false,"name":"howMuch","type":"uint256"}],"name":"addedFunds","type":"event"}]);
    // var inst = con.new(
    //     {
    //       from: web3.eth.accounts[0],
    //       data: '0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408051908101604052806040805190810160405280600a81526020017f4661726d657242616e6b00000000000000000000000000000000000000000000815250815260200160011515815250600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610118929190610240565b5060208201518160010160006101000a81548160ff021916908315150217905550905050608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160010155606082015181600201559050503073ffffffffffffffffffffffffffffffffffffffff16316001819055506102e5565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061028157805160ff19168380011785556102af565b828001600101855582156102af579182015b828111156102ae578251825591602001919060010190610293565b5b5090506102bc91906102c0565b5090565b6102e291905b808211156102de5760008160009055506001016102c6565b5090565b90565b610bcf806102f46000396000f300606060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe0146100885780631ecdf415146100b1578063565920ec146100ea5780638d5d3429146100f4578063939f284c1461012f578063c5901ad514610168578063e257b380146101e4575b600080fd5b341561009357600080fd5b61009b61020d565b6040518082815260200191505060405180910390f35b34156100bc57600080fd5b6100e8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061022c565b005b6100f261030b565b005b34156100ff57600080fd5b610115600480803590602001909190505061067a565b604051808215151515815260200191505060405180910390f35b341561013a57600080fd5b610166600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a0565b005b341561017357600080fd5b6101e2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506109be565b005b34156101ef57600080fd5b6101f7610ab4565b6040518082815260200191505060405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561028e57600080fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549060ff021916905560018201600090556002820160009055505050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16151514151561036f57600080fd5b6001543073ffffffffffffffffffffffffffffffffffffffff163103905080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541180156104b35750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015411155b156105ee57600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825403925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff0219169083151502179055505b7f5d2f03e1647f613bfec3809fe5f625d948b01ca7bdb497439ca3e6ac15e959243382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a13073ffffffffffffffffffffffffffffffffffffffff163160018190555050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1615151415156106de57600080fd5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff16801561077f5750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546002028211155b80156107ae575060023073ffffffffffffffffffffffffffffffffffffffff16318115156107a957fe5b048211155b156108965760001515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a9050505081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151561088d57600080fd5b6001905061089b565b600090505b919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108fb57600080fd5b608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff021916908315150217905550604082015181600101556060820151816002015590505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a1957600080fd5b604080519081016040528082815260200160011515815250600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610a8c929190610afe565b5060208201518160010160006101000a81548160ff0219169083151502179055509050505050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b3f57805160ff1916838001178555610b6d565b82800160010185558215610b6d579182015b82811115610b6c578251825591602001919060010190610b51565b5b509050610b7a9190610b7e565b5090565b610ba091905b80821115610b9c576000816000905550600101610b84565b5090565b905600a165627a7a7230582096ebdf216c0b7e0517447cc7e289e90fd974b3a834d6a682ef46b4ca51facff90029',
    //       gas: '4700000'
    //     }, function (e, contract){
    //     console.log(e, contract);
    //     if (typeof contract.address !== 'undefined') {
    //           console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    //     }
    //   });
  }

function updateBalance(){
  x = web3.fromWei(instance.getBalance(), "ether").toNumber();
  document.getElementById("contractBalance").innerHTML = x;
  console.log(x);
}

function load20(){
  txHash = instance.addFundsorPayLoan({value: ""})
}

function restofprogram(){
  console.log("possibly? : ", inst);
  console.log('instance address', instance.address);
  console.log("Balance", web3.fromWei(instance.getBalance(), "ether").toNumber());
}

function removeMembers(){
  var address = $(removeMemberAddress).val();
  console.log(address);
  instance.removeMembers.sendTransaction(address, {from: currentEtherbase}, function(error, result){
    if(error){
      console.log("Error: ", error);
    }else{
      console.log(result);
      // console.log(getReceipts(result));
      getReceipts(result).then(function(receipt){
        console.log(receipt);
        document.getElementById("receipt").classList.remove("hidden");
        document.getElementById("receipt").innerHTML = "<b>Success!</b><br /><b>Transaction Hash</b>: " + receipt.transactionHash + "<br /><b>Blockhash</b>:" + receipt.blockHash + "<br/><b>Gas Used<b>: " + receipt.gasUsed;
        setTimeout(function(){
          document.getElementById("receipt").classList.add("hidden");
        }, 5000);
      }).catch(function(error){
        console.log(error);
      });
    }
  })
}

function addMods(){
  var address = $(addModAddress).val();
  console.log(address);
  instance.addMods.sendTransaction(address, "bob", {from: currentEtherbase}, function(error, result){
    if(error){
      console.log("Error: ", error);
    }else{
      console.log(result);
      // console.log(getReceipts(result));
      getReceipts(result).then(function(receipt){
        console.log(receipt);
        document.getElementById("receipt").classList.remove("hidden");
        document.getElementById("receipt").innerHTML = "<b>Success!</b><br /><b>Transaction Hash</b>: " + receipt.transactionHash + "<br /><b>Blockhash</b>:" + receipt.blockHash + "<br/><b>Gas Used<b>: " + receipt.gasUsed;
        setTimeout(function(){
          document.getElementById("receipt").classList.add("hidden");
        }, 5000);
      }).catch(function(error){
        console.log(error);
      });
    }
  })
}


function addMembers(){
  var address = $(addMemberAddress).val();
  console.log(address);
  instance.addMembers.sendTransaction(address, {from: currentEtherbase}, function(error, result){
    if(error){
      console.log("Error: ", error);
    }else{
      console.log(result);
      // console.log(getReceipts(result));
      getReceipts(result).then(function(receipt){
        console.log(receipt);
        document.getElementById("receipt").classList.remove("hidden");
        document.getElementById("receipt").innerHTML = "<b>Success!</b><br /><b>Transaction Hash</b>: " + receipt.transactionHash + "<br /><b>Blockhash</b>:" + receipt.blockHash + "<br/><b>Gas Used<b>: " + receipt.gasUsed;
        setTimeout(function(){
          document.getElementById("receipt").classList.add("hidden");
        }, 5000);
      }).catch(function(error){
        console.log(error);
      });
    }
  })
}


function payLoan(){
  var address = $(payLoan).val();
  console.log(address);
  instance.addFundsorPayLoan.sendTransaction({from: currentEtherbase, value: address}, function(error, result){
    if(error){
      console.log("Error: ", error);
    }else{
      console.log(result);
      // console.log(getReceipts(result));
      getReceipts(result).then(function(receipt){
        console.log(receipt);
        document.getElementById("receipt").classList.remove("hidden");
        document.getElementById("receipt").innerHTML = "<b>Success!</b><br /><b>Transaction Hash</b>: " + receipt.transactionHash + "<br /><b>Blockhash</b>:" + receipt.blockHash + "<br/><b>Gas Used<b>: " + receipt.gasUsed;
        setTimeout(function(){
          document.getElementById("receipt").classList.add("hidden");
        }, 5000);
      }).catch(function(error){
        console.log(error);
      });
    }
  });
}


async function getReceipts(hash){
  var receipt = web3.eth.getTransactionReceipt(hash);
  return receipt;
}

