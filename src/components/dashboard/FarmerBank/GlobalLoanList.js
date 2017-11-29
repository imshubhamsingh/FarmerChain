import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {acceptLoanRequest, rejectLoanRequest} from '../../../Actions/FarmerBankAction'
import {extractUserDetails} from '../../../helpers/userAndTransaction'

class GlobalProductList extends Component {
    acceptReq = () => {
        this.props.acceptProductRequest(this.props.product.id,extractUserDetails(this.props.user))
    }
    render(){
        console.log(this.props.type)
        return(
            <li>
                <div className="info">
                    <div className="name">{this.props.loan.loanDescription}
                        <div className="type">
                            {this.props.loan.amount} ETH
                        </div>
                    </div>
                    <div className="details">
                        Requested By: <b>{this.props.loan.username}</b> Status: { this.props.loan.status }
                    </div>
                </div>
                {
                    this.props.type === "admin" ?<div>
                        <button className="btn-pool btn-effect" onClick={()=> this.props.rejectLoanRequest(this.props.loan)}>Reject Request</button>
                        <button className="btn-pool btn-effect" onClick={()=> this.props.acceptLoanRequest(this.props.loan, this.props.user.uid, this.props.loan.userId)}>Grant Request</button>
                    </div>: ''
                }
            </li>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        type: state.user.type
    };
}

export default withRouter(connect(mapStateToProps,{ rejectLoanRequest, acceptLoanRequest })(GlobalProductList))
