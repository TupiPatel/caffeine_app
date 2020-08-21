import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { result } from 'lodash'

class Order extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {},
      allFav:[],
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      loggedIn: (localStorage.getItem('loggedIn') === "true"),

      errors : [],
      valuesDrink: [
        { name: 'Monster Ultra Sunrise', id: 1 },
        { name: 'Black Coffee', id: 2 },
        { name: 'Americano', id: 3 },
        { name: 'Sugar Free NOS', id: 4 },
        { name: '5 Hour Energy', id: 5 }
      ],
      drink:'',
      valuesSize: [
        { name: 'Small (75mg Caffeine)', id: 1 },
        { name: 'Medium (130mg Caffeine)', id: 2 },
        { name: 'Large (200mg Caffeine)', id: 3 }
      ],
      size:'',
      drinkName : '',
      drinkSize : '',
      caffeine : '',
      max_caffeine : '',
     arrCaffeine:[],
     totalCaffeine:0,
      status:''

    }

    if(localStorage.getItem('userId') === null){
      this.props.history.push('/');
    }
   
  
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewOrder = this.handleCreateNewOrder.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    
  }

  handleFieldChange (event) {
    this.setState({
            [event.target.name]: event.target.value
        })
  }

  handleCreateNewOrder (event) {
    event.preventDefault()

    const { history } = this.props
    const custId = this.props.match.params.id
    this.state.arrCaffeine = []
    this.state.errors = []

  

    console.log("enterd")
    console.log(this.state.drink)
    console.log(this.state.size)
   
    if(this.state.drink == 1)
        this.state.drinkName= 'Monster Ultra Sunrise'
    else if(this.state.drink == 2)
        this.state.drinkName='Black Coffee'
    else if(this.state.drink == 3)
        this.state.drinkName='Americano'
    else if(this.state.drink == 4)
        this.state.drinkName='Sugar Free NOS'
    else  if(this.state.drink == 5)
        this.state.drinkName='5 Hour Energy'
    else
        this.state.drinkName = ''

    if(this.state.size == 1)
    {
        this.state.drinkSize = 'small'
        this.state.caffeine = '75'
    }
    else if(this.state.size == 2)
    {
        this.state.drinkSize = 'medium'
        this.state.caffeine = '130'
    }
    else if(this.state.size == 3)
    {
        this.state.drinkSize = 'large'
        this.state.caffeine = '200'
    }
    else{
      this.state.drinkSize = ''
      this.state.caffeine = ''
    }
   


    const order = {
      custId : custId,
      drink : this.state.drinkName,
      size : this.state.drinkSize,
      caffeine : this.state.caffeine
      
    }

    axios.get(`/api/customer/${custId}`).then(response => {
      console.log("customer info")
      console.log(response.data);
      this.setState({
        user: response.data,
        allFav:response.data.beverages.split(','),
        max_caffeine: response.data.max_consumed
      })
    })

      axios.post('/api/order', order)
      .then(response => {
        // redirect to the homepage
        console.log(response.data)

        axios.get(`/api/customer/transaction/${custId}`).then(response => {
          console.log("customer info")
          console.log(this.state.max_caffeine)
          console.log(response.data);
  
          const list = response.data.map((item) => {
            console.log(item.caffeine)
            this.state.arrCaffeine.push(parseInt(item.caffeine))
          })
  
          this.state.totalCaffeine =  this.state.arrCaffeine.reduce((result,number)=> result+number);
  
          console.log(this.state.totalCaffeine) // 15
  
          if(this.state.max_caffeine < this.state.totalCaffeine){
            this.setState({
              status : 'You exceed your daily limit of caffeine'
            })
          }
          else{
            this.setState({
              status : 'You can consume more caffeine as your maximum limit of caffeine'
            })
           
          }
        })
       
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
      
      let optionDrink = this.state.valuesDrink.map((v,key) => (
         
        <option key={key} value={v.id}>{v.name}</option>
      ));
      let optionSize = this.state.valuesSize.map((v,key) => (
        
        <option key={key} value={v.id}>{v.name}</option>
      ));

     
        return (
          
            <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                    
                    <div className='card-header'>Hi ,{this.state.userName} </div>
                    <div className="card-body">
                        <div>Please place your order..</div>
                        <div>{this.state.status}</div>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.handleCreateNewOrder}>
                        <div className='form-group'>
                            <label>
                            <b> Pick your favorite drink :</b>
                            </label>
                            <select 
                                id="drink"
                                name ="drink"
                                value={this.state.value}
                                className={`form-control ${this.hasErrorFor('drink') ? 'is-invalid' : ''}`}
                                onChange={this.handleFieldChange}
                             >
                            <option value='0'>-- Select drink --</option>
                            {optionDrink}
                            </select>
                            {this.renderErrorFor('drink')}
                        </div>
                            <div className='form-group'>
                                <label htmlFor='size'><b>Size : </b></label>
                                <select 
                                    id="size"
                                    name ="size"
                                    value={this.state.value}
                                    className={`form-control ${this.hasErrorFor('size') ? 'is-invalid' : ''}`}
                                    onChange={this.handleFieldChange}
                                >
                                <option value='0'>-- Select size --</option>
                                {optionSize}
                                </select>
                                {this.renderErrorFor('size')}
                            </div>
                            <button className='btn btn-primary'>Checkout</button>
                        </form>
                    </div>
                   
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Order