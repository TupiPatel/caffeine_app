
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

  /*  const Header = () => (
      <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>Caffeine App</Link>
          <Link className='navbar-brand' to='/logout'>Logout</Link>
   
        </div>
      </nav>
    )*/
    class Header extends Component {
      constructor (props) {
        super(props)
        this.state={
          custId : localStorage.getItem('userId')
        }
        
      this.logout = this.logout.bind(this)
      }
      
      logout(){
        const { history } = this.props
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        history.push("/")
      
      }
      componentDidMount () {
    
      }
      
      render() {
        const isLoggedIn = this.state.custId;
        let link1,link2,link3;
        if (isLoggedIn != null) {
          link1 =  <Link className='navbar-brand' to={`/welcome/${this.state.custId}`} >Home</Link>
          link2 = <Link className='navbar-brand' to={`/order/${this.state.custId}`}>Order</Link>
          link3 = <button type='button' onClick={this.logout}>Log Out</button>
        } else {
          
        }
          return (

            <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
            <div className='container'>
              <Link className='navbar-brand' to='/'>Caffeine App</Link>
              
              {link1}
              {link2}
              {link3}
            </div>
          </nav>
              
          )
      }
}

export default withRouter(Header)