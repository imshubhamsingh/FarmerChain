import React, { Component } from 'react';
import './dashboard.css';
import Services from "./Services/services";
import PoolFarm from "./PoolFarming/PoolFarm";
import CartFarm from "./Cart Farm/CartFarm";
import FarmerBank from "./FarmerBank/FarmerBank";
import { Route, Switch} from 'react-router-dom';


class Dashboard extends Component{
    render(){
        return(
            <div className="dashboard">
                <Switch>
                    <Route path="/" exact component={Services}/>
                    <Route path="/poolfarm" component={PoolFarm}/>
                    <Route path="/cartFarm" component={CartFarm}/>
                    <Route path="/farmerBank" component={FarmerBank}/>
                    <Route/>
                </Switch>
            </div>

        )
    }
}

export default Dashboard