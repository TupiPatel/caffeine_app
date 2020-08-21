import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Welcome extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {},
      allFav:[],
      userId: localStorage.getItem('userId'),
      loggedIn: (localStorage.getItem('loggedIn') === "true")
      
    }

    if(localStorage.getItem('userId') === null){
      this.props.history.push('/');
    }
   
    this.logout = this.logout.bind(this)
    this.order = this.order.bind(this)
    
  }

  order(){
    this.props.history.push('/order/'+this.state.userId);
  }
  logout(){
    localStorage.removeItem('loggedIn');
      localStorage.removeItem('userId');
      this.props.history.push('/');
  }

  componentDidMount () {
    const custId = this.props.match.params.id
    

    axios.get(`/api/customer/${custId}`).then(response => {
      //console.log(response.data.beverages.split(','));
      this.setState({
        user: response.data,
        allFav:response.data.beverages.split(',')
      })
    })
  }

    render () {
      const { user } = this.state
      const {allFav} = this.state
        return (
          
            <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                    <label onClick={this.logout}>Logout</label>
                    <div className='card-header'>Welcome,{user.firstname} </div>
                    <div className='card-body'>
                      <div>Your favourite drinks 
                        <div className='card-body'>
                          {allFav.map((el,i) => <li key={i}>{el}</li> )}
                          </div>
                        </div>
                      <div>You can comsume maximum caffeine {user.max_consumed}mg</div>
                      <div> <button className='btn btn-primary' onClick={this.order}>Order Now</button></div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )
        }
}

export default Welcome