import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Welcome extends Component {

    render () {
        return (
            <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Welcome</div>
                </div>
                </div>
            </div>
            </div>
        )
        }
}

export default Welcome