import React, { Component } from 'react'
import './login.css'
import { login, createAccount, getUser } from '../../Actions/UserActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import logo from './logo.svg';

class Login extends Component{
    state = {
        email: '',
        password: '',
        signUpEmail: '',
        signUpDisplayName:'',
        signUpPassword:'',
        confirmPassword: '',
        login: false,
        signUp: false,
        errorSignUp: {
            message: ''
        },
        errorLogin: {
            message: ''
        },
        error: false,
        showForm: this.props.user.loading
    }

    componentWillMount(){
        this.props.getUser()
    }

    loginForm = (event) => {
        event.preventDefault();
        const {email, password} = this.state

        this.setState({login:true})
        this.props.login(email, password)
            .then(()=>{
                setTimeout(this.props.onLogin,1000);
            })
            .catch((error)=>{
            this.setState({login:false})
                console.error('error',error)
                this.setState({errorLogin:error, error:true})
                setTimeout(()=>{
                    this.setState({error: false})
                }, 2000)
        });
    };
    openSignUp = ()=>{
        if(this.state.signUp === false){
            this.setState({signUp: true})
        }
    }
    signUp = (event)=>{
        event.preventDefault();
        if(this.state.confirmPassword === this.state.signUpPassword){
            const {signUpEmail, signUpPassword,signUpDisplayName } = this.state
            this.setState({login:true})
            let that = this;
            axios.get('/api/accounts').then(function (response) {
                const {data} = response
                const {accounts} = data
                that.props.setDisplayName(signUpDisplayName, accounts);
                console.log(data)
                that.props.createAccount(signUpEmail, signUpPassword, signUpDisplayName, data)
                    .then(() => {
                        setTimeout(that.props.onLogin, 2000);
                    })
                    .catch(error => {
                        that.setState({login: false})
                        console.error('error', error)
                        that.setState({errorSignUp: error, error: true})
                        setTimeout(() => {
                            that.setState({error: false})
                        }, 2000)

                    })
            }).catch(function (error) {
                    console.log(that)
                    console.log(error)
                });

        }else{
            this.setState({
                errorSignUp: {
                    message: 'Password do not match'
                },
                error:true
            })
            setTimeout(()=>{
                this.setState({error: false})
            }, 2000)
        }


    }

    error = () =>{
        this.setState({
            errorSignUp: {
                message: 'No Account left'
            },
            error:true
        })
        setTimeout(()=>{
            this.setState({error: false})
        }, 2000)
   }
    closeSignUp = ()=>{
        if(this.state.signUp === true){
            this.setState({signUp: false})
        }
    }

    renderLogin =()=>{
        return  <div className={"form "+(this.state.login?"remove-form":'') + (this.state.error?"error":'')} style={{display: this.props.user.loading ? 'block' : 'none' }}
        >
            <div className="form-panel one">
                <img src={logo} alt="logo" className="logo" />
                <div className="form-header">
                    <h1>Account Login</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={this.loginForm}>
                        <div className="form-group">
                            <label htmlFor="userEmail">Email</label>
                            <input type="email" id="userEmail" name="userEmail" required="required" value={this.state.email} onChange={event=>this.setState({email: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required="required" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            {/*<label className="form-remember">*/}
                            {/*<input type="checkbox"/>Remember Me*/}
                            {/*</label>*/}
                            {/* <a className="form-recovery" href="">Forgot Password?</a> */}
                        </div>
                        <div className="form-group">
                            <button type="submit">Log In</button>
                        </div>
                    </form>
                    <div className="form-recovery login">{this.state.errorLogin.message}</div>
                    <div style={{cursor:'pointer'}} className="signUp-bottom" onClick={this.openSignUp}>
                        Sign Up
                    </div>
                </div>
            </div>
            <div className={"form-panel two "+(this.state.signUp?"show":'')} onClick={this.openSignUp}>
                <div className="form-toggle" onClick={this.closeSignUp}></div>
                <div className="form-header">
                    <h1>Register Account</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={this.signUp}>
                        <div className="form-group">
                            <label htmlFor="userSignUpDisplayName">Username</label>
                            <input type="text" id="userSignUpDisplayName" name="username" required="required" value={this.state.signUpDisplayName} onChange={event=>this.setState({signUpDisplayName: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userSignUpEmail">Email</label>
                            <input type="email" id="userSignUpEmail" name="username" required="required" value={this.state.signUpEmail} onChange={event=>this.setState({signUpEmail: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userSignUpPassword">Password</label>
                            <input type="password" id="userSignUpPassword" name="password" required="required" value={this.state.signUpPassword} onChange={event=>this.setState({signUpPassword: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="password" name="confirmPassword" required="required" value={this.state.confirmPassword} onChange={event=>this.setState({confirmPassword: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            <button type="submit">Register</button>
                        </div>
                        <div className="form-recovery signUp">{this.state.errorSignUp.message}</div>

                    </form>
                </div>
            </div>

        </div>
    }


    render(){
        if(this.props.user.loading) return this.renderLogin()
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}


export default withRouter(connect(mapStateToProps,{login,createAccount,getUser})(Login))