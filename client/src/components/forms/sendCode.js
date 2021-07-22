import React from 'react'

export const SendCode  =  props => {
    return (
        <React.Fragment>
            <form onSubmit={props.submitHandler}>
                <h3>Enter the code here</h3>

                <div className="form-group">
                    <label>Code</label>
                    <input type="text"
                        name='code'
                        value={props.state.code}
                        onChange={props.stateHandler}
                        id='code'
                        className="form-control"
                        placeholder="code"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </React.Fragment>
    )
} 