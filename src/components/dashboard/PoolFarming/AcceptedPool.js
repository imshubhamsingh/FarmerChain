import React, {Component} from 'react';
import {connect} from 'react-redux'
import {rejectPoolRequest} from '../../../Actions/PoolFarmAction'


class AcceptedPool extends Component {
    deleteAcceptedReq = () => {
        this.props.rejectPoolRequest(this.props.pool.id,this.props.userkey)

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
                <button className="btn-pool btn-effect" type="submit" style={{backgroundColor:'red'}} onClick={()=>this.deleteAcceptedReq()}>Reject Pool</button>
            </li>
        )
    }

}


export default connect(null,{rejectPoolRequest})(AcceptedPool)
