import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import history from "../../history";
import './header.css'


class Header extends Component{
    showback = () => {
        return <i onClick={history.goBack} className="fa fa-arrow-left" aria-hidden="true" style={{position: 'absolute',left:'37px',fontSize:'20px',color: '#313041'}}></i>
    }

    render(){
        return(
                <div className='header box'>
                    <span onClick={this.props.showSidebar} className="menu"><i className="fa fa-bars" aria-hidden="true"></i></span>
                    {this.showback()}
                    Dashboard
                    <i className="fa fa-cog" aria-hidden="true" style={{position: 'absolute',right:'77px',fontSize:'20px'}}></i>
                    <i className="fa fa-bell" aria-hidden="true" style={{position: 'absolute',right:'37px',fontSize:'20px'}}></i>
                </div>
        )
    }
}

export default Header