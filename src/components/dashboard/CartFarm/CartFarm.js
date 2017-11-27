import React, { Component } from 'react';
import GlobalProductList from './GlobalProductList'
import BuyingList from './BuyingList'
import {setProductRequest, getUpdateProductList, deleteProductRequest} from '../../../Actions/CartFarmAction'
import {connect} from 'react-redux'
import './cartfarm.css';
import $ from 'jquery';
const jQuery = $;

class CartFarm extends Component{
    componentDidMount(){
        this.props.getUpdateProductList();
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
        productName:'',
        quantity:'1',
        buttonText: 'Order'
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            buttonText: 'Processing Order'
        })
        this.props.setProductRequest({
            productName:this.state.productName,
            quantity: this.state.quantity,
            createdAt: Date.now()
        }).then(()=>{
            this.setState({
                buttonText: 'Order in Queue'
            })

            setTimeout(()=>{
                this.setState({
                    productName:'',
                    quantity:'1',
                    buttonText: 'Order'
                })
            },2000)


        })

    }

    checkifBuyProduct = (product) =>{
        for (const userId in product.boughtBy) {
            if (product.boughtBy[userId].bought=== true && product.boughtBy[userId] !== undefined){
                return {
                    details:product.boughtBy[userId],
                    result:true
                }
            }
        }
        return false
    }

    render(){
        return(
            <div>
                <div className="tab">

                    <ul className="tabs">
                        <li><a>Place Order</a></li>
                        <li><a>Added Items</a></li>
                        <li><a>Track Items</a></li>
                        <li><a>Pay for Items</a></li>
                    </ul>

                    <div className="tab_content">

                        <div className="tabs_item product-request">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor="product">Product Name</label>
                                    <input type="text" id="product" value={this.state.productName} onChange={event=> this.setState({productName:event.target.value})}/>
                                </div>
                                <div>
                                    <label htmlFor="type">Quantity(kg)</label>
                                    <select id="type" value={this.state.quantity} onChange={event=> this.setState({quantity:event.target.value})}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <button className="btn btn-effect" type="submit">{this.state.buttonText}</button>
                            </form>
                            <div className="product-user-list">
                                <h3>Your Order List</h3>
                                <ul>
                                    {this.props.products!==null?this.props.products.map((product)=> {
                                        if(product.userId === this.props.user.uid){
                                            return <li key={product.id}>
                                                <div className="info">
                                                    <div className="name">{`${product.productName} (${product.quantity}kg)`}
                                                    </div>
                                                </div>
                                                <button className="btn-pool btn-effect" onClick={()=> this.props.deleteProductRequest(product)} style={{backgroundColor:this.checkifBuyProduct(product).result?'green':'red'}} disabled={this.checkifBuyProduct(product).result}>{this.checkifBuyProduct(product).result?`Bought by ${this.checkifBuyProduct(product).details.displayName}`:'Cancel Order'}</button>
                                            </li>
                                        }
                                        return '';
                                    }):''}
                                </ul>
                            </div>
                        </div>

                        <div className="tabs_item pool-list">
                            <div className="product-list">
                                <div className="products-list">
                                    <h2>Global Product List</h2>
                                    <ul>
                                        {this.props.products!==null?this.props.products.map((product)=> {
                                            let flag = false;
                                            for (const userId in product.boughtBy) {
                                                if (product.boughtBy[userId].uid === this.props.user.uid || product.boughtBy[userId].bought === true) {
                                                    flag = true
                                                    break
                                                }
                                            }
                                            return (!flag)?<GlobalProductList product={product} user={this.props.user}
                                                                                 key={product.id}/>:''
                                        }):''}
                                    </ul>
                                </div>
                                <div className="products-list">
                                    <h2>Your buying List</h2>
                                    <ul>
                                        {this.props.products!==null?this.props.products.map((product)=> {
                                            let flag = false;
                                            let userProductKey="";
                                            let alreadBought = null
                                            for (const userId in product.boughtBy) {
                                                if (product.boughtBy[userId].uid === this.props.user.uid) {
                                                    flag = true
                                                    userProductKey = userId
                                                    break
                                                }
                                            }

                                            for (const userId in product.boughtBy) {
                                                if (product.boughtBy[userId].bought === true && product.boughtBy[userId].uid !== this.props.user.uid) {
                                                    alreadBought = product.boughtBy[userId].displayName
                                                    break
                                                }
                                            }

                                            return (flag)?<BuyingList product={product} user={this.props.user}
                                                                              key={product.id} userProductKey={userProductKey} alreadyBought={alreadBought}/>:''
                                        }):''}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="tabs_item pool-list">
                            <iframe
                                title="currentlocation"
                                style={
                                {
                                    width:'100%',
                                    height:'100%',
                                    margin: '0',
                                    padding: '0',
                                    border: 'none'
                            }} type="image/svg+xml" src="https://dashboard.hypertrack.com/widget/list/users;id=b0d9fa85-e2d5-440a-b9bd-20e53991db85?show_all=true&ordering=-last_heartbeat_at&key=sk_5749169650188a0b995add7fa81b5d536bcf36fa" >
                            </iframe>

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
        user: state.user.user
    };
}

export default connect(mapStateToProps,{setProductRequest, getUpdateProductList, deleteProductRequest})(CartFarm)