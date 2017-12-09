import React, { Component } from 'react';
import Services from './Services/services';
import PoolFarm from './PoolFarming/PoolFarm';
import CartFarm from './CartFarm/CartFarm';
import FarmerBank from './FarmerBank/FarmerBank';
import NotFound from './404/404'
import { Route,Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './dashboard.css'


import PageShell from './PageShell/PageShell';

class Dashboard extends Component{
    render(){
        return(
            <div className="dashboard box">

                <Switch>
                    <Route path="/" exact changeHeader={this.props.changeHeader} component={PageShell(Services, this.props.web3)} />
                    <Route path="/poolfarm" changeHeader={this.props.changeHeader} component={PageShell(PoolFarm, this.props.web3)} />
                    <Route path="/cartfarm" changeHeader={this.props.changeHeader} component={PageShell(CartFarm, this.props.web3)} />
                    <Route path="/farmerBank" changeHeader={this.props.changeHeader} component={PageShell(FarmerBank, this.props.web3,this.props.contractInstance)} />
                    <Route path="*" component={PageShell(NotFound)} />
                </Switch>
            </div>

        );
    }
}

export default withRouter(connect()(Dashboard));
