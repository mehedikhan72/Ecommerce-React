import React from 'react'
import { Link } from 'react-router-dom'

export default function NoProductError() {
  return (
    <div className='m-20'>
      <div className='flex flex-col justify-center items-center'>
        <p className='error-text text-center w-3/4 m-10 p-5'>Oops! You didn't select any product yet!</p>
        <Link to={{ pathname: '/' }}><button className='my-btns sm:my-big-btns'>Continue Shopping</button></Link>
      </div>
    </div>
  )
}
