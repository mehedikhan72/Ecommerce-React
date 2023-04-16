import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoryOptions() {
    return (
        <div className='flex justify-center items-center'>
            <div className='grid grid-cols-3 lg:grid-cols-6'>
                <Link to={{ pathname: '/category/shirts' }}><p className='links-1'>Shirts</p></Link>
                <Link to={{ pathname: '/category/pants' }}><p className='links-1'>Pants</p></Link>
                <Link to={{ pathname: '/category/panjabi' }}><p className='links-1'>Panjabi</p></Link>
                <Link to={{ pathname: '/category/shoes' }}><p className='links-1'>Shoes</p></Link>
                <Link to={{ pathname: '/category/jackets' }}><p className='links-1'>Jackets</p></Link>
                <Link to={{ pathname: '/category/accessories' }}><p className='links-1'>Accessories</p></Link>
            </div>
        </div>
    )
}
