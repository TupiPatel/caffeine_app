import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import Welcome from './Welcome'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/welcome' component={Welcome} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))