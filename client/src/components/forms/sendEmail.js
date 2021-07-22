import React from 'react'

export const SendEmail  =  props => {
    return (
        <React.Fragment>
            <form onSubmit={props.submitHandler}>
                <h3>Enter email</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                        name='email'
                        value={props.state.email}
                        onChange={props.stateHandler}
                        id='name'
                        className="form-control"
                        placeholder="email@exmple.com"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </React.Fragment>
    )
} 