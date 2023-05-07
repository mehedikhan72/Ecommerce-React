import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

export default function PaymentResult() {
    const { width, height } = useWindowSize()
    const location = useLocation();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paymentStatus = searchParams.get('status');
        setStatus(paymentStatus);
    }, [location]);

    useEffect(() => {
        if (status === 'success') {
            localStorage.removeItem('cart');
            localStorage.removeItem('buy_now_product');
        }
    }, [status]);

    return (
        <div>
            {status === 'success' && (
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='success-text w-3/4 sm:w-1/2 text-center'>Payment successful, order placed successfully!</h1>
                    <Confetti
                        width={width}
                        height={height}
                    />
                    <p className='normal-headings'>Thank you for shopping with us!</p>
                </div>

            )}
            {status === 'fail' && (
                <div className='flex justify-center items-center'>
                    <h1 className='error-text w-3/4 sm:w-1/2 text-center'>Payment failed. Please try again.</h1>
                </div>
            )}

            {status === 'cancel' && (
                <div className='flex justify-center items-center'>
                    <h1 className='error-text w-3/4 sm:w-1/2 text-center'>Your order was cancelled.</h1>
                </div>
            )}

            <div className='flex justify-center items-center m-10'>
                <Link to={{ pathname: '/' }}><button className='my-btns sm:my-big-btns'>Continue Shopping</button></Link>
            </div>
        </div>
    )
}
