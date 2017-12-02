import React, { Component } from 'react';
import Login from './Login';
import Main from './Main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../Actions/UserActions';
import './sidebar.css'



class Sidebar extends Component{
    componentWillMount(){
        this.props.getUser();
    }
    state = {
        displayName:'',
        account:''
    }
    setDisplayName = (displayName, account)=>{
        this.setState({
            displayName: displayName,
            account: account
        });
    }

    current = () => {
        return this.props.user.loading?<Login setDisplayName={this.setDisplayName}/>:<Main account={this.state.account} displayName={this.state.displayName} showSidebar={this.props.showSidebar}/>;
    }
    render(){
        return(
            <div className={'sidebar box ' + (this.props.user.loading?'login-sidebar sidebar-background':'')+' '+(this.props.sidebarShow?'showSidebar':'')}>
                {this.current()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default withRouter(connect(mapStateToProps,{getUser})(Sidebar));