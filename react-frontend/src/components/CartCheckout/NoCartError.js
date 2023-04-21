import React from 'react'
import { Link } from 'react-router-dom'

export default function NoCartError() {
    return (
        <div className='m-20'>
            <div className='flex flex-col justify-center items-center'>
                <p className='error-text text-center w-3/4 m-10 p-5'>Oops! Your cart seems to be empty!</p>
                <Link to={{ pathname: '/' }}><button className='my-btns sm:my-big-btns'>Continue Shopping</button></Link>
            </div>
        </div>
    )
}
