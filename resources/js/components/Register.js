import axios from 'axios'
import React, { Component }  from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import checkboxes from './checkboxes';
import Checkbox from './Checkbox';
import Header from './Header'


class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname:'',
      lastname:'',
      email: '',
      password: '',
      password_confirmation:'',
      checkedItems: new Map(),
      setCheckedItems :  [],
      max_consumed: '',
      selectedOption: 'Male',
      errMsg :'',
      errors: []
    }


    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);

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

    //console.log("radio : "+this.state.selectedOption)


    for (let pair of this.state.checkedItems) {
      console.log(pair);
      this.state.setCheckedItems.push(pair)
    }

    const user = {
      firstname : this.state.firstname,
      lastname : this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      beverages : this.state.setCheckedItems,
      max_consumed : this.state.max_consumed,
      gender : this.state.selectedOption
    }

   
    axios.post('/api/register', user)
      .then(response => {
        // redirect to the homepage
        console.log(response.data)

        if(response.data == 'exist'){
          this.setState({ errMsg : "User is already exist"})
          
        }
        else{
          history.push('/')
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
  handleCheckboxChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item,isChecked) }));
    
    //console.log( this.state.checkedItems);
   
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });

    console.log(this.state.selectedOption)
  }

  render () {
    return (
      <div className='container py-4'>
              <Header  />

        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
            
              <div className='card-header display-6'><b>Registration</b></div>
              <div className="text-danger p-3"><b>{this.state.errMsg}</b></div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewProject}>
                 <div className='form-group'>
                        <label htmlFor='firstname'><b>First Name : </b></label>
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
                        <label htmlFor='lastname'><b>Last Name : </b></label>
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
                    <label htmlFor='password'><b>Password : </b></label>
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
                  <div className='form-group'>
                        <label htmlFor='password_confirmation'><b> Confirm Password : </b></label>
                        <input
                        id='password_confirmation'
                        type='password'
                        className={`form-control ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`}
                        name='password_confirmation'
                        value={this.state.confirm_passwd}
                        onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('password_confirmation')}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='beverages'><b> Select Beverages : </b></label>
                        <React.Fragment>
                            {
                            checkboxes.map(item => (
                                <div key={item.key}>
                                <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleCheckboxChange} /> {item.label}
                                
                                </div>
                            ))
                            }
                        </React.Fragment>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='max_consumed'><b>Maximum Caffeine Consume Per Day : </b></label>
                        <input
                        id='max_consumed'
                        type='text'
                        className={`form-control ${this.hasErrorFor('max_consumed') ? 'is-invalid' : ''}`}
                        name='max_consumed'
                        value={this.state.max_consumed}
                        onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('max_consumed')}
                    </div>
                      <div className='form-group'>
                        <label htmlFor='gender'><b> Gender : </b></label>
                          <div>
                              <label style={{ marginLeft: '15px' }} >
                                  <input
                                  type="radio"
                                  value="Male"
                                  checked={this.state.selectedOption === "Male"}
                                  onChange={this.onValueChange}
                                  style={{ marginRight: '10px' }}
                                  />
                                  Male
                              </label>
                              <label style={{ marginLeft: '15px' }}>
                                  <input
                                  type="radio"
                                  value="Female"
                                  checked={this.state.selectedOption === "Female"}
                                  onChange={this.onValueChange}
                                  style={{ marginRight: '10px' }}
                                  />
                                  Female
                              </label>
                              <label style={{ marginLeft: '15px' }}>
                                  <input
                                  type="radio"
                                  value="Other"
                                  checked={this.state.selectedOption === "Other"}
                                  onChange={this.onValueChange}
                                  style={{ marginRight: '10px' }}
                                  />
                                  Other
                            </label>
                        </div>
                       
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