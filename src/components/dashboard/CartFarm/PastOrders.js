import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'


class PastOrders extends Component {
    render(){
        return(
            <li className="transaction-list">
                <div className="info">
                    Order place by: {this.props.transaction.from.displayName}<br/>
                    Order bought by: {this.props.transaction.to.displayName}<br/>
                    product: {this.props.transaction.info.productName}({this.props.transaction.info.quantity}kg)<br/>
                    price: {this.props.transaction.info.price}<br/>
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

export default withRouter(connect(mapStateToProps,{})(PastOrders))
