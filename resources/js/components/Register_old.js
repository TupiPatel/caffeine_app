import axios from 'axios'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import checkboxes from './checkboxes';
import Checkbox from './Checkbox';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
        //  firstname : '',
        //  lastname: '',
          email: '',
          passwd: '',
        //  confirm_passwd: '',
          /*checkedItems: new Map(),
          max_consumed: '',
          selectedOption: '',
          gender : '',*/
          errors: []
        }
    
       // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
      //  this.onValueChange = this.onValueChange.bind(this);
      }
    
      

      handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
      handleCreateNewProject (event) {

        event.preventDefault()
    
        const { history } = this.props
    
      /*  const user = {
          firstname : this.state.firstname,
          lastname: this.state.lastname,
          gender : this.state.selectedOption,
          email: this.state.email,
          passwd: this.state.passwd,
          confirm_passwd: this.state.confirm_passwd,
          beverages: this.state.checkedItems,
          max_consumed: this.state.max_consumed,
     
        }*/
        const project = {
          email: this.state.email,
          passwd: this.state.passwd
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

    /*  onValueChange(event) {
        this.setState({
          selectedOption: event.target.value
        });

        console.log(this.state.selectedOption)
      }

      handleCheckboxChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item,isChecked) }));
        console.log(this.state.checkedItems)
      }*/

      
    render () {
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Registration</div>
                  <div className='card-body'>
                  <form onSubmit={this.handleCreateNewUser}>
                   {/*} <div className='form-group'>
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
        */}
                    <div className='form-group'>
                        <label htmlFor='email'><b>Email : </b></label>
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
                   {/*    <div className='form-group'>
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
                 <div>
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
                      <div className='form-group'>
                        <label htmlFor='max_consumed'><b>Maximum caffeine consume per day : </b></label>
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
                    <div>
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
                        Selected option is : {this.state.selectedOption}
                    </div>*/}
                    
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