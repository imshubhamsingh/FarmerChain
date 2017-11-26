import React, { Component } from 'react'
import Login from './Login'
import Main from './Main'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUser } from '../../Actions/UserActions';

class Sidebar extends Component{
    componentWillMount(){
        this.props.getUser()
    }

    current = () => {
        return this.props.user.loading?<Login/>:<Main/>
    }
    render(){
        return(
            <div className={'sidebar box ' + (this.props.user.loading?'login-sidebar':'')}>
                {this.current()}
            </div>            
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default withRouter(connect(mapStateToProps,{getUser})(Sidebar))