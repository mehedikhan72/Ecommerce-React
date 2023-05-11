import React from 'react'
import { Link } from 'react-router-dom'
export default function ProductCategories() {
    return (
        <div className='mt-10 md:mt-20'>
            <p className='normal-headings'>Product Categories</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
                <Link to={{ pathname: '/category/shirts' }}>
                    <div className='each-item h-[450px]'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://m.media-amazon.com/images/I/51ShA+Li1GS._AC_.jpg"></img>
                        </div>
                        <p className='small-headings'>Shirts</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/pants' }}>
                    <div className='each-item h-[450px]'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://cdn.shopify.com/s/files/1/0625/6659/6779/collections/jeans-pants-109020.jpg?v=1661607175&width=1024"></img>
                        </div>
                        <p className='small-headings'>Pants</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/panjabi' }}>
                    <div className='each-item h-[450px]'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://i.pinimg.com/originals/d2/6b/50/d26b50db9f7542741756a306fb65a021.jpg"></img>
                        </div>
                        <p className='small-headings'>Panjabi</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/shoes' }}>
                    <div className='each-item h-[450px]'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/17692598/2022/6/23/1c86bb76-ad56-4958-a90d-897e402120081655974319079ElPasoWomenBlackSolidLightweightSneakers1.jpg"></img>
                        </div>
                        <p className='small-headings'>Shoes</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/jackets' }}>
                    <div className='each-item h-[450px]'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://i.ebayimg.com/images/g/mWYAAOSwmjxftmdT/s-l1600.jpg"></img>
                        </div>
                        <p className='small-headings'>Jackets</p>
                    </div>
                </Link>
                <Link to={{ pathname: '/category/accessories' }}>
                    <div className='each-item h-[450px]'>
                        <div className='flex justify-center'>
                            <img className='each-image' src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/452215/sub/goods_452215_sub24.jpg?width=750"></img>
                        </div><p className='small-headings'>Accessories</p>
                    </div>
                </Link>
            </div>

        </div>
    )
}
