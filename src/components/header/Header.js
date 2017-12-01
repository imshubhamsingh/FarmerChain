import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';


class Header extends Component{

  render(){
    return(
      <div className='header box'>
		            <span onClick={this.props.showSidebar} className="menu-toggle"><i className="fa fa-bars" aria-hidden="true" style={{position: 'absolute',left:'37px',fontSize:'20px',color: '#313041'}}></i></span>
        <Link to="/">
          <i className="fa fa-arrow-left" aria-hidden="true" style={{position: 'absolute',right: '118px',fontSize:'20px',color: '#313041'}}></i>
        </Link>
        {this.props.header}
        <i className="fa fa-cog" aria-hidden="true" style={{position: 'absolute',right:'77px',fontSize:'20px'}}></i>
        <i className="fa fa-bell" aria-hidden="true" style={{position: 'absolute',right:'37px',fontSize:'20px'}}></i>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { header: state.header };
}

export default connect(mapStateToProps,null)(Header);
