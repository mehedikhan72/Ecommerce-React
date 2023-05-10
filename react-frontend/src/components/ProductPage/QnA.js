import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext'
import axios from '../axios/AxiosSetup'
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';

export default function QnA(props) {
    const { user } = useContext(AuthContext);
    const [qna, setQna] = useState([]);
    const [page, setPage] = useState(1);
    const [maxData, setMaxData] = useState(null);
    const [loading, setLoading] = useState(true);

    const slug = props.slug;

    // For adding answers

    useEffect(() => {
        const fetchQnA = async () => {
            try {
                const res = await axios.get(`qna/${slug}?page=${page}`);
                setQna(res.data.results);
                setMaxData(res.data.count);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        if (slug) {
            setLoading(true);
            fetchQnA();
        }

    }, [slug])

    useEffect(() => {
        const fetchNewQnA = async () => {
            try {
                const res = await axios.get(`qna/${slug}?page=${page}`);
                setQna([...qna, ...res.data.results]);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        setLoading(true);
        fetchNewQnA();
    }, [page]);

    const [question, setQuestion] = useState('');
    const [questionAdded, setQuestionAdded] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`add_question/${slug}/`, {
                question: question
            });
            setQuestion('');
            setQuestionAdded(true);
            setLoading(false);
            setTimeout(() => {
                setQuestionAdded(false);
            }, 3000);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    // Dealing with answers
    const [answer, setAnswer] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [answerAdded, setAnswerAdded] = useState(false);

    const questionSelectedToAnswer = (id, question) => {
        setSelectedQuestion(question);
        setSelectedQuestionId(id);
    }

    const questionAnswered = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await axios.post(`add_answer/${selectedQuestionId}/`, {
                answer: answer
            });
            setAnswer('');
            setSelectedQuestion(null);
            setSelectedQuestionId(null);
            setAnswerAdded(true);
            setLoading(false);
            setTimeout(() => {
                setAnswerAdded(false);
            }, 3000);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const seeMoreClicked = () => {
        setPage(page + 1);
    }

    const [shouldBeDisabled, setShouldBeDisabled] = useState(false);

    useEffect(() => {
        if (selectedQuestion && selectedQuestionId) {
            setShouldBeDisabled(false);
        }
        else {
            setShouldBeDisabled(true);
        }
    }, [selectedQuestion, selectedQuestionId])

    return (
        <div>
            {loading && <Loading />}
            <div className='flex flex-col md:flex-row'>
                <div className='my-20 overflow-x-hidden md:overflow-x-hidden md:h-[500px] md:overflow-scroll w-full px-10 md:px-20 md:w-1/2 '>
                    <p className='normal-headings text-left mx-0'>Questions n Answers</p>
                    <hr className='border-black ' />
                    {qna.length > 0 && qna.map((qna) => (
                        <div key={qna.id} className='my-5'>
                            {<div>
                                <div className='flex justify-start'>
                                    <p className='normal-text ml-0 mr-2'>{qna.user.first_name} {qna.user.last_name}</p>
                                    <p className='normal-text ml-0 font-normal'>asks</p>
                                </div>

                                <div className='flex justify-start items-center'>
                                    <p className='font-bold border-1 rounded-md px-2 text-bold p-1 mx-1 mr-2 bg-black text-white hover:bg-gray-500'>Q</p>
                                    <p className='ml-0 normal-text text-left'>{qna.question}</p>
                                    {user && (user.is_admin || user.is_moderator) && !qna.answer && <button onClick={() => questionSelectedToAnswer(qna.id, qna.question)} className='my-small-btns'>Answer</button>}
                                    {user && (user.is_admin || user.is_moderator) && qna.answer && <button onClick={() => questionSelectedToAnswer(qna.id, qna.question)} className='my-small-btns'>Edit Answer</button>}
                                </div>
                                <div className='flex justify-start items-center'>
                                    <p className='font-bold border-1 rounded-md px-2 text-bold p-1 mx-1 mr-2 bg-black text-white hover:bg-gray-500'>A</p>
                                    {qna.answer && <p className='ml-0 normal-text'>{qna.answer}</p>}
                                    {!qna.answer && <p className='ml-0 error-text'>Unanswered.</p>}
                                </div>
                                <hr className=' border-black' />
                            </div>}

                        </div>
                    ))}
                    {!user && qna.length === 0 && <p className='normal-text ml-0'>No questions yet. Login to ask questions.</p>}
                    {user && qna.length === 0 && !user.is_admin && !user.is_moderator && <p className='normal-text ml-0'>No questions yet. Be the first one to ask.</p>}
                    {user && qna.length === 0 && (user.is_admin || user.is_moderator) && <p className='normal-text ml-0'>No questions yet. Nothing to answer.</p>}
                    {qna.length < maxData && <div className=''>
                        <button onClick={seeMoreClicked} className='my-small-btns'>See more...</button>
                    </div>}
                </div>
                {user && !user.is_admin && !user.is_moderator && <div className='w-5/6 md:w-1/2 flex flex-col justify-center'>
                    <p className='small-headings'>Ask a question!</p>
                    <div className='flex justify-center items-center'>
                        <p className='alert-text text-center w-5/6'>We will notify you with an email as soon as your question is answered.</p>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                        <textarea required className='my-input-fields resize-none h-[200px] w-5/6' value={question} onChange={(e) => setQuestion(e.target.value)} type='text' placeholder='Your question'></textarea>
                        <button type='submit' className='my-btns w-5/6'>Submit</button>
                    </form>
                </div>}

                {!user && <div className='w-5/6 md:w-1/2 flex flex-col justify-center'>
                    <p className='small-headings'>Ask a question!</p>
                    <div className='flex justify-center items-center'>
                        <p className='alert-text text-center w-5/6'>You need to be logged in to ask questions.</p>
                    </div>
                    <Link className='flex justify-center items-center p-5' to={{ pathname: '/login' }}><button className='my-btns'>Login</button></Link>
                </div>}

                {/* Answering questions */}
                {user && (user.is_moderator || user.is_admin) && <div className='w-5/6 md:w-1/2 flex flex-col justify-center'>
                    <p className='small-headings'>Answer questions!</p>
                    {selectedQuestion && <div>
                        <div className='flex justify-center items-center'>
                            <p className='font-bold border-1 rounded-md px-2 text-bold p-1 mx-1 mr-2 bg-black text-white hover:bg-gray-500'>Q</p>
                            <p className='ml-0 small-headings text-center'>{selectedQuestion}</p>
                        </div>
                    </div>}
                    {!selectedQuestion && <div className='flex flex-col justify-center items-center'>
                        <p className='alert-text'>Please Select a question first!</p>
                    </div>}
                    <form onSubmit={questionAnswered} className='flex flex-col justify-center items-center'>
                        <textarea required className='my-input-fields resize-none h-[200px] w-5/6' value={answer} onChange={(e) => setAnswer(e.target.value)} type='text' placeholder='Your answer'></textarea>
                        <button disabled={shouldBeDisabled} type='submit' className={shouldBeDisabled ? 'my-btns w-5/6 opacity-50' : 'my-btns w-5/6'}>Submit</button>
                    </form>
                </div>}
            </div>
            {questionAdded && <p className='fixed success-text text-center w-[250px] bottom-5 right-5 animate-bounce'>Question sent. Hang tight!</p>}
            {answerAdded && <p className='fixed success-text text-center w-[250px] bottom-5 right-5 animate-bounce'>Answer saved! Refresh to see changes!</p>}
        </div>
    )
}
