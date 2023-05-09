import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Error(props) {
    const [error, setError] = useState(props.error);
    return (
        <div className='flex flex-col justify-center items-center m-5 p-5'>
            <p className='w-3/4 error-text text-center'>{error}</p>
            <Link to={{ pathname: '/cart'}}><button className='my-btns m-5'>Go To Cart</button></Link>
        </div>
    )
}
