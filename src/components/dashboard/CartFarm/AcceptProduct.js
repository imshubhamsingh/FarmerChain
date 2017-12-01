import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {payForProduct} from '../../../Actions/CartFarmAction';
import swal from 'sweetalert2';


class AcceptProduct extends Component {
    pay = () =>{
      swal({
        title: `Do you want to Pay ${this.props.boughtbyDetails.displayName} for buying ${this.props.product.productName} (${this.props.product.quantity}kg) for ₹ ${this.props.boughtbyDetails.price}`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
        },
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          const {displayName, email, uid} = this.props.user;
          const info = {
            productName:this.props.product.productName,
            quantity: this.props.product.quantity,
            price: this.props.boughtbyDetails.price,
            id: this.props.product.id
          };
          this.props.payForProduct(info, {displayName, email, uid}, this.props.boughtbyDetails);
          swal({
            type: 'success',
            title: 'Transaction was complete'
          });
        }
      });
    }

    render(){
      return(
        <li>
          <div className="info">
            <div className="name">{`${this.props.product.productName} (${this.props.product.quantity}kg)`}
            </div>
          </div>
          <button className="btn-pool btn-effect" onClick={()=> this.pay()} style={{backgroundColor:'green'}}>{`Pay ${this.props.boughtbyDetails.displayName}( ₹ ${this.props.boughtbyDetails.price} )`}</button>
        </li>
      );
    }

}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    money: state.user.money
  };
}

export default withRouter(connect(mapStateToProps,{payForProduct})(AcceptProduct));
