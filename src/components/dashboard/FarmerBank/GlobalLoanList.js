import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {acceptLoanRequest, rejectLoanRequest} from '../../../Actions/FarmerBankAction'
import {extractUserDetails} from '../../../helpers/userAndTransaction'
import { colorStatus} from '../../../helpers/bankHelper'

class GlobalProductList extends Component {
    acceptReq = () => {

        this.props.acceptProductRequest(this.props.product.id,extractUserDetails(this.props.user))
    }

    render(){
        console.log(this.props.user)
        return(
            <li>
                <div className="info">
                    <div className="name">{this.props.loan.loanDescription}
                        <div className="type">
                            ₹{this.props.loan.amount}
                        </div>
                    </div>
                    <div className="name" style={{fontWeight: 'lighter'}}> Requested By: {this.props.loan.username}
                        <div className="type" style={{backgroundColor: colorStatus(this.props.loan.status,"red","green","orange")}}>
                            Status: { this.props.loan.status }
                        </div>
                    </div>
                </div>
                {
                    this.props.type === "admin" && this.props.loan.status === "waiting"?<div className="farmer-admin">
                        <button className="btn-pool btn-effect farmer-admin-btn-1" onClick={()=> this.props.rejectLoanRequest(this.props.loan)}>Reject Request</button>
                        <button className="btn-pool btn-effect farmer-admin-btn-2" onClick={()=> this.props.acceptLoanRequest(this.props.loan, extractUserDetails(this.props.user),extractUserDetails(this.props.loan))}>Grant Request</button>
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
