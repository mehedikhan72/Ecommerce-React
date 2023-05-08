import React, { useEffect, useState, useContext } from 'react'
import axios from '../axios/AxiosSetup'
import Loading from '../utils/Loading';
import StarRatings from 'react-star-ratings';

export default function GetReviews(props) {
    const slug = props.slug
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(1);
    const [maxData, setMaxData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`get_reviews/${slug}?page=${page}`)
                setReviews(response.data.results);
                setMaxData(response.data.count);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        if (slug) {
            setLoading(true)
            fetchReviews();
        }
    }, [slug])

    useEffect(() => {
        const fetchNewReviews = async () => {
            try {
                const res = await axios.get(`get_reviews/${slug}?page=${page}`);
                setReviews([...reviews, ...res.data.results]);
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)

            }
        }
        setLoading(true);
        fetchNewReviews();
    }, [page]);

    const seeMoreClicked = () => {
        setPage(page + 1);
    }

    const [averageRating, setAverageRating] = useState(null);

    useEffect(() => {
        const getAvgRating = async () => {
            try {
                const res = await axios.get(`get_avg_rating/${slug}/`);
                setAverageRating(res.data.avg_rating);
            } catch (err) {
                console.log(err);
            }
        }

        if (slug) {
            getAvgRating();
        }

    }, [slug])

    return (
        <div className='px-10 md:px-20'>
            {loading && <Loading />}
            <p className='text-left mx-0 normal-headings mb-0'>Reviews</p>
            <div className='flex justify-start items-center'>
                {averageRating !== null && averageRating !== 0 && <StarRatings starRatedColor="orange" starDimension="20px" starSpacing="0px" rating={averageRating} />}
                {reviews.length > 0 && <p className='normal-text m-2 mb-1'>({maxData})</p>}
            </div>

            <hr className='border-black ' />
            {reviews.length > 0 && <div>
                {reviews.map((review) => (
                    <div key={review.id} className='my-5 border-gray-400 rounded-md p-3 border'>
                        <p className='normal-text ml-0'>{review.user.first_name} {review.user.last_name}</p>
                        <StarRatings starRatedColor="orange" starDimension="20px" starSpacing="0px" rating={review.rating} />
                        <p className='normal-text ml-0'>{review.review}</p>
                    </div>
                ))}
            </div>}

            {reviews.length < maxData && <div className=''>
                <button onClick={seeMoreClicked} className='my-small-btns'>See more...</button>
            </div>}

            {reviews.length === 0 &&
                <p className='normal-text ml-0'>No reviews yet. Buy the product and be the first one to review!
                </p>}
        </div>
    )
}
