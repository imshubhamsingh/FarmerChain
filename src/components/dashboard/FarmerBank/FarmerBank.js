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
import $ from 'jquery';
const jQuery = $;

class FarmerBank extends Component{
    componentDidMount(){
        this.props.updateHeader('Farmers Bank');
        console.log(this.props.web3)
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

    state = {
        loanDescription:'',
        amount:0,
        buttonText: 'Request Loan'
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
