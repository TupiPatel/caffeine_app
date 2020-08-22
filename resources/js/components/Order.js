import axios from 'axios'
import React, { Component } from 'react'
import Header from './Header'


class Order extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {},
      allFav:[],
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName').toUpperCase(),
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
      status:'',
      showHideForm : true,
      showHideInfo : false
    }

    if(localStorage.getItem('userId') === null){
      this.props.history.push('/');
    }
   
  
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleOrderData = this.handleOrderData.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.handleCreateNewOrder = this.handleCreateNewOrder.bind(this)
    this.handleBack = this.handleBack.bind(this)
    
  }

  handleFieldChange (event) {
    this.setState({
            [event.target.name]: event.target.value
        })
  }
  handleBack(){
   
    const { showHideForm} = this.state;
    const { showHideInfo} = this.state;

    this.setState({
      showHideForm:!showHideForm,
      showHideInfo:!showHideInfo

    })
    
  }

  handleOrderData (event) {
    event.preventDefault()

    const custId = this.props.match.params.id
    this.state.arrCaffeine = []
    this.state.errors = []
    const { showHideForm} = this.state;
    const { showHideInfo} = this.state;
   
   
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
   
    if(this.state.drink == ''){
      this.setState({
        showHideForm:showHideForm,
        showHideInfo:showHideInfo
  
      })
     
     this.setState({
       errDrink : "The drink is required",
       errSize : ''
     })
    }
   else if(this.state.size == ''){
      this.setState({
        showHideForm:showHideForm,
        showHideInfo:showHideInfo
  
      })
     
     this.setState({
       errSize : "The size is required",
       errDrink : "",

     })
    }

  else{
    this.setState({
      drinkType: this.state.drinkName,
      sizeType: this.state.drinkSize,
    })
    

    axios.get(`/api/customer/${custId}`).then(response => {
      console.log("customer info")
      console.log(response.data);
      this.setState({
        max_caffeine: response.data.max_consumed
      })
    })


    axios.get(`/api/customer/transaction/${custId}`,"dfd").then(response => {
      console.log("transaction info")
      
      console.log(response.data);

      const list = response.data.map((item) => {
 
        this.state.arrCaffeine.push(parseInt(item.caffeine))
      })
      this.state.arrCaffeine.push(parseInt(this.state.caffeine))

      this.state.totalCaffeine =  this.state.arrCaffeine.reduce((result,number)=> result+number);

      console.log("current caffeine")
      console.log(this.state.totalCaffeine)

      if(this.state.max_caffeine < this.state.totalCaffeine){
        this.setState({
          status : 'You exceed your daily limit of caffeine which is '+this.state.totalCaffeine+'mg',
          showHideForm:!showHideForm,
          showHideInfo:!showHideInfo
        })
      }
      else{
        this.setState({
          status : 'You can consume more caffeine as your maximum limit of caffeine is '+this.state.max_caffeine +'mg',
          showHideForm:!showHideForm,
          showHideInfo:!showHideInfo

        })
       
      }

     
      
    })
    .catch(error => {
        console.log(error.response.data)
        this.setState({
          errors: error.response.data.errors
      
        })
      })
    }
    
  }
  handleCreateNewOrder(){
    console.log("new order")
      console.log(this.state.drinkSize)
      const custId = this.props.match.params.id

      const order = {
        custId : custId,
        drink : this.state.drinkName,
        size : this.state.drinkSize,
        caffeine : this.state.caffeine
        
      }

      axios.post('/api/order', order)
      .then(response => {
        // redirect to the homepage
        console.log('order info')
        console.log(response.data)
        
        this.setState({
          sucess : "Your order received sucessfully !!"
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
      const { showHideForm} = this.state;
      const { showHideInfo} = this.state;
     
        return (
          
            <div className='container py-4'>
              <Header  />

            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                    
                    <div className='card-header'>Hi ,{this.state.userName} </div>
                    <div className="card-body">
                        
                        { showHideInfo && (
                          <div>
                            <div className="text-success p-2"><b style={{ fontSize: '18px' }}>{this.state.sucess}</b></div>
                            <div className="mb-3"><b>Here is your order...</b></div>
                              <label className="mb-3">{this.state.status}</label>

                              <div>
                                  <div className='card'>
                                      <div className='card-header'><b>Order Description </b> </div>
                                      <div className="card-body">
                                        <div>Type of drink : {this.state.drinkType}</div>
                                        <div>Size: {this.state.sizeType}</div>
                                        <div>Daily maximum limit of caffeine: {this.state.max_caffeine}mg</div>
                                        <div>Today's total caffeine: {this.state.totalCaffeine}mg</div>
                                      </div>
                                  </div>
                              </div>
                             
                              <button className='btn btn-primary float-left mt-4' onClick={this.handleBack}>Go back</button>
                              <button className='btn btn-primary float-right mt-4' onClick={this.handleCreateNewOrder}>Checkout</button>
                          </div>
                        )}
                    </div>

                    { showHideForm && (
                      
                    <div className='card-body'>
                      <div className="mb-3"><b>Please place your order..</b></div>
                      <form onSubmit={this.handleOrderData}>
                    
                        <div>
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
                                    required
                                >
                                <option value='0'>-- Select drink --</option>
                                {optionDrink}
                                </select>
                                <div className="text-danger">{this.state.errDrink}</div>
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
                                    required

                                >
                                <option value='0'>-- Select size --</option>
                                {optionSize}
                                </select>
                                <div className="text-danger">{this.state.errSize}</div>

                                {this.renderErrorFor('size')}
                            </div>
                            </div>
                            
                            <button className='btn btn-primary float-right'>Next</button>
                           
                        </form>
                       
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Order