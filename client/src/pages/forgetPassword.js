import React, { Component } from 'react'
import { SendEmail } from '../components/forms/sendEmail';
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import { SendCode } from '../components/forms/sendCode';
import { SetPassword } from '../components/forms/setPassword';

export default class GetPassword extends Component {

    state = {
        email: '',
        code: '',
        password: '',
        conPassword: ''
    }


    stateHandler = e => {
        let state ={...this.state};
        state[e.currentTarget.name]=e.currentTarget.value;
        this.setState(state)
    }
    submitHandler = async e => {
        e.preventDefault();
        if (this.state.email !== "") {
           await this.props.getPass(this.state.email)
           await window.location.assign('/forget/password/get/code')
        }
        if (this.state.code !== "") this.props.checkCode(this.state.code)
        if (this.state.password !== "") { 
            this.state.password === this.state.conPassword ? this.props.setPassword(this.state.password) :
                this.props.toast.error('Confirm password!', { pauseOnFocusLoss: false })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path='/forget/password/get/email' render={props => (
                            <SendEmail
                                stateHandler={this.stateHandler}
                                state={this.state}
                                submitHandler={this.submitHandler}
                                {...props}
                            />
                        )} />
                         <Route path='/forget/password/get/code' render={props => (
                            <SendCode
                                stateHandler={this.stateHandler}
                                state={this.state}
                                submitHandler={this.submitHandler}
                                {...props}
                            />
                        )} />
                         <Route path='/forget/password/set/password' render={props => (
                            <SetPassword
                                stateHandler={this.stateHandler}
                                state={this.state}
                                submitHandler={this.submitHandler}
                                {...props}
                            />
                        )} />
                        <Redirect to='/forget/password/get/email'/>
                    </Switch>
               </Router>
            </React.Fragment>
        )
    }
}
