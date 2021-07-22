import React, { Component } from 'react'

export default class Active extends Component {
    componentDidMount() {
        this.props.toast.error('please check your email', { pauseOnFocusLoss: false });
    }
    render() {
        return (
            <div>
                We sent you an email to activate please check your email!
            </div>
        )
    }
}
