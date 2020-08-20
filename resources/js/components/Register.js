import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import checkboxes from './checkboxes';
import Checkbox from './Checkbox';

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname:'',
      lastname:'',
      email: '',
      passwd: '',
      confirm_passwd:'',
      checkedItems: new Map(),
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

  }

  handleFieldChange (event) {


    this.setState(
        {
            [event.target.name]: event.target.value
        }
           
    )
    
  }

  handleCreateNewProject (event) {
    event.preventDefault()

    const { history } = this.props

    console.log(this.state.checkedItems)

    /** let arr = [];
    for (var key in this.state) {
      if(this.state[key] === true) {
        arr.push(key);
      }
    }
    let data = {
      check: arr.toString() 
    }; */


    const user = {
      firstname : this.state.firstname,
      lastname : this.state.lastname,
      email: this.state.email,
      passwd: this.state.passwd,
      confirm_passwd: this.state.confirm_passwd,
      beverages : this.state.checkedItems
    }

   
    axios.post('/api/register', user)
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
  handleCheckboxChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const bodyFormData = new FormData();


    
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item,isChecked) }));
   // console.log(this.state.checkedItems)

   
  }

  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Registration</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewProject}>
                 <div className='form-group'>
                        <label htmlFor='firstname'><b>Firstname : </b></label>
                        <input
                        id='firstname'
                        type='text'
                        className={`form-control ${this.hasErrorFor('firstname') ? 'is-invalid' : ''}`}
                        name='firstname'
                        value={this.state.firstname}
                        onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('firstname')}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='lastname'><b>Lastname : </b></label>
                        <input
                        id='lastname'
                        type='text'
                        className={`form-control ${this.hasErrorFor('lastname') ? 'is-invalid' : ''}`}
                        name='lastname'
                        value={this.state.lastname}
                        onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('lastname')}
                    </div>
                  <div className='form-group'>
                    <label htmlFor='email'><b> Email : </b></label>
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
                    <label htmlFor='passwd'><b>Password : </b></label>
                    <input
                      id='passwd'
                      type='password'
                      className={`form-control ${this.hasErrorFor('passwd') ? 'is-invalid' : ''}`}
                      name='passwd'
                      value={this.state.passwd}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('passwd')}
                  </div>
                  <div className='form-group'>
                        <label htmlFor='confirm_passwd'><b> Confirm Password : </b></label>
                        <input
                        id='confirm_passwd'
                        type='password'
                        className={`form-control ${this.hasErrorFor('confirm_passwd') ? 'is-invalid' : ''}`}
                        name='confirm_passwd'
                        value={this.state.confirm_passwd}
                        onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('confirm_passwd')}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='beverages'><b> Select Beverages : </b></label>
                        <React.Fragment>
                            {
                            checkboxes.map(item => (
                                <div key={item.key}>
                                <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleCheckboxChange} /> {item.name}
                                </div>
                            ))
                            }
                        </React.Fragment>
                          </div>
                  <button className='btn btn-primary'>Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Register