import React, { useEffect, useContext, useState } from 'react'
import axios from '../axios/AxiosSetup'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

export default function TopSales() {
    const [products, setProducts] = useState([])

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 800;
    };

    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 800;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('get_top_products/')
                setProducts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts();
    }, [])

    console.log(products)
    return (
        <div className='mt-10 md:mt-20'>
            <p className='normal-headings'>Our Top Sales</p>
            <div className='relative flex items-center z-10'>
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
                <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {products.map((item) => (
                        <div key={item.id} className='relative inline-block p-2 z-10'>
                            <Link to={{ pathname: `/product/${item.slug}` }}>
                                <img
                                    className='w-[320px] md:w-[420px] h-[320px] md:h-[420px] object-cover cursor-pointer ease-in-out duration-300'
                                    src={`http://127.0.0.1:8000${item.intro_image}`}
                                    alt='/'
                                    style={{ borderRadius: '20px' }}
                                />
                                <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 text-white text-center opacity-0 hover:opacity-100 transition-opacity rounded-[20px]'>
                                    <div>
                                        <h2 className='text-lg font-bold'>{item.name}</h2>
                                        {item.total_reviews > 0 &&
                                            <div className='flex justify-center items-center'>
                                                <StarRatings starRatedColor="orange" starDimension="25px" starSpacing="0px" rating={item.avg_rating} />
                                                <p className='normal-text text-lg ml-2'>({item.total_reviews})</p>
                                            </div>}
                                        {item.stock > 0 && <p className='success-text text-lg'>In Stock</p>}
                                        {item.stock <= 0 && <p className='error-text text-lg'>Out of Stock</p>}
                                        {item.stock > 0 && <p className='alert-text'>Only {item.stock} left. Order Now!</p>}

                                        {item.discount_price && item.regular_price &&
                                            <div className='flex justify-center items-center'>
                                                <p className='cut-price mx-1'>TK {item.regular_price}</p>
                                                <p className='discount_price mx-1'>TK {item.discount_price}</p>
                                            </div>}
                                        {!item.discount_price &&
                                            <div className='price'>
                                                <p>TK {item.regular_price}</p>
                                            </div>}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
            </div>
        </div>
    )
}
