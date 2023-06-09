import React, { useState, useEffect } from 'react'
import axios from './axios/AxiosSetup'
import { Link } from 'react-router-dom';
import Loading from './utils/Loading';
import StarRatings from 'react-star-ratings';

export default function NewArrivals() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`new_arrivals/`)
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchProducts();
  }, [])

  return (
    <div>
      {loading && <Loading />}
      {!loading && products.length !== 0 && <div className='mt-10 md:mt-20'>
        <p className='normal-headings'>New Arrivals</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
          {products.map((product) => (
            <Link to={{ pathname: `/product/${product.slug}` }}>
              <div key={product.id} className='each-item relative'>
                <div className='flex justify-center'>
                  <img className='each-image' src={`http://127.0.0.1:8000${product.intro_image}`}></img>
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

                {product.total_reviews > 0 && <div className='flex justify-center items-center m-2'>
                  <StarRatings starRatedColor="orange" starDimension="25px" starSpacing="0px" rating={product.avg_rating} />
                  <p className='normal-text text-lg ml-2'>({product.total_reviews})</p>
                </div>}

                {product.discount_price && <div className='absolute top-[-30px] right-[-30px] rounded-full text-white bg-red-500 h-[70px] w-[70px] flex flex-col justify-center items-center'>
                  <p className='normal-text m-0'>{Math.floor(((product.regular_price - product.discount_price) / product.regular_price) * 100)} %</p>
                  <p className='m-0 p-1 small-headings'>OFF</p>
                </div>}
              </div>
            </Link>
          ))}
        </div>
      </div>}
    </div>
  )
}
