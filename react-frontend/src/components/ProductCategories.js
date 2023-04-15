import React from 'react'

export default function ProductCategories() {
    return (
        <div>
            <h1 className='text-3xl sm:text-4xl font-bold text-center m-10'>Product Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
                <div className='category-items'>
                    <img className='category-images' src="https://www.picknpayclothing.co.za/pub/media/catalog/product/cache/703330dce2423b988bd647d4920a16c3/9/0/907958002_Front.jpg"></img>
                    <h1 className='text-2xl font-bold pt-5 text-center'>Shirts</h1>
                </div>
                <div className='category-items'>
                    <img className='category-images' src="https://www.decathlon.com.bd/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/5/8549765.jpg"></img>
                    <h1 className='text-2xl font-bold pt-5 text-center'>Pants</h1>
                </div>
                <div className='category-items'>
                    <img className='category-images' src="https://www.toptenmartltd.com/wp-content/uploads/2023/03/panjabi3.jpg"></img>
                    <h1 className='text-2xl font-bold pt-5 text-center'>Panjabi</h1>
                </div>
                <div className='category-items'>
                    <img className='category-images' src="https://ae01.alicdn.com/kf/HTB1oq.eaN2rK1RkSnhJq6ykdpXaz.jpg"></img>
                    <h1 className='text-2xl font-bold pt-5 text-center'>Shoes</h1>
                </div>
                <div className='category-items'>
                    <img className='category-images' src="https://cdn.shopify.com/s/files/1/0500/6478/5558/products/5230209000HoodedJacketNimitz2Black01small.jpg?v=1675767363"></img>
                    <h1 className='text-2xl font-bold pt-5 text-center'>Jackets</h1>
                </div>
                <div className='category-items'>
                    <img className='category-images' src="https://cdn.shopify.com/s/files/1/0260/1439/products/365Neoprene_Dakota_Onyx_S_3_4_1024x1024.jpg?v=1678315421"></img>
                    <h1 className='text-2xl font-bold pt-5 text-center'>Accessories</h1>
                </div>
            </div>

        </div>
    )
}
