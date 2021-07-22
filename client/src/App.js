import React,{Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

import Login from "./pages/login.component";
import Register from "./pages/signup.component";
import Navber from './layout/navbar';
import Home from './pages/home';
import Active from './components/active';
import Dashborad from './pages/dashborad';
import Profile from './pages/profile';
import GetPassword from './pages/forgetPassword';

class App extends Component {
  state = {
        status:false,
        user: {}
  }
  cookies = new Cookies();

  setSession = (token,mac) => {
     window.sessionStorage.setItem("token", token);
     window.sessionStorage.setItem("mac", mac);
  }

  removeSession = () => {
     this.cookies.remove('login')
     sessionStorage.removeItem('token')
     sessionStorage.removeItem('mac')
  }


  headers = {}
  constructor(props) {
    super(props);
    this.componentDidMount = async () => {
      // get header to authorized
      // if not have cookies get token from session storage 
      // else get token from cookies
      if (!this.cookies.get('login')) {
        this.headers = {
          "Authorization": `${window.sessionStorage.getItem("token")}`,
          "Mac": `${window.sessionStorage.getItem("mac")}`
        }
      } else {
        this.headers = {
          "Authorization": `${this.cookies.get('login').token}`,
          "Mac": `${this.cookies.get('login').mac}`
        }
      }
      // fetch to get user by token and mac
      try {
        const data = await fetch('/user/me', {
          method: "GET",
          headers:  this.headers
        })
        const user = await data.json()
        if (user.apiStatus) {
          this.setState({ status: true, user: user.data })
          this.setSession(user.data.tokens[0].token,user.data.macs[0].mac);
        }
        else this.setState({ status: false, user: { msg: user.data } })
        return;
      } catch (err) {
        console.log('ERROR:  ' + err)
      }
    }
  }
  // register
  registerHandler = async (user) => {
    try {
      await fetch(`/user/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ user })
      }).then(res => res.json()).then(res => {
        if (!res.apiStatus) toast.error(`${res.data}`, { pauseOnFocusLoss: false });
        else window.location.assign('/login')
      })
    } catch (err) {
      console.log('ERROR:  ' + err)
    }
  }

  // login
  loginHandler = async (email, pass,save) => {
     try {
       const res = await fetch('/user/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
         body: JSON.stringify({
           "email": email,
           "password": pass,
           "save":save
         })
       })
       const data = await res.json()
       if (!data.apiStatus) toast.error(`${data.data}`, { pauseOnFocusLoss: false });
       if (save) await this.cookies.set('login', { "token": `${data.data.token}`, "mac": `${data.data.mac}` }, { path: '/' });
       await this.setSession(data.data.token,data.data.mac);  
       if(!data.data.user.activate) window.location.assign('/activate')
       else window.location.assign('/')
    }catch (err) {
       console.log('ERROR:  ' + err)
    }
  }

  // edit user and password
  editHandler = async (user) => {
    try {
      const res = await fetch('/user/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.headers.Authorization,
          'Mac':this.headers.Mac
        },
        body: JSON.stringify({
          "user": user
        })
      })
      const data = await res.json()
      if (!data.apiStatus) toast.error(`${data.data}`, { pauseOnFocusLoss: false })
      if (data.apiStatus) toast.success(`${data.msg}`, { pauseOnFocusLoss: false })
    } catch (err) {
      console.log('ERROR:  ' + err)
    }
  }

  // forget password
  forgetPassHandler = async (email) => {
    try {
      const res = await fetch('/user/forget/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.headers.Authorization,
          'Mac':this.headers.Mac
        },
        body: JSON.stringify({
          "email": email,
        })
      })
      const data = await res.json()
      if (!data.apiStatus) toast.error(`${data.data}`, { pauseOnFocusLoss: false })
      if (data.apiStatus) window.location.assign('/get/code')
             
    } catch (err) {
             console.log('ERROR:  ' + err)
    }
  }

  // check code to set new password
  checkCodeHandler = async code => {
     try {
      const res = await fetch('/user/check/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.headers.Authorization,
          'Mac':this.headers.Mac
        },
        body: JSON.stringify({
          "code": code,
        })
      })
      const data = await res.json()
      if (!data.apiStatus) toast.error(`${data.msg}`, { pauseOnFocusLoss: false })
       if (data.apiStatus) {
         await this.setSession(data.data.token,data.data.mac);  
         window.location.assign(`/forget/password/set/password`)
       }
             
         } catch (err) {
             console.log('ERROR:  ' + err)
         }
  }

  // set new password
  setNewPassword = async (pass) => {
    try {
      const res = await fetch('/user/set/password/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": `${window.sessionStorage.getItem("token")}`,
          "Mac": `${window.sessionStorage.getItem("mac")}`
        },
        body: JSON.stringify({
          "password": pass
        })
      })
       const data = await res.json()
      if (!data.apiStatus) toast.error(`${data.data}`, { pauseOnFocusLoss: false })
      if (data.apiStatus) window.location.assign('/')
             
         } catch (err) {
             console.log('ERROR:  ' + err)
         }
  }

  // logout
  logoutHandler = async () => {
    try {
       await this.setState({ status: false, user: {} })
       const res = await fetch('/user/logout', {
         method: 'DELETE',
         headers: this.headers
       })
       const data = await res.json()
       if (!data.apiStatus) toast.error(`${data.data}`, { pauseOnFocusLoss: false });
       else {
         await this.cookies.remove('login')
         await this.removeSession();  
      }
      // window.onbeforeunload = () => {
      //   return "Do you really want to close?";
      // }
       window.location.assign('/')
    } catch (err) {
      console.log('ERROR:  ' + err)
    }
  }

  // logout all
  logoutAllHandler = async () => {
    try {
       await this.setState({ status: false, user: {} })
       const res = await fetch('/user/logoutAll', {
         method: 'DELETE',
         headers: this.headers
       })
       const data = await res.json()
       if (!data.apiStatus) toast.error(`${data.data}`, { pauseOnFocusLoss: false });
       else {
         await this.removeSession()
      }
       window.location.assign('/')
    } catch (err) {
      console.log('ERROR:  ' + err)
    }
  }
  
  
  
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Router>
          <div className="App">
            <Navber
              logout={this.logoutHandler}
              logoutAll={this.logoutAllHandler}
              data={this.state} 
            />
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
                  <Route exact path='/home' render={props => <Home toast={toast} data={this.state}  {...props} />} />
                  <Route path='/dashborad' render={props => <Dashborad headers={this.headers} toast={toast} {...props} />} />
                  <Route path='/me' render={props =>
                    <Profile
                      toast={toast}
                      data={this.state}
                      edit={this.editHandler}
                      editPassword={this.editPasswordHandler}
                      {...props} />} />
                  <Route path='/register' render={props => <Register toast={toast} register={this.registerHandler} {...props}/>}/>
                  <Route path="/login" render={props => <Login toast={toast} login={this.loginHandler} {...props} />} />
                  <Route path="/activate" render={props => <Active toast={toast} login={this.loginHandler} {...props} />} />
                  <Route path="/forget/password" render={props =>
                    <GetPassword
                      toast={toast}
                      getPass={this.forgetPassHandler}
                      checkCode={this.checkCodeHandler}
                      setPassword={this.setNewPassword}
                      {...props} />} />
                  
                  <Redirect  to='/home'/>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </React.Fragment>
  );
   }
}

export default App;
