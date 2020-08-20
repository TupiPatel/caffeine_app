import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreateNewProject (event) {
    event.preventDefault()

    const { history } = this.props

    const project = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('/api/login', project)
      .then(response => {
        // redirect to the homepage
        console.log(response)
        history.push('/')
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
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Login</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewProject}>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
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
                    <label htmlFor='password'>Password</label>
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
                  <button className='btn btn-primary'>Login</button>
                  <Link  to='/register'>Create new account</Link>
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