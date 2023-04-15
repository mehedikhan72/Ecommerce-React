import React from 'react'
import { Link } from 'react-router-dom'
export default function ProductCategories() {
    return (
        <div>
            <p className='normal-headings'>Product Categories</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
                <Link to={{ pathname: '/category/shirts' }}>
                    <div className='each-item'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://www.picknpayclothing.co.za/pub/media/catalog/product/cache/703330dce2423b988bd647d4920a16c3/9/0/907958002_Front.jpg"></img>
                        </div>
                        <p className='small-headings'>Shirts</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/pants' }}>
                    <div className='each-item'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://www.decathlon.com.bd/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/5/8549765.jpg"></img>
                        </div>
                        <p className='small-headings'>Pants</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/panjabi' }}>
                    <div className='each-item'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://www.toptenmartltd.com/wp-content/uploads/2023/03/panjabi3.jpg"></img>
                        </div>
                        <p className='small-headings'>Panjabi</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/shoes' }}>
                    <div className='each-item'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://ae01.alicdn.com/kf/HTB1oq.eaN2rK1RkSnhJq6ykdpXaz.jpg"></img>
                        </div>
                        <p className='small-headings'>Shoes</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/jackets' }}>
                    <div className='each-item'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://cdn.shopify.com/s/files/1/0500/6478/5558/products/5230209000HoodedJacketNimitz2Black01small.jpg?v=1675767363"></img>
                        </div>
                        <p className='small-headings'>Jackets</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/accessories' }}>
                    <div className='each-item'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://cdn.shopify.com/s/files/1/0260/1439/products/365Neoprene_Dakota_Onyx_S_3_4_1024x1024.jpg?v=1678315421"></img>
                        </div><p className='small-headings'>Accessories</p>
                    </div>
                </Link>
            </div>

        </div>
    )
}
