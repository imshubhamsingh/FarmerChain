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
                        <li><a>Request a Loan</a></li>
                        <li><a>Add Funds</a></li>
                        <li><a>Transaction History</a></li>
                    </ul>

                    <div className="tab_content">

                        <div className="tabs_item farmerBank-request">
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
                            <div className="product-user-list">
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
                        </div>

                        <div className="tabs_item pool-list">
                            <ul>
                                <li>
                                    <div className="fund">
                                        ₹{this.props.admin.poolMoney}
                                    </div>
                                    <div className="details" style={{textAlign:'center'}}>
                                        General Public Funds
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit" onClick={this.payToPool} disabled={this.checkIfLoanPaid()}>{this.checkIfLoanPaid()?'Pay your loan to add to pool': 'Add'}</button>
                                </li>
                            <div>
                                <h2>
                                    Requested Loan
                                </h2>
                            </div>
                                {
                                    this.props.loans.map((loan)=> <GlobalLoanList loan={loan} user={this.props.user} key={loan.id} />)
                                }
                            </ul>
                        </div>
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
