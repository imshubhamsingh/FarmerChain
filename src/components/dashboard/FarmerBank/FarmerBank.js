import React, { Component } from 'react';
import { connect } from 'react-redux'
import PastTransactions from './PastTransactions'
import GlobalLoanList from './GlobalLoanList'
import { transactionDetailsSorted } from '../../../helpers/userAndTransaction'
import {deleteLoanRequest, setLoanRequest, payLoanBack} from '../../../Actions/FarmerBankAction'
import { colorStatus} from '../../../helpers/bankHelper'
import {extractUserDetails} from '../../../helpers/userAndTransaction'
import './farmerbank.css'
import $ from 'jquery';
const jQuery = $;

class FarmerBank extends Component{
    componentDidMount(){
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

    handleSubmit = (event) =>{
        event.preventDefault();
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

    showPastTransactions = () => {
        return (transactionDetailsSorted(this.props.transactions, this.props.user.uid, "loan"))
    }

    payLoanBack = (loan)=>{
        console.log(extractUserDetails(this.props.admin))
        console.log(extractUserDetails(this.props.user))
        this.props.payLoanBack(loan,extractUserDetails(this.props.admin), extractUserDetails(this.props.user))
    }

    render(){
        console.log(this.props.admin)
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
                                    <input type="text" id="load-desc" value={this.state.loanDescription} onChange={event=> this.setState({loanDescription:event.target.value})}/>
                                </div>
                                <div>
                                    <label htmlFor="loan-amt">Loan Amount (₹)</label>
                                    <input type="number" id="loan-amt" value={this.state.amount} onChange={event=> this.setState({amount:event.target.value})} min="0"/>
                                </div>
                                <button className="btn btn-effect" type="submit" style={{width:'359px'}}>{this.state.buttonText}</button>
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
                                                            {loan.amount} ETH
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
                                    <button className="btn-pool btn-effect" type="submit">Add</button>
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
                                    {this.showPastTransactions().map(transaction => {
                                        console.log(transaction)
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
        transactions: state.transactions,
        loans: state.loans,
        admin: state.admin
    };
}


export default connect(mapStateToProps,{ setLoanRequest ,deleteLoanRequest, payLoanBack})(FarmerBank);
