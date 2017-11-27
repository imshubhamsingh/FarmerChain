import React, {Component} from 'react';
import {connect} from 'react-redux'
import {acceptPoolRequest} from '../../../Actions/PoolFarmAction'


class PoolOffers extends Component {
    acceptReq = () => {
        this.props.acceptPoolRequest(this.props.pool.id,this.props.user.uid)

    }
    render(){
        console.log(this.props)
        return(
            <li key={this.props.pool.id}>
                <div className="info">
                    <div className="name">{this.props.pool.username}
                        <div className="type">
                            {this.props.pool.poolType}
                        </div>
                    </div>
                </div>
                <div className="details">
                    {this.props.pool.description}
                </div>
                <button className="btn-pool btn-effect" type="submit" onClick={()=>this.acceptReq()}>Accept Pool</button>
            </li>
        )
    }

}


export default connect(null,{acceptPoolRequest})(PoolOffers)
