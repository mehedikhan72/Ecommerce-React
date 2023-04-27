import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from './axios/AxiosSetup'
import CategoryOptions from './CategoryOptions';
import Loading from './utils/Loading';
import Custom404 from './utils/Custom404';


export default function ProductList() {
    const { category } = useParams();
    const [products, setProducts] = useState([])
    const [fetchComleted, setFetchCompleted] = useState(false);
    const [page, setPage] = useState(1);
    const [maxData, setMaxData] = useState(null);

    // Fetch using axios
    useEffect(() => {
        const fetchProducts = async () => {
            setProducts([]);
            setFetchCompleted(false);
            try {
                const response = await axios.get(`category/${category}?page=${page}`)
                // setProducts([...products, ...response.data.results]);
                setProducts(response.data.results);
                setMaxData(response.data.count)
                setFetchCompleted(true)
            } catch (error) {
                console.log(error)
                setFetchCompleted(true)
            }
        }
        fetchProducts();
        setPage(1);
    }, [category])


    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await axios.get(`category/${category}?page=${page}`)
                setProducts([...products, ...response.data.results]);
            } catch (error) {
                console.log(error)
                setFetchCompleted(true)
            }
        }
        fetchNewProducts();
    }, [page])

    console.log(category)
    console.log(page);

    const seeMoreClicked = () => {
        setPage(page + 1);
    }

    return (
        <div>
            <CategoryOptions />
            {products.length === 0 && !fetchComleted && <Loading />}
            {products.length === 0 && fetchComleted && <Custom404 />}
            {products.length !== 0 && <div>
                <p className='normal-headings mt-5'>Get some of the latest {category} from Halal Brothers!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
                    {products.map((product) => (
                        <Link to={{ pathname: `/product/${product.slug}` }}>
                            <div key={product.id} className='each-item'>
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
                            </div>
                        </Link>
                    ))}
                </div>
                {products.length < maxData && <div className='m-10 text-center'>
                    <button onClick={seeMoreClicked} className='my-btns'>See more...</button>
                </div>}
            </div>}
        </div>
    )
}
