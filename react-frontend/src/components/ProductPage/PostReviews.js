import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import axios from '../axios/AxiosSetup';
import Loading from '../utils/Loading';

export default function PostReviews(props) {
    const slug = props.slug;
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(null);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await axios.post(`create_review/${slug}/`, {
                review: review,
                rating: rating
            });
            setRating(null);
            setReview("");
            setLoading(false);
            props.setReviewAdded(!props.reviewAdded)
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <div className='px-10 md:px-20'>
            {loading && <Loading />}
            <p className='normal-headings text-left ml-0'>Post a Review</p>
            <hr className='border-black ' />
            <p className='small-headings text-left ml-0'>Hey, {user.first_name}! You recently purchased this product. Feel free to add a review.</p>
            <form className='w-full flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                <textarea type="text" className='my-input-fields w-full h-[100px] resize-none' required placeholder='Review' onChange={(e) => setReview(e.target.value)} />
                <input type='number' min={1} max={5} className='my-input-fields w-full' required placeholder='Rating(out of 5)' onChange={(e) => setRating(e.target.value)} />
                <div className='flex justify-center items-center'>
                    <button type="submit" className='my-btns'>Post Review</button>
                </div>
            </form>
        </div>
    )
}
