
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
          custId : ''
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
        this.setState({
          custId1 : localStorage.getItem('userId')
        })
      }
      
      render() {
        const isLoggedIn = this.state.custId1;
        let link1,link2,link3;
        if (isLoggedIn != null) {
          link1 =  <Link className='' to={`/welcome/${this.state.custId1}`} >Home</Link>
          link2 = <Link className='' to={`/order/${this.state.custId1}`}>Order</Link>
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