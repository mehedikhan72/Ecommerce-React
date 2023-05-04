import React, { useState, useEffect } from 'react'

export default function ScrollUp() {
    const [btnVisible, setBtnVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setBtnVisible(true);
            }
            else {
                setBtnVisible(false);
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div>
            {btnVisible && <button onClick={scrollUp} className='hidden md:block bg-black hover:bg-gray-700 rounded-md px-2 py-1 text-white fixed bottom-10 right-10 text-4xl font-bold border-2'>^</button>}
        </div>
    )
}
