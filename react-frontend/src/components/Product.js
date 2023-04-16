import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from './axios/AxiosSetup'
import GetImages from './GetImages';
import CategoryOptions from './CategoryOptions';
import SimilarProducts from './SimilarProducts';
import Size from './ProductPage/Size';
import Quantity from './ProductPage/Quantity';

export default function Product() {

  const { slug } = useParams();
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`product/${slug}/`)
        setProductId(response.data.id)
        setProductData(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct();

  }, [slug, productId])

  return (
    <div>
      <CategoryOptions />
      {productData && productId && <div>
        <div className='my-5 grid grid-cols-1 lg:grid-cols-2'>
          {/* IMAGES */}
          <div>
            <GetImages productId={productId} />
          </div>

          {/* OTHER DATA */}
          <div>
            <p className='text-3xl sm:text-4xl font-bold mx-10 my-5 lg:mx-20 text-left'>{productData.name}</p>
            {productData.stock > 0 &&
              <div>
                <div className='text-1xl sm:text-2xl font-bold mx-10 my-5 lg:mx-20 text-left flex items-center'>
                  <p>Availability : </p> <p className='success-text'>In stock</p>
                </div>
                <div>
                  <p className='alert-text text-center mx-10 lg:mx-20 w-[250px]'>Only {productData.stock} left. Hurry up!</p>
                </div>
              </div>}

            {productData.stock <= 0 &&
              <div className='text-1xl sm:text-2xl font-bold mx-10 my-5 lg:mx-20 text-left flex items-center'>
                <p>Availability : </p> <p className='error-text'>Out of stock</p>
              </div>}

            {productData.discount_price && productData.regular_price &&
              <div className='flex items-center mx-10 my-5 lg:mx-20'>
                <p className='cut-price text-2xl lg:text-4xl mr-2'>TK {productData.regular_price} </p>
                <p className='discount_price text-2xl lg:text-4xl ml-2'> TK {productData.discount_price}</p>
              </div>}
            {!productData.discount_price &&
              <div className='price mx-10 my-5 lg:mx-20 text-left'>
                <p className='text-4xl'>TK {productData.regular_price}</p>
              </div>}

            <Size productId={productId} />
            <Quantity />
            <div className='flex  mx-10 my-5 lg:mx-20 items-center'>
              <button className='my-btns mr-2 w-[150px]'>Add To Cart</button>
              <button className='my-btns ml-2 w-[150px]'>Buy Now</button>

            </div>
          </div>
        </div>
        <div className='my-20'>
          <p className='normal-headings'>Product Description</p>
          <p className='small-headings'>{productData.description}</p>
        </div>
        <SimilarProducts slug={productData.category.slug} />

      </div>}

      {/* TODO: Add loading component later */}
      {!productData || !productId && <p>Loading</p>}

    </div>
  )
}
