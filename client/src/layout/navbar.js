import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navber = props => {  
    if (props.data.status) {
        return (
                <React.Fragment>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">
                            <NavLink className="navbar-brand" to={"/"}>Auth-test</NavLink>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                    <Link className="nav-link" to={"/me"}>{ props.data.user.name}</Link>
                                    </li>
                                    <li>
                                    <button className="btn btn-danger mr-2" onClick={() => {
                                        if (window.confirm('do you want to logout for all? if no press cancel')) {
                                           props.logoutAll()
                                        }else {
                                           props.logout()
                                        }
                                    }}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </React.Fragment>
            )
    }
     else {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/login"}>Auth-test</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/register"}>Sign up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
    )
    }
            
        
    
   
   
    
    
   
}

export default Navber