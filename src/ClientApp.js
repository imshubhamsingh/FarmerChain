import React, { Component } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Bottombar from './components/bottombar/Bottombar'
import { withRouter } from 'react-router-dom'

import './App.css';

import {connect} from 'react-redux'
import { getUser } from './Actions/UserActions';
import {getUpdateProductList} from './Actions/CartFarmAction'
import {getUpdatePoolList} from './Actions/PoolFarmAction'
import { getUpdateTransactiontList} from './Actions/TransactionAction'
import { getUpdateLoanList} from './Actions/FarmerBankAction'
import { getAdminMoney } from './Actions/PoolActions'
import { updateWeb3 } from './Actions/Web3Action'

import getWeb3 from './utils/getWeb3'
import {deployContract}from './utils/deployContract'



class ClientApp extends Component{
    state = {
        web3: null,
        sidebar: false,
        instance: null
    }

    async loadWeb3(getWeb3) {
         const result = await getWeb3
        this.setState({ web3: result.web3 })
    }

    async loadContractInstance(web3) {
        const instance = await deployContract(web3)
        this.setState({ instance })
    }
    componentWillMount(){
        // getWeb3.then(result=>{
        //     console.log("result", result)
        //     window.eth = result.web3.eth;
        //     let myContract = new result.web3.eth.Contract([
        //         [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_memberaddress","type":"address"}],"name":"removeMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"addFundsorPayLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"loanAmount","type":"uint256"}],"name":"requestLoan","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_memberaddress","type":"address"}],"name":"addMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_modAddress","type":"address"},{"name":"_modName","type":"string"}],"name":"addMods","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAmoundAdded","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"whoAdded","type":"address"},{"indexed":false,"name":"howMuch","type":"uint256"}],"name":"addedFunds","type":"event"}]
        //     ] , '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
        //         from: '0x627306090abab3a6e1400e9345bc60c78a8bef57', // default from address
        //         gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        //     });
        //     console.log(myContract)
        //     myContract
        //         .deploy({
        //             data: '6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408051908101604052806040805190810160405280600a81526020017f4661726d657242616e6b00000000000000000000000000000000000000000000815250815260200160011515815250600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610118929190610240565b5060208201518160010160006101000a81548160ff021916908315150217905550905050608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160010155606082015181600201559050503073ffffffffffffffffffffffffffffffffffffffff16316001819055506102e5565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061028157805160ff19168380011785556102af565b828001600101855582156102af579182015b828111156102ae578251825591602001919060010190610293565b5b5090506102bc91906102c0565b5090565b6102e291905b808211156102de5760008160009055506001016102c6565b5090565b90565b610bd6806102f46000396000f300606060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe0146100885780631ecdf415146100b1578063565920ec146100ea5780638d5d3429146100f4578063939f284c1461012f578063c5901ad514610168578063e257b380146101e4575b600080fd5b341561009357600080fd5b61009b61020d565b6040518082815260200191505060405180910390f35b34156100bc57600080fd5b6100e8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061022c565b005b6100f261030b565b005b34156100ff57600080fd5b610115600480803590602001909190505061067a565b604051808215151515815260200191505060405180910390f35b341561013a57600080fd5b610166600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a0565b005b341561017357600080fd5b6101e2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506109c5565b005b34156101ef57600080fd5b6101f7610abb565b6040518082815260200191505060405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561028e57600080fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549060ff021916905560018201600090556002820160009055505050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16151514151561036f57600080fd5b6001543073ffffffffffffffffffffffffffffffffffffffff163103905080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541180156104b35750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015411155b156105ee57600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825403925050819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff0219169083151502179055505b7f5d2f03e1647f613bfec3809fe5f625d948b01ca7bdb497439ca3e6ac15e959243382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a13073ffffffffffffffffffffffffffffffffffffffff163160018190555050565b600060011515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1615151415156106de57600080fd5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff16801561077f5750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546002028211155b80156107ae575060023073ffffffffffffffffffffffffffffffffffffffff16318115156107a957fe5b048211155b156108965760001515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a9050505081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151561088d57600080fd5b6001905061089b565b600080fd5b919050565b60011515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561090257600080fd5b608060405190810160405280600115158152602001600115158152602001600081526020016000815250600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff021916908315150217905550604082015181600101556060820151816002015590505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a2057600080fd5b604080519081016040528082815260200160011515815250600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610a93929190610b05565b5060208201518160010160006101000a81548160ff0219169083151502179055509050505050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b4657805160ff1916838001178555610b74565b82800160010185558215610b74579182015b82811115610b73578251825591602001919060010190610b58565b5b509050610b819190610b85565b5090565b610ba791905b80821115610ba3576000816000905550600101610b8b565b5090565b905600a165627a7a7230582028f89a511b201982434ee42d974090a92930282a40b44082872c93831e8022980029'
        //         })
        //         .send({
        //             from: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
        //             gas: 4700000
        //         })
        //         .then(function(newContractInstance){
        //             window.instance  = newContractInstance // instance with the new contract address
        //         });
        //
        //
        //     this.setState({
        //         web3:result.web3
        //     })
        // })

        this.loadWeb3(getWeb3)
            .then(v=>{
                this.loadContractInstance(this.state.web3).then(()=>{
                this.state.instance.getBalance(function(error, result){
                        if(!error)
                            console.log(result.toNumber())
                        else
                            console.error(error);
                    });
                })
            });
        this.props.getUser();
        this.props.getUpdateProductList();
        this.props.getUpdatePoolList();
        this.props.getUpdateTransactiontList();
        this.props.getUpdateLoanList();
        this.props.getAdminMoney()
        this.setState({
            sidebar: false
        })
    }
    showSidebar = ()=>{
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    render(){
        if(this.state.web3 ===null){
            return(
                <div></div>
            )
        }else
        return(
            < div className="app-layout">
                    <Sidebar sidebarShow={this.state.sidebar} showSidebar={this.showSidebar} web3={this.state.web3} contactInstance={this.state.instance}/>
                    {!this.props.user.loading?<div className='main-layout'  web3={this.state.web3}>
                        <Header showSidebar={this.showSidebar}/>
                        <Dashboard  web3={this.state.web3}/>
                        {!this.props.user.loading?<Bottombar  web3={this.state.web3}/>:''}
                    </div>:''}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}
export default withRouter(connect(mapStateToProps,{ getAdminMoney,getUser, getUpdateProductList, getUpdatePoolList, getUpdateTransactiontList,getUpdateLoanList, updateWeb3})(ClientApp))