import React, {Component} from 'react';
import {connect} from 'react-redux'
import {acceptPoolRequest} from '../../../Actions/PoolFarmAction'


class PoolOffers extends Component {
    acceptReq = () => {
        const {uid, displayName, email} = this.props.user
        this.props.acceptPoolRequest(this.props.pool.id,{uid, displayName, email})
    }
    render(){
        return(
            <li>
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
