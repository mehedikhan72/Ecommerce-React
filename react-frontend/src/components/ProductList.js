import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from './axios/AxiosSetup'
import CategoryOptions from './CategoryOptions';


export default function ProductList() {
    const { category } = useParams();
    const [products, setProducts] = useState([])

    // Fetch using axios
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`category/${category}/`)
                console.log(response)
                setProducts(response.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts();
    }, [category])

    // const url = `http://127.0.0.1:8000/api/category/${category}/`
    // useEffect(() => {
    //     fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             setProducts(data.results)
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         })
    // }, [])

    return (
        <div>
            <CategoryOptions />
            <p className='normal-headings mt-5'>Get some of the latest {category} from Halal Brothers!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
                {products.map((product) => (
                    <div key={product.id} className='each-item'>
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
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
