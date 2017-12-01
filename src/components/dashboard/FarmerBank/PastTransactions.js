import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'


class PastTransactions extends Component {
    render(){
        return(
            <li className="transaction-list">
                <div className="info">
                    {this.props.transaction.from.displayName} ⇒ {this.props.transaction.to.displayName}<br/>
                    amount: ₹{this.props.transaction.info.amount}<br/>
                    transaction ID: {`0x${this.props.transaction.id}`}<br/>
                </div>
            </li>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user
    };
}

export default withRouter(connect(mapStateToProps,{})(PastTransactions))
