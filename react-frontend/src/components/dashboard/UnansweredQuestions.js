import React, { useState, useEffect, useContext } from 'react'
import axios from '../axios/AxiosSetup'
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading'

export default function UnansweredQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [maxData, setMaxData] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`unanswered_questions?page=${page}`);
                setQuestions([...questions, ...res.data.results]);
                setMaxData(res.data.count);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        fetchQuestions();
    }, [page])

    const seeMoreClicked = () => {
        setPage(page + 1);
    }
    return (
        <div>
            {loading && <Loading />}
            {questions.length > 0 && <div>
                <p className='normal-headings'>Unanswered Questions!</p>
                {questions.map((question) => (
                    <div key={question.id} >
                        <div className='flex justify-between items-center mx-5 md:mx-20 xl:mx-40 my-2'>
                            <p className='normal-text'>{question.question}</p>
                            <Link to={{ pathname: `/product/${question.product.slug}` }}><button className='my-small-btns'>Answer</button></Link>
                        </div>
                        <hr className='mx-5 md:mx-20 xl:mx-40 border-black' />
                    </div>
                ))}
                {questions.length < maxData && <div className='m-10 text-center'>
                    <button onClick={seeMoreClicked} className='my-btns'>See more...</button>
                </div>}
            </div>}
            {!loading && questions.length === 0 && <div>
                <div className='flex justify-center items-center'>
                    <p className='small-headings'>No new questions. Check again later!</p>
                </div>
            </div>}
        </div>
    )
}
