import React, { Component } from 'react'
import './login.css'

class Login extends Component{
    state = {
        username: '',
        password: '',
        login: false
    }
    login = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.setState({login:true})
        setTimeout(this.props.onLogin,1000);
    };
    handleChange = (event) => {
        if(event.target.name ==='password'){
            this.setState({password: event.target.value});
        }else if(event.target.name ==='username'){
            this.setState({username: event.target.value});
        }
        
      }
    render(){
        return(
            <div className={"form "+(this.state.login?"remove-form":'')}>
                <div className="form-panel one">
                    <div className="form-header">
                        <h1>Account Login</h1>
                    </div>
                    <div className="form-content">
                        <form onSubmit={this.login}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" required="required" value={this.state.username} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required="required" value={this.state.password} onChange={this.handleChange}/>
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