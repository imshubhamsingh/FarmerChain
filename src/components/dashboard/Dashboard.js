import React, { Component } from 'react';
import Services from "./Services/services";
import PoolFarm from "./PoolFarming/PoolFarm";
import CartFarm from "./CartFarm/CartFarm";
import FarmerBank from "./FarmerBank/FarmerBank";
import { Route,Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'



import PageShell from './PageShell/PageShell'

class Dashboard extends Component{
    render(){
        return(
            <div className="dashboard box">

                     <Switch>
                        <Route path="/" exact changeHeader={this.props.changeHeader} component={PageShell(Services)} />
                        <Route path="/poolfarm" changeHeader={this.props.changeHeader} component={PageShell(PoolFarm)} />
                        <Route path="/cartfarm" changeHeader={this.props.changeHeader} component={PageShell(CartFarm)} />
                        <Route path="/farmerBank" changeHeader={this.props.changeHeader} component={PageShell(FarmerBank)} />
                        <Route/>
                     </Switch>
            </div>

        )
    }
}

export default withRouter(connect()(Dashboard))