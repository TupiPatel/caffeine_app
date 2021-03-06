import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { withRouter} from 'react-router-dom';
import { Redirect} from 'react-router-dom';
import Header from './Header'
import Login from './Login'
import Register from './Register'
import Welcome from './Welcome'
import Order from './Order'

class App extends Component {
 


  render () {
 
    
    return (
      <BrowserRouter  >
        <div>
         
          <Switch>
                <Route exact path='/' component={Login}  />
                <Route exact path='/register' component={Register} />
                <Route exact path='/welcome/:id' component={Welcome} />
                <Route exact path='/order/:id' component={Order} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
//export default withRouter(App);
ReactDOM.render(<App />, document.getElementById('app'))