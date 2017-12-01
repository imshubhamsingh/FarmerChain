import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {acceptProductRequest} from '../../../Actions/CartFarmAction'
import {extractUserDetails} from '../../../helpers/userAndTransaction'

class GlobalProductList extends Component {
    acceptReq = () => {
        this.props.acceptProductRequest(this.props.product.id,extractUserDetails(this.props.user))
    }
    render(){
        return(
            <li>
                <div className="info">
                    <div className="name">{`${this.props.product.productName} (${this.props.product.quantity}kg)`}
                        <div className="product-user">
                            {`Added by ${this.props.user.displayName === this.props.product.username?'You': this.props.product.username}`}
                        </div>
                    </div>
                </div>
                <button className="btn-pool btn-effect" onClick={()=>this.acceptReq()} disabled={this.props.product.userId ===this.props.user.uid} >Volunteer to Buy</button>
            </li>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user
    };
}

export default withRouter(connect(mapStateToProps,{acceptProductRequest})(GlobalProductList))
