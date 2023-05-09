import React, { useState, useEffect } from 'react'
import axios from './axios/AxiosSetup'
import Loading from './utils/Loading';
import { Link } from 'react-router-dom';

export default function SavedProducts() {
    const [products, setProducts] = useState([]);
    const [fetchComleted, setFetchCompleted] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`wishlist/`)
                console.log(response.data)
                setProducts([...products, ...response.data]);
            } catch (error) {
                console.log(error)
            }
            setFetchCompleted(true);
        }

        fetchSearchResults();

    }, [])

    return (
        <div>
            {products.length === 0 && !fetchComleted && <Loading />}
            {products.length === 0 && fetchComleted && <div className='my-20 md:my-40'>
                <p className='small-headings'>You have no saved products.</p>
                <div className='m-10 text-center'>
                    <Link to={{ pathname: '/' }}><button className='my-btns'>Continue Shopping</button></Link>
                </div>
            </div>}
            {products.length !== 0 && <div className='my-10'>
                <p className='normal-headings'>My Saved Products</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
                    {products.map((product) => (
                        <Link to={{ pathname: `/product/${product.product.slug}` }}>
                            <div key={product.product.id} className='each-item'>
                                <div className='flex justify-center'>
                                    <img className='each-image' src={`http://127.0.0.1:8000${product.product.intro_image}`}></img>
                                </div>
                                <p className='small-headings'>{product.product.name}</p>

                                {product.product.discount_price && product.product.regular_price &&
                                    <div className='flex justify-center items-center'>
                                        <p className='cut-price mx-1'>TK {product.product.regular_price}</p>
                                        <p className='discount_price mx-1'>TK {product.product.discount_price}</p>
                                    </div>}

                                {!product.product.discount_price &&
                                    <div className='price'>
                                        <p>TK {product.product.regular_price}</p>
                                    </div>}
                            </div>
                        </Link>
                    ))}
                </div>

            </div>}
        </div>
    )
}
