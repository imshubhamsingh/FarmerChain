import React, { Component } from 'react'
import './login.css'
import { login, createAccount, getUser } from '../../Actions/UserActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Login extends Component{
    state = {
        email: '',
        password: '',
        signUpEmail: '',
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
        console.log(this.state)

        if(this.state.confirmPassword === this.state.signUpPassword){
            const {signUpEmail, signUpPassword} = this.state
            createAccount(signUpEmail,signUpPassword)
                .then(()=>{
                    this.setState({login:true})
                    setTimeout(this.props.onLogin,1000);
                })
                .catch(error=>{
                    console.error('error',error)
                    this.setState({errorSignUp:error,error:true})
                    setTimeout(()=>{
                        this.setState({error: false})
                    }, 2000)

                })
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
    closeSignUp = ()=>{
        if(this.state.signUp === true){
            this.setState({signUp: false})
        }
    }

    renderLogin =()=>{
        return  <div className={"form "+(this.state.login?"remove-form":'') + (this.state.error?"error":'')} style={{display: this.props.user.loading ? 'block' : 'none' }}
        >
            <div className="form-panel one">
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