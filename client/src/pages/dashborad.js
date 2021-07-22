import React, { Component } from 'react'

class Dashborad extends Component{
    state = {
        user: {}
    }
    componentDidMount = async () => {
        try {
        const data = await fetch('/user/dashboard', {
          method: "GET",
            headers: {
               "Authorization": `${window.sessionStorage.getItem("token")}`,
                "Mac": `${window.sessionStorage.getItem("mac")}`
          }
        })
        const user = await data.json()
        if (user.apiStatus) this.setState({ user: user.data })
        else this.setState({ user: { name: user.data } })
        console.log(user);
        return ;
      } catch (err) {
        console.log('ERROR:  ' + err)
      }
    }
    render() {
         console.log();
        return (
            <React.Fragment>
                <h1>Hello { this.state.user.name}</h1>
            </React.Fragment>
        )
    }
}
export default Dashborad