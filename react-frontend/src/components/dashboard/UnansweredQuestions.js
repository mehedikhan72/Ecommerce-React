import React, { useState, useEffect, useContext } from 'react'
import axios from '../axios/AxiosSetup'
import { Link } from 'react-router-dom';

export default function UnansweredQuestions() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('unanswered_questions/');
                console.log(res.data)
                setQuestions(res.data.results);
            } catch (err) {
                console.log(err);
            }
        }

        fetchQuestions();
    }, [])
    return (
        <div>
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
            </div>}
            {questions.length === 0 && <div>
                <div className='flex justify-center items-center'>
                    <p className='small-headings'>No new questions. Check again later!</p>
                </div>
                </div>}

        </div>
    )
}
