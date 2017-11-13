import React, { Component } from 'react'
import './login.css'

class Login extends Component{
    render(){
        return(
            <div className="form">
                <div className="form-panel one">
                    <div className="form-header">
                        <h1>Account Login</h1>
                    </div>
                    <div className="form-content">
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" required="required"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required="required"/>
                            </div>
                            <div className="form-group">
                                <label className="form-remember">
                                    <input type="checkbox"/>Remember Me
                                </label>
                                {/* <a className="form-recovery" href="">Forgot Password?</a> */}
                            </div>
                            <div className="form-group">
                                <button type="submit">Log In</button>
                            </div>
                        </form>
                    </div>
                </div>          
            </div>            
        )
    }
}

export default Login