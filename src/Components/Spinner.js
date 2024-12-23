import React, { Component } from 'react'
import loading from '../Loader/loading.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={loading} alt='loader'></img>
      </div>
    )
  }
}

export default Spinner
