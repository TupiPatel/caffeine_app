import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'


class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errMsg :'',
      validUserMsg : localStorage.getItem('Register'),
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)

    const { history } = this.props

    if(localStorage.getItem('loggedIn') === 'true' ){
      history.push('/welcome/'+localStorage.getItem('userId'))
    }
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin (event) {
    event.preventDefault()

    const { history } = this.props

    const project = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('/api/login', project)
      .then(response => {
        // redirect to the homepage
        console.log(response.data)
 
        if(response.data['message'] == 'sucess'){
          localStorage.setItem('userId', response.data['id']);
          localStorage.setItem('userName', response.data['firstname']);
          localStorage.setItem('loggedIn', "true");
          localStorage.removeItem("Register");
          history.push('/welcome/'+response.data['id'])
        }
        else{
          this.setState({ errMsg : "Invalid Email or Password"})
        }
       
      })
      .catch(error => {
        console.log(error.response.data)
        this.setState({
          errors: error.response.data.errors
      
        })
   
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render () {
    return (
      <div className='container py-4'>
              <Header  />

        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
           
              <div className='card-header'><b>Login</b></div>
              <div className="text-danger p-3"> <b> {this.state.errMsg} </b></div>

              <div className="text-success p-2"><b style={{ fontSize: '18px' }}>{this.state.validUserMsg}</b></div>

              <div className='card-body'>
                <form onSubmit={this.handleLogin}>
                  <div className='form-group'>
                    <label htmlFor='email'><b>Email</b></label>
                    <input
                      id='email'
                      type='text'
                      className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                      name='email'
                      value={this.state.email}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('email')}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'><b>Password </b></label>
                    <input
                      id='password'
                      type='password'
                      className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                      name='password'
                      value={this.state.passwd}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('password')}
                  </div>
                  <div className="float-left"><button className='btn btn-primary '>Login</button></div>
                  <div className="float-right"><Link  to='/register'>Create new account</Link></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Login