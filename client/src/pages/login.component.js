import React, { Component } from "react";
import Joi from "joi-browser";

export default class Login extends Component {

     state = {
        email: '',
        password: '',
        checkbox:false,
        errors: {},
    }

    schema = {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }
     validateHandler = () => {
        const errors={};
        const state={...this.state};
        delete state.errors;
        const res =  Joi.validate(state,this.schema,{abortEarly:false});
        if(res.error === null)
        {
            this.setState({errors:false});
            return null;
        }
        else {
            for(let err of res.error.details){
            errors[err.path]=err.message;
        }}
       this.setState({errors})
    }

    stateHandler = e => {
        let state ={...this.state};
        state[e.currentTarget.name]=e.currentTarget.value;
        this.setState(state)
    }
    submitHandler = async e => {
        e.preventDefault();
        let save = this.refs.checkbox.checked;
        await this.validateHandler();
        await this.props.login(this.state.email,this.state.password,save)
    }



    render() {
        return (
            <form   onSubmit={this.submitHandler}>
                <h3>Sign In</h3>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                        name='email'
                        value={this.state.email}
                        onChange={this.stateHandler}
                        id='name'
                        className="form-control"
                        placeholder="email@exmple.com"
                    />
                     {this.state.errors.email &&
                        <div className='alert alert-danger'>
                            {this.state.errors.email}
                        </div>
                    }
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                        name='password'
                        value={this.state.password}
                        onChange={this.stateHandler}
                        id='password'
                        className="form-control"
                        placeholder="Password"
                    />
                     {this.state.errors.password &&
                        <div className='alert alert-danger'>
                            {this.state.errors.password}
                        </div>
                    }
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            ref='checkbox'
                            id='checkbox'
                            className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor="checkbox">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="/forget/password/get/email">password?</a>
                </p>
                <p className="forgot-password text-left">
                  Create account  <a href="/user/register">sgin up?</a>
                </p>
            </form>
        );
    }
}
