import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {rejectProductRequest, boughtProduct} from '../../../Actions/CartFarmAction'
import { extractUserDetails} from './helper'
import swal from 'sweetalert'


class BuyingList extends Component {
    deleteAcceptedReq = () => {
        this.props.rejectProductRequest(this.props.product.id,this.props.userProductKey)
    }
    buy = () =>{
        if(!this.props.alreadyBought){
            swal("Please Enter the price (₹):", {
                content: "input",
            })
                .then((value) => {
                    if(!isNaN(value)){
                        swal({
                            icon: "success"
                        });
                        this.props.boughtProduct(this.props.product.id, this.props.userProductKey ,extractUserDetails(this.props.user), value)
                    }else{
                        swal({
                            title:"Something went wrong",
                            icon: "error"
                        });
                    }

                })

        }
    }

    checkifBuy = () =>{
        for (const userId in this.props.product.boughtBy) {
            if ((this.props.product.boughtBy[userId].uid === this.props.user.uid) && (this.props.product.boughtBy[userId].bought === true)) {
                return true
            }
        }
        return false
    }
    render(){
        console.log(this.props)
        return(
            <li>
                <div className="info">
                    <div className="name">{`${this.props.product.productName} (${this.props.product.quantity}kg)`}
                        <div className="product-user">
                            {`Added by ${this.props.user.displayName === this.props.product.username?'You': this.props.product.username}`}
                        </div>
                    </div>
                </div>
                <div className="buying-list">
                    <button className="btn-pool btn-effect remove-from-list btn-1" onClick={()=>this.deleteAcceptedReq()} >Remove</button>
                    <button className="btn-pool btn-effect btn-2" onClick={()=>this.buy()} style={{backgroundColor: this.checkifBuy()?'green':''}} disabled={this.checkifBuy() || this.props.alreadyBought}>
                        {this.checkifBuy()?'Bought':!this.props.alreadyBought?'Buy':`Bought By ${this.props.alreadyBought}`}
                    </button>
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

export default withRouter(connect(mapStateToProps,{rejectProductRequest, boughtProduct})(BuyingList))
