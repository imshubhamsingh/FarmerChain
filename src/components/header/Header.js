import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
	render() {
		return (
			<div className="header box">
				<span onClick={this.props.showSidebar} className="menu-toggle">
					<i
						className="fa fa-bars"
						aria-hidden="true"
						style={{ position: 'absolute', left: '37px', fontSize: '20px', color: '#313041' }}
					/>
				</span>
				<Link to="/" style={{ display: this.props.header === 'Home' ? 'none' : '' }}>
					<i
						className="fa fa-arrow-left"
						aria-hidden="true"
						style={{ position: 'absolute', right: '24px', fontSize: '20px', color: '#313041' }}
					/>
				</Link>
				{this.props.header}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { header: state.header };
}

export default connect(mapStateToProps, null)(Header);
