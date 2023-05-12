import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from './axios/AxiosSetup'
import CategoryOptions from './CategoryOptions';
import Loading from './utils/Loading';
import Custom404 from './utils/Custom404';
import StarRatings from 'react-star-ratings';


export default function ProductList() {
    const { category } = useParams();
    const [products, setProducts] = useState([])
    const [fetchComleted, setFetchCompleted] = useState(false);
    const [page, setPage] = useState(1);
    const [maxData, setMaxData] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            } catch (error) {
                console.log(error)
                setFetchCompleted(true)
                setLoading(false);
            }
        }
        fetchProducts();
        setPage(1);
        setLoading(true);
    }, [category])


    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await axios.get(`category/${category}?page=${page}`)
                setProducts([...products, ...response.data.results]);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setFetchCompleted(true)
                setLoading(false);
            }
        }
        setLoading(true);
        fetchNewProducts();
    }, [page])

    const seeMoreClicked = () => {
        setPage(page + 1);
    }

    return (
        <div>
            <CategoryOptions />
            {loading && <Loading />}
            {products.length === 0 && fetchComleted && <Custom404 />}
            {products.length !== 0 && <div>
                <p className='normal-headings mt-5'>Get some of the latest {category} from Halal Brothers!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
                    {products.map((product) => (
                        <Link to={{ pathname: `/product/${product.slug}` }}>
                            <div key={product.id} className='each-item relative '>
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
                {products.length < maxData && <div className='m-10 text-center'>
                    <button onClick={seeMoreClicked} className='my-btns'>See more...</button>
                </div>}
            </div>}
        </div>
    )
}
