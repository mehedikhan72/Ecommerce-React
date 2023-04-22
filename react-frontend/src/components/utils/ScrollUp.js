import React, {useState, useEffect} from 'react'

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
            {btnVisible && <button onClick={scrollUp} className='my-btns-2 fixed bottom-10 left-10 text-4xl font-bold border-2'>^</button>}
        </div>
    )
}
