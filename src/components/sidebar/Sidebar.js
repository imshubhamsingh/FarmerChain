import React, { Component } from 'react'
import Login from './Login'
import Main from './Main'
import { connect } from 'react-redux'
import {LoginCheckModule} from "../../firebase/firebase";
import { getUser } from '../../Actions/UserActions';

class Sidebar extends Component{
    componentWillMount(){
        this.props.getUser()
    }

    state = {
        currentUser: this.props.user
    }

    current = () => {
        console.log(this.props.user.loading)
        return this.props.user.loading?<Login currUser={this.state.currentUser.loading}/>:<Main/>
    }
    render(){
        console.log(this.props.user.loading)
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

export default connect(mapStateToProps,{getUser})(Sidebar)