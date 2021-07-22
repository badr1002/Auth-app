import React from 'react'

export const SetPassword  =  props => {
    return (
        <React.Fragment>
            <form onSubmit={props.submitHandler}>
                <h3>Enter new Password</h3>

                <div className="form-group">
                    <label>New password</label>
                    <input type="password"
                        name='password'
                        value={props.state.password}
                        onChange={props.stateHandler}
                        id='password'
                        className="form-control"
                        placeholder="password"
                    />
                </div>
                 <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password"
                        name='conPassword'
                        value={props.state.conPassword}
                        onChange={props.stateHandler}
                        id='conPassword'
                        className="form-control"
                        placeholder="conPassword"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </React.Fragment>
    )
} 