import React, { Component } from 'react'

class Profile extends Component{
    state = {
        fullname: `${this.props.data.user.name}`,
        email: `${this.props.data.user.email}`,
        old_password: "",
        new_password: "",
        mobile: `${this.props.data.user.mobile}`,
        image: "",
        status:false
    }
    
    

    stateHandler = e => {
        let state ={...this.state};
        state[e.currentTarget.name]=e.currentTarget.value;
        this.setState(state)
    }
    submitHandler = async e => {
        e.preventDefault();
        await this.state.fullname !== "" && this.state.mobile !== "" && this.setState({ status: true })
        await this.state.old_password!== "" &&this.state.new_password === "" && this.setState({status:false})
        if (this.state.status) {

            let body = {
                "name": this.state.fullname,
                "mobile": this.state.mobile
            }

            let pass = {
                "oldPassword": this.state.old_password,
                "password": this.state.new_password
            }

            if (this.state.old_password !== '') await Object.assign(body, pass)
            await  this.props.edit(body)
       
        }
        else {
            const state = Object.entries(this.state)
            state.map(e => e[1] === "" && this.props.toast.error(`${e} can not be empty`, { pauseOnFocusLoss: false }))
        }
    }
    render() {
        if (this.props.data.status) {
            return (
            <React.Fragment>
               <form onSubmit={this.submitHandler}>
                <h3>Profile</h3>

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
                    
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                        name='email'
                        readOnly
                        value={this.state.email}
                        id='email'
                        className="form-control"
                        placeholder="email@exmple.com"
                    />
                   
                </div>

                <div className="form-group">
                    <label>Current Password</label>
                    <input type="password"
                        name='old_password'
                        value={this.state.old_password}
                        onChange={this.stateHandler}
                        id='old_password'
                        className="form-control"
                        placeholder="Current password"
                    />
                    <p className="forgot-password text-right">
                         Forgot <a href="/forget/password/get/email">password?</a>
                    </p>
                    
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password"
                        name='new_password'
                        value={this.state.new_password}
                        onChange={this.stateHandler}
                        id='new_password'
                        className="form-control"
                        placeholder="New Password"
                    />
                    
                    
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
                    
                </div>

                <button type="submit" className="btn btn-warning btn-block">Edit</button>
               
            </form>
            </React.Fragment>
        )
        }
        else {
             return (
            <React.Fragment>
                <h1>Hello { this.props.data.user.msg}</h1>
            </React.Fragment>
        )
        }
    }
}
export default Profile