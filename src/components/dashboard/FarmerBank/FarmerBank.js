import React, { Component } from 'react';
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
        this.props.setProductRequest({
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
                                    <input type="text" id="load-desc" value={this.state.loanDescription} onChange={event=> this.setState({loanDescription:event.target.value})}/>
                                </div>
                                <div>
                                    <label htmlFor="loan-amt">Loan Amount (ETH)</label>
                                    <input type="number" id="loan-amt" value={this.state.amount} onChange={event=> this.setState({amount:event.target.value})}/>
                                </div>
                                <button className="btn btn-effect" type="submit">Request Loan</button>
                            </form>
                            <div className="product-user-list">
                                <h3>Your Requested Loan</h3>
                                <ul>
                                    {this.props.loans!==null?this.props.loans.map((loan)=> {
                                        if(product.userId === this.props.user.uid){
                                            return <li key={product.id}>
                                                <div className="info">
                                                    <div className="name">{loan.loanDescription}
                                                        <div className="type">
                                                            {loan.amount} ETH
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="btn-pool btn-effect" onClick={()=> this.props.deleteProductRequest(product)} style={{backgroundColor:this.checkifBuyProduct(product).result?'green':'red'}} disabled={this.checkifBuyProduct(product).result}>{this.checkifBuyProduct(product).result?`Request Accepted ${this.checkifBuyProduct(product).details.displayName}( ₹ ${this.checkifBuyProduct(product).details.price} )`:'Cancel Request'}</button>
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
                                        ₹3100
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
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                100 ETH
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Grant</button>
                                </li>
                                <li>
                                    <div className="info">
                                        <div className="name">Rohan
                                            <div className="type">
                                                300 ETH
                                            </div>
                                        </div>

                                    </div>
                                    <div className="details">
                                        Wheat crop production in ganaur harayana
                                    </div>
                                    <button className="btn-pool btn-effect" type="submit">Grant</button>
                                </li>
                            </ul>
                        </div>
                        <div className="tabs_item pool-list">
                            <div className="products-list">
                                <h2>Past Orders Transaction</h2>
                                <ul>
                                    {this.showPastOrders().map(transaction => {
                                        return <PastTransaction transaction={transaction} key={transaction.id}/>
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
        transactions: state.transactions
    };
}


export default connect(mapStateToProps,{setProductRequest, getUpdateProductList, deleteProductRequest})(FarmerBank);
