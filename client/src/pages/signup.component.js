import React, { Component } from "react";
import Joi from "joi-browser";

export default class SignUp extends Component {

    state = {
        fullname: '',
        email: '',
        password: '',
        mobile: '',
        image: "",
        errors: {},
    }

    schema = {
        fullname: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        mobile: Joi.string().required(),
        image: Joi.string().required()

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
        await this.validateHandler();
        let body ={
          "name": this.state.fullname,
          "email": this.state.email,
          "password": this.state.password,
          "mobile": this.state.mobile,
          "image": this.state.image
        }
        await this.props.register(body)
    }

    render() {
        return (
            <form   onSubmit={this.submitHandler}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Full name</label>
                    <input type="text"
                        autoFocus={true}
                        name='fullname'
                        value={this.state.fullname}
                        onChange={this.stateHandler}
                        id='fullname'
                        className="form-control"
                        placeholder="Full name"
                    />
                     {this.state.errors.fullname &&
                        <div className='alert alert-danger'>
                            {this.state.errors.fullname}
                        </div>
                    }
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                        name='email'
                        value={this.state.email}
                        onChange={this.stateHandler}
                        id='email'
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
                    <label>Mobile</label>
                    <input type="text"
                        name='mobile'
                        value={this.state.mobile}
                        onChange={this.stateHandler}
                        id='mobile'
                        className="form-control"
                        placeholder="Mobile"
                    />
                     {this.state.errors.mobile &&
                        <div className='alert alert-danger'>
                            {this.state.errors.mobile}
                        </div>
                    }
                </div>

                 <div className="form-group">
                    <label>Image</label>
                    <input type="file"
                        name='image'
                        value={this.state.image}
                        onChange={this.stateHandler}
                        id='image'
                        className="form-control"
                    />
                     {this.state.errors.image &&
                        <div className='alert alert-danger'>
                            {this.state.errors.image}
                        </div>
                    }
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="login">sign in?</a>
                </p>
            </form>
        );
    }
}