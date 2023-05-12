//Get 12 similar products.

import React, { useState, useEffect } from 'react'
import axios from './axios/AxiosSetup'
import { Link } from 'react-router-dom'

export default function SimilarProducts(props) {
    const slug = props.slug

    const [products, setProducts] = useState([])

    // Fetch using axios
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`similar_products/${slug}/`)
                console.log(response)
                setProducts(response.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts();
    }, [slug])
    return (
        <div>
            <p className='normal-headings'>Similar Products</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
                {products.map((product) => (
                    <div key={product.id} className='each-item relative'>
                        <Link to={{ pathname: `/product/${product.slug}` }}>
                            <div className='flex justify-center'>
                                <img className='each-image' src={product.intro_image}></img>
                            </div>
                            <p className='small-headings'>{product.name}</p>
                            {product.discount_price && product.regular_price &&
                                <div className='flex justify-center items-center'>
                                    <p className='cut-price mx-1'>TK {product.regular_price}</p>
                                    <p className='discount_price mx-1'>TK {product.discount_price}</p>
                                </div>}
                            {!product.discount_price &&
                                <div className='price'>
                                    <p>TK {product.regular_price}</p>
                                </div>}

                            {product.discount_price && <div className='absolute top-[-30px] right-[-30px] rounded-full text-white bg-red-500 h-[70px] w-[70px] flex flex-col justify-center items-center'>
                                <p className='normal-text m-0'>{Math.floor(((product.regular_price - product.discount_price) / product.regular_price) * 100)} %</p>
                                <p className='m-0 p-1 small-headings'>OFF</p>
                            </div>}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
