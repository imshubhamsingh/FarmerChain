import React, { Component } from 'react';
import './dashboard.css';
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
            <div className="dashboard">

                     <Switch>
                        <Route path="/" exact component={PageShell(Services)} />
                        <Route path="/poolfarm" component={PageShell(PoolFarm)} />
                        <Route path="/cartfarm" component={PageShell(CartFarm)} />
                        <Route path="/farmerBank" component={PageShell(FarmerBank)} />
                        <Route/>
                     </Switch>
            </div>

        )
    }
}

export default withRouter(connect()(Dashboard))