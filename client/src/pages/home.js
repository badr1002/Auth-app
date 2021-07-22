import React, { Component } from 'react'

class Home extends Component{
    render() {
        if (this.props.data.status) {
            return (
            <React.Fragment>
                <h1>Hello { this.props.data.user.name}</h1>
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
export default Home