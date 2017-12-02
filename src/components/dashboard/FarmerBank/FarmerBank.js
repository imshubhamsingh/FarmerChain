import React, { Component } from 'react';
import { connect } from 'react-redux'
import PastTransactions from './PastTransactions'
import GlobalLoanList from './GlobalLoanList'
import { transactionDetailsSorted } from '../../../helpers/userAndTransaction'
import {deleteLoanRequest, setLoanRequest, payLoanBack, payToPool} from '../../../Actions/FarmerBankAction'
import { colorStatus} from '../../../helpers/bankHelper'
import {extractUserDetails} from '../../../helpers/userAndTransaction'
import { updateHeader } from '../../../Actions/HeaderTextAction';
import swal from 'sweetalert2'
import uuid from 'uuid/v1'
import './farmerbank.css'
import contract from "truffle-contract"

import $ from 'jquery';
const jQuery = $;

class FarmerBank extends Component{
    state = {
        loanDescription:'',
        amount:0,
        buttonText: 'Request Loan',
        currentEtherbase: null,
        instance: null,
        fund: null
    }
    deployContract = () => {
        this.state.currentEtherbase = this.props.web3.eth.coinbase;
        let that  = this;
        // this.state.instance = new this.props.web3.eth.Contract([{'constant':true,'inputs':[],'name':'getBalance','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_memberaddress','type':'address'}],'name':'removeMembers','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[],'name':'addFundsorPayLoan','outputs':[],'payable':true,'stateMutability':'payable','type':'function'},{'constant':false,'inputs':[{'name':'loanAmount','type':'uint256'}],'name':'requestLoan','outputs':[{'name':'status','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'_memberaddress','type':'address'}],'name':'addMembers','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'_modAddress','type':'address'},{'name':'_modName','type':'string'}],'name':'addMods','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'getAmoundAdded','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'inputs':[],'payable':false,'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':false,'name':'whoAdded','type':'address'},{'indexed':false,'name':'howMuch','type':'uint256'}],'name':'addedFunds','type':'event'}]
        //     from: "0x627306090abab3a6e1400e9345bc60c78a8bef57",
        //     data: '0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408051908101604052806040805190810160405280600a81526020017f4661726d657242616e6b00000000000000000000000000000000000000000000815250815260200160011515815250600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610118929190610240565b5060208201518160010160006101000a81548160ff021916908315150217905550905050608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160010155606082015181600201559050503073ffffffffffffffffffffffffffffffffffffffff16316001819055506102e5565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061028157805160ff19168380011785556102af565b828001600101855582156102af579182015b828111156102ae578251825591602001919060010190610293565b5b5090506102bc91906102c0565b5090565b6102e291905b808211156102de5760008160009055506001016102c6565b5090565b90565b610bd6806102f46000396000f300606060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe0146100885780631ecdf415146100b1578063565920ec146100ea5780638d5d3429146100f4578063939f284c1461012f578063c5901ad514610168578063e257b380146101e4575b600080fd5b341561009357600080fd5b61009b61020d565b6040518082815260200191505060405180910390f35b34156100bc57600080fd5b6100e8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061022c565b005b6100f261030b565b005b34156100ff57600080fd5b610115600480803590602001909190505061067a565b604051808215151515815260200191505060405180910390f35b341561013a57600080fd5b610166600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a0565b005b341561017357600080fd5b6101e2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506109c5565b005b34156101ef57600080fd5b6101f7610abb565b6040518082815260200191505060405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561028e57600080fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549060ff021916905560018201600090556002820160009055505050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16151514151561036f57600080fd5b6001543073ffffffffffffffffffffffffffffffffffffffff163103905080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541180156104b35750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015411155b156105ee57600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825403925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff0219169083151502179055505b7f5d2f03e1647f613bfec3809fe5f625d948b01ca7bdb497439ca3e6ac15e959243382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a13073ffffffffffffffffffffffffffffffffffffffff163160018190555050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1615151415156106de57600080fd5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff16801561077f5750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546002028211155b80156107ae575060023073ffffffffffffffffffffffffffffffffffffffff16318115156107a957fe5b048211155b156108965760001515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a9050505081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151561088d57600080fd5b6001905061089b565b600080fd5b919050565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561090257600080fd5b608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff021916908315150217905550604082015181600101556060820151816002015590505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a2057600080fd5b604080519081016040528082815260200160011515815250600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610a93929190610b05565b5060208201518160010160006101000a81548160ff0219169083151502179055509050505050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b4657805160ff1916838001178555610b74565b82800160010185558215610b74579182015b82811115610b73578251825591602001919060010190610b58565b5b509050610b819190610b85565b5090565b610ba791905b80821115610ba3576000816000905550600101610b8b565b5090565b905600a165627a7a7230582042bf8b2b7e2ca0c883fc462c8af8b5bc73cc5ae868ff7cecec0e93fa5296849b0029',
        //     gas: '4700000'
        // }, function (e, contract){
        //     console.log(e, contract);
        //     if (typeof contract.address !== 'undefined') {
        //         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        //     }
        // });
        //
        // console.log(this.state.instance.methods.getBalance().call());
        // //this.state.instance = new contractred(
        //  //   );
        var contract = new this.props.web3.eth.Contract([{
            "constant": true,
            "inputs": [],
            "name": "getBalance",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_memberaddress", "type": "address"}],
            "name": "removeMembers",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "addFundsorPayLoan",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "loanAmount", "type": "uint256"}],
            "name": "requestLoan",
            "outputs": [{"name": "status", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_memberaddress", "type": "address"}],
            "name": "addMembers",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_modAddress", "type": "address"}, {"name": "_modName", "type": "string"}],
            "name": "addMods",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "getAmoundAdded",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": false, "name": "whoAdded", "type": "address"}, {
                "indexed": false,
                "name": "howMuch",
                "type": "uint256"
            }],
            "name": "addedFunds",
            "type": "event"
        }]);

        contract.deploy({
            data: '0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408051908101604052806040805190810160405280600a81526020017f4661726d657242616e6b00000000000000000000000000000000000000000000815250815260200160011515815250600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610118929190610240565b5060208201518160010160006101000a81548160ff021916908315150217905550905050608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160010155606082015181600201559050503073ffffffffffffffffffffffffffffffffffffffff16316001819055506102e5565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061028157805160ff19168380011785556102af565b828001600101855582156102af579182015b828111156102ae578251825591602001919060010190610293565b5b5090506102bc91906102c0565b5090565b6102e291905b808211156102de5760008160009055506001016102c6565b5090565b90565b610bd6806102f46000396000f300606060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe0146100885780631ecdf415146100b1578063565920ec146100ea5780638d5d3429146100f4578063939f284c1461012f578063c5901ad514610168578063e257b380146101e4575b600080fd5b341561009357600080fd5b61009b61020d565b6040518082815260200191505060405180910390f35b34156100bc57600080fd5b6100e8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061022c565b005b6100f261030b565b005b34156100ff57600080fd5b610115600480803590602001909190505061067a565b604051808215151515815260200191505060405180910390f35b341561013a57600080fd5b610166600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a0565b005b341561017357600080fd5b6101e2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506109c5565b005b34156101ef57600080fd5b6101f7610abb565b6040518082815260200191505060405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561028e57600080fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549060ff021916905560018201600090556002820160009055505050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16151514151561036f57600080fd5b6001543073ffffffffffffffffffffffffffffffffffffffff163103905080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541180156104b35750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015411155b156105ee57600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825403925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff0219169083151502179055505b7f5d2f03e1647f613bfec3809fe5f625d948b01ca7bdb497439ca3e6ac15e959243382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a13073ffffffffffffffffffffffffffffffffffffffff163160018190555050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1615151415156106de57600080fd5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff16801561077f5750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546002028211155b80156107ae575060023073ffffffffffffffffffffffffffffffffffffffff16318115156107a957fe5b048211155b156108965760001515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a9050505081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151561088d57600080fd5b6001905061089b565b600080fd5b919050565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561090257600080fd5b608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff021916908315150217905550604082015181600101556060820151816002015590505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a2057600080fd5b604080519081016040528082815260200160011515815250600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610a93929190610b05565b5060208201518160010160006101000a81548160ff0219169083151502179055509050505050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b4657805160ff1916838001178555610b74565b82800160010185558215610b74579182015b82811115610b73578251825591602001919060010190610b58565b5b509050610b819190610b85565b5090565b610ba791905b80821115610ba3576000816000905550600101610b8b565b5090565b905600a165627a7a7230582042bf8b2b7e2ca0c883fc462c8af8b5bc73cc5ae868ff7cecec0e93fa5296849b0029'
        }).send({
            from: "0x627306090abab3a6e1400e9345bc60c78a8bef57",
            data: '0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408051908101604052806040805190810160405280600a81526020017f4661726d657242616e6b00000000000000000000000000000000000000000000815250815260200160011515815250600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610118929190610240565b5060208201518160010160006101000a81548160ff021916908315150217905550905050608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160010155606082015181600201559050503073ffffffffffffffffffffffffffffffffffffffff16316001819055506102e5565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061028157805160ff19168380011785556102af565b828001600101855582156102af579182015b828111156102ae578251825591602001919060010190610293565b5b5090506102bc91906102c0565b5090565b6102e291905b808211156102de5760008160009055506001016102c6565b5090565b90565b610bd6806102f46000396000f300606060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe0146100885780631ecdf415146100b1578063565920ec146100ea5780638d5d3429146100f4578063939f284c1461012f578063c5901ad514610168578063e257b380146101e4575b600080fd5b341561009357600080fd5b61009b61020d565b6040518082815260200191505060405180910390f35b34156100bc57600080fd5b6100e8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061022c565b005b6100f261030b565b005b34156100ff57600080fd5b610115600480803590602001909190505061067a565b604051808215151515815260200191505060405180910390f35b341561013a57600080fd5b610166600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a0565b005b341561017357600080fd5b6101e2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506109c5565b005b34156101ef57600080fd5b6101f7610abb565b6040518082815260200191505060405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561028e57600080fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549060ff021916905560018201600090556002820160009055505050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16151514151561036f57600080fd5b6001543073ffffffffffffffffffffffffffffffffffffffff163103905080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541180156104b35750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015411155b156105ee57600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825403925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff0219169083151502179055505b7f5d2f03e1647f613bfec3809fe5f625d948b01ca7bdb497439ca3e6ac15e959243382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a13073ffffffffffffffffffffffffffffffffffffffff163160018190555050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1615151415156106de57600080fd5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff16801561077f5750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546002028211155b80156107ae575060023073ffffffffffffffffffffffffffffffffffffffff16318115156107a957fe5b048211155b156108965760001515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a9050505081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151561088d57600080fd5b6001905061089b565b600080fd5b919050565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561090257600080fd5b608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff021916908315150217905550604082015181600101556060820151816002015590505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a2057600080fd5b604080519081016040528082815260200160011515815250600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610a93929190610b05565b5060208201518160010160006101000a81548160ff0219169083151502179055509050505050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b4657805160ff1916838001178555610b74565b82800160010185558215610b74579182015b82811115610b73578251825591602001919060010190610b58565b5b509050610b819190610b85565b5090565b610ba791905b80821115610ba3576000816000905550600101610b8b565b5090565b905600a165627a7a7230582042bf8b2b7e2ca0c883fc462c8af8b5bc73cc5ae868ff7cecec0e93fa5296849b0029',
            gas: '4700000'
        }).then(function (instance) {
            console.log("instance",instance);
            instance.methods.getBalance().call({from: "0x627306090abab3a6e1400e9345bc60c78a8bef57"}).then(result=>{
                console.log("fund", result)
                that.setState({
                    fund:result
                });
            })
        })
    }

    componentDidMount(){
        this.props.updateHeader('Farmers Bank');
        console.log(this.props.web3)
        this.deployContract()
        $(document).ready(function() {

            (function ($) {
                $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

                $('.tab ul.tabs li a').click(function (g) {
                    var tab = $(this).closest('.tab'),
                        index = $(this).closest('li').index();

                    tab.find('ul.tabs > li').removeClass('current');
                    $(this).closest('li').addClass('current');

                    tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                    tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

                    g.preventDefault();
                } );
            })(jQuery);

        });
    }


    checkIfLoanPaid = () => {
        let flag = false;
        this.props.loans!==null?this.props.loans.map((loan)=> {
            if (loan.uid === this.props.user.uid) {
                if (loan.status === "granted") {
                    flag = true;
                }
            }
            return null
        }):'';
        return flag
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        if(this.checkIfLoanPaid()){
            swal(
                'Oops...',
                'Please Pay your previous loan in order to request new loan',
                'error'
            )
        }else{

            this.setState({
                buttonText: 'Request In Order'
            })


            this.props.setLoanRequest({
                loanDescription:this.state.loanDescription,
                amount: this.state.amount,
                createdAt: Date.now()
            }).then(()=>{
                this.setState({
                    buttonText: 'Request has been noted'
                })

                setTimeout(()=>{
                    this.setState({
                        loanDescription:'',
                        amount:0,
                        buttonText: 'Request Loan'
                    })
                },2000)
            })
        }

    }

    showPastTransactions = () => {
        return (transactionDetailsSorted(this.props.transactions, this.props.user.uid, "loan"))
    }

    payLoanBack = (loan)=>{
        this.props.payLoanBack(loan,extractUserDetails(this.props.admin), extractUserDetails(this.props.user))
    }

    payToPool = ()=>{
        swal({
            title: 'Enter amount to add to pool (₹)',
            input: 'number',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (number) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log(number)
                        if (number > this.props.money) {
                            swal.showValidationError(
                                'Amount entered is more than your current balance'
                            )
                        }
                        resolve()
                    }, 2000)
                })
            },
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                let value = result.value;
                if(value){
                    if((value!=="" || !isNaN(value)|| value !== null)){
                        const loan = {
                            amount: value,
                            createdAt: Date.now(),
                            email: this.props.user.email,
                            loanDescription: "Paying to Pool",
                            id: uuid(),
                            status: "paid",
                            uid: this.props.user.uid
                        }
                        this.props.payToPool(loan,extractUserDetails(this.props.admin), extractUserDetails(this.props.user))
                        swal({
                            type: 'success',
                            title: 'Your money added to Pool'
                        })
                    }else{
                        swal(
                            'Oops...',
                            'Something went wrong!',
                            'error'
                        )
                    }

                }

            }
        })
    }

    render(){
        return(
            <div>
                <div className="tab">

                    <ul className="tabs">
                        <li><a>Services</a></li>
                        <li><a>Transaction History</a></li>
                    </ul>

                    <div className="tab_content">

                        <div className="tabs_item farmerBank-request">

                            <div className="fund">
                                ₹{this.props.admin.poolMoney}
                            </div>
                            <div className="details" style={{textAlign:'center',marginBottom: '12px'}}>
                                General Public Funds
                            </div>

                            <label className="service-label" htmlFor="panel_1">Request a Loan</label>
                            <input type="checkbox" name="panel" id="panel_1" />
                                <div className="collapsible loan">
                                    <form onSubmit={this.handleSubmit} action="">
                                        <div>
                                            <label htmlFor="load-desc">Loan Description</label>
                                            <input type="text" id="load-desc" value={this.state.loanDescription} onChange={event=> this.setState({loanDescription:event.target.value})} required/>
                                        </div>
                                        <div>
                                            <label htmlFor="loan-amt">Loan Amount (₹)</label>
                                            <input type="number" id="loan-amt" value={this.state.amount} onChange={event=> this.setState({amount:event.target.value})} min="0" />
                                        </div>
                                        <button className="btn btn-effect" type="submit" >{this.state.buttonText}</button>
                                    </form>
                                </div>
                            <label className="service-label" htmlFor="panel_2">Add Members</label>
                            <input type="checkbox" name="panel" id="panel_2" />
                                    <div className="collapsible">
                                        <form onSubmit={this.handleSubmit} action="">
                                            <div>
                                                <label htmlFor="load-desc">Select from registered Member</label>
                                                <select id="type" value={this.state.quantity} onChange={event=> this.setState({quantity:event.target.value})}>
                                                    <option value="0x627306090abab3a6e1400e9345bc60c78a8bef57">0x627306090abab3a6e1400e9345bc60c78a8bef57</option>
                                                    <option value="0xf17f52151ebef6c7334fad080c5704d77216b732">0xf17f52151ebef6c7334fad080c5704d77216b732</option>
                                                    <option value="0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef">0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef</option>
                                                    <option value="0x821aea9a577a9b44299b9c15c88cf3087f3b5544">0x821aea9a577a9b44299b9c15c88cf3087f3b5544</option>
                                                    <option value="0x0d1d4e623d10f9fba5db95830f7d3839406c6af2">0x0d1d4e623d10f9fba5db95830f7d3839406c6af2</option>
                                                    <option value="0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e">0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e</option>
                                                    <option value="0x2191ef87e392377ec08e7c08eb105ef5448eced5">0x2191ef87e392377ec08e7c08eb105ef5448eced5</option>
                                                    <option value="0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5">0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5</option>
                                                    <option value="0x6330a553fc93768f612722bb8c2ec78ac90b3bbc">0x6330a553fc93768f612722bb8c2ec78ac90b3bbc</option>
                                                    <option value="0x5aeda56215b167893e80b4fe645ba6d5bab767de">0x5aeda56215b167893e80b4fe645ba6d5bab767de</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-effect" type="submit" >Add</button>
                                        </form>
                                    </div>
                            <label className="service-label" htmlFor="panel_3">Remove Members</label>
                            <input type="checkbox" name="panel" id="panel_3" />
                                        <div className="collapsible">
                                            <form onSubmit={this.handleSubmit} action="">
                                                <div>
                                                    <label htmlFor="load-desc">Select from registered Member</label>
                                                    <select id="type" value={this.state.quantity} onChange={event=> this.setState({quantity:event.target.value})}>
                                                        <option value="0x627306090abab3a6e1400e9345bc60c78a8bef57">0x627306090abab3a6e1400e9345bc60c78a8bef57</option>
                                                        <option value="0xf17f52151ebef6c7334fad080c5704d77216b732">0xf17f52151ebef6c7334fad080c5704d77216b732</option>
                                                        <option value="0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef">0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef</option>
                                                        <option value="0x821aea9a577a9b44299b9c15c88cf3087f3b5544">0x821aea9a577a9b44299b9c15c88cf3087f3b5544</option>
                                                        <option value="0x0d1d4e623d10f9fba5db95830f7d3839406c6af2">0x0d1d4e623d10f9fba5db95830f7d3839406c6af2</option>
                                                        <option value="0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e">0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e</option>
                                                        <option value="0x2191ef87e392377ec08e7c08eb105ef5448eced5">0x2191ef87e392377ec08e7c08eb105ef5448eced5</option>
                                                        <option value="0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5">0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5</option>
                                                        <option value="0x6330a553fc93768f612722bb8c2ec78ac90b3bbc">0x6330a553fc93768f612722bb8c2ec78ac90b3bbc</option>
                                                        <option value="0x5aeda56215b167893e80b4fe645ba6d5bab767de">0x5aeda56215b167893e80b4fe645ba6d5bab767de</option>
                                                    </select>
                                                </div>
                                                <button className="btn btn-effect" type="submit" >Remove</button>
                                            </form>
                                        </div>
                            <label className="service-label" htmlFor="panel_4">Add Funds or Pay Loans</label>
                            <input type="checkbox" name="panel" id="panel_4" />
                                       <div className="collapsible loan-pay">
                                           <div>
                                               <div className="details" style={{textAlign:'center'}}>
                                                   General Public Funds
                                               </div>
                                               <button className="btn-pool btn-effect" type="submit" onClick={this.payToPool} disabled={this.checkIfLoanPaid()}>{this.checkIfLoanPaid()?'Pay your loan to add to pool': 'Add to Pool'}</button>
                                           </div>
                                           <h3>Your Loan Status</h3>
                                           <ul>
                                               {this.props.loans!==null?this.props.loans.map((loan)=> {
                                                   if(loan.uid === this.props.user.uid){
                                                       return <li key={loan.id}>
                                                           <div className="info">
                                                               <div className="name">{loan.loanDescription}
                                                                   <div className="type">
                                                                       ₹{loan.amount}
                                                                   </div>
                                                               </div>
                                                           </div>
                                                           <button className="btn-pool btn-effect" onClick={()=> (loan.status==="waiting" ||loan.status==="paid" || loan.status==="rejected")?this.props.deleteLoanRequest(loan):this.payLoanBack(loan)} style={{backgroundColor: colorStatus(loan.status,"red","green","orange")}}>{colorStatus(loan.status,"Rejected (Cancel Request)","Granted (Pay Loan Now)","Waiting (Cancel Request)","Paid (Remove loan)")}</button>
                                                       </li>
                                                   }
                                                   return '';
                                               }):''}
                                           </ul>
                                       </div>
                            <label className="service-label" htmlFor="panel_5">Add Moderators</label>
                            <input type="checkbox" name="panel" id="panel_5" />
                                        <div className="collapsible">
                                            <form onSubmit={this.handleSubmit} action="">
                                                <div>
                                                    <label htmlFor="load-desc">Select from registered Member</label>
                                                    <select id="type" value={this.state.quantity} onChange={event=> this.setState({quantity:event.target.value})}>
                                                        <option value="0x627306090abab3a6e1400e9345bc60c78a8bef57">0x627306090abab3a6e1400e9345bc60c78a8bef57</option>
                                                        <option value="0xf17f52151ebef6c7334fad080c5704d77216b732">0xf17f52151ebef6c7334fad080c5704d77216b732</option>
                                                        <option value="0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef">0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef</option>
                                                        <option value="0x821aea9a577a9b44299b9c15c88cf3087f3b5544">0x821aea9a577a9b44299b9c15c88cf3087f3b5544</option>
                                                        <option value="0x0d1d4e623d10f9fba5db95830f7d3839406c6af2">0x0d1d4e623d10f9fba5db95830f7d3839406c6af2</option>
                                                        <option value="0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e">0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e</option>
                                                        <option value="0x2191ef87e392377ec08e7c08eb105ef5448eced5">0x2191ef87e392377ec08e7c08eb105ef5448eced5</option>
                                                        <option value="0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5">0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5</option>
                                                        <option value="0x6330a553fc93768f612722bb8c2ec78ac90b3bbc">0x6330a553fc93768f612722bb8c2ec78ac90b3bbc</option>
                                                        <option value="0x5aeda56215b167893e80b4fe645ba6d5bab767de">0x5aeda56215b167893e80b4fe645ba6d5bab767de</option>
                                                    </select>
                                                </div>
                                                <button className="btn btn-effect" type="submit" >Add</button>
                                            </form>
                                        </div>
                        </div>

                        {/*<div className="tabs_item pool-list">*/}
                            {/*<ul>*/}
                                {/*<li>*/}
                                    {/*<div className="fund">*/}
                                        {/*₹{this.props.admin.poolMoney}*/}
                                    {/*</div>*/}
                                    {/*<div className="details" style={{textAlign:'center'}}>*/}
                                        {/*General Public Funds*/}
                                    {/*</div>*/}
                                    {/*<button className="btn-pool btn-effect" type="submit" onClick={this.payToPool} disabled={this.checkIfLoanPaid()}>{this.checkIfLoanPaid()?'Pay your loan to add to pool': 'Add'}</button>*/}
                                {/*</li>*/}
                            {/*<div>*/}
                                {/*<h2>*/}
                                    {/*Requested Loan*/}
                                {/*</h2>*/}
                            {/*</div>*/}
                                {/*{*/}
                                    {/*this.props.loans.map((loan)=> <GlobalLoanList loan={loan} user={this.props.user} key={loan.id} />)*/}
                                {/*}*/}
                            {/*</ul>*/}
                        {/*</div>*/}
                        <div className="tabs_item pool-list">
                            <div className="products-list">
                                <h2>List of All transaction</h2>
                                <ul>
                                    {this.showPastTransactions().sort((a,b)=>{
                                        return new Date(b.createdAt) - new Date(a.createdAt)
                                    }).map(transaction => {
                                        return <PastTransactions transaction={transaction} key={transaction.id}/>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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


export default connect(mapStateToProps,{ setLoanRequest ,deleteLoanRequest, payLoanBack, payToPool, updateHeader})(FarmerBank);
