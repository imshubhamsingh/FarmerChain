import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component{
    showback = () => {
    }

    render(){
        return(
                <div className='header box'>
                    <Link to="/">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{position: 'absolute',left:'37px',fontSize:'20px',color: '#313041'}}></i>
                    </Link>
                    Dashboard
                    <i className="fa fa-cog" aria-hidden="true" style={{position: 'absolute',right:'77px',fontSize:'20px'}}></i>
                    <i className="fa fa-bell" aria-hidden="true" style={{position: 'absolute',right:'37px',fontSize:'20px'}}></i>
                </div>
        )
    }
}

export default Header