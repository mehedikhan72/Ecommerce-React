import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import axios from '../axios/AxiosSetup'
import Loading from '../utils/Loading';
import { Link } from 'react-router-dom';

export default function SearchResults() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [products, setProducts] = useState([]);
    const [fetchComleted, setFetchCompleted] = useState(false);
    const [page, setPage] = useState(1);
    const [maxData, setMaxData] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(page);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setFetchCompleted(false);
            try {
                const response = await axios.get(`search?query=${query}&page=1`)
                setProducts(response.data.results);
                setMaxData(response.data.count)
                setLoading(false);
                setPage(1);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
            setFetchCompleted(true);
        }

        fetchSearchResults();
    }, [searchParams])

    useEffect(() => {
        const fetchMoreSearchResults = async () => {
            setLoading(true);
            setFetchCompleted(false);
            try {
                const response = await axios.get(`search?query=${query}&page=${page}`)
                setProducts([...products, ...response.data.results]);
                setMaxData(response.data.count)
                setLoading(false);

            } catch (error) {
                console.log(error)
                setLoading(false);
            }
            setFetchCompleted(true);
        }

        if (page != 1) {
            fetchMoreSearchResults();
        }
    }, [page])

    const seeMoreClicked = () => {
        setPage(page + 1);
    }


    return (
        <div>
            {loading && <Loading />}
            {products.length === 0 && fetchComleted && <div>
                <p className='small-headings'>Nothing found...please try some other words.</p>
                <div className='m-10 text-center'>
                    <Link to={{ pathname: '/' }}><button className='my-btns'>Continue Shopping</button></Link>
                </div>
            </div>}

            {products.length !== 0 && <div>
                <p className='normal-headings'>Search Results</p>
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
