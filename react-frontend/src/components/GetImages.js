import React, { useEffect, useState } from 'react'
import axios from './axios/AxiosSetup'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'



export default function GetImages(props) {
    const productId = props.productId;

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`images/${productId}/`)
                setImages(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (productId) {
            fetchImages();
        }

    }, [productId])

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {

        if (currentIndex === 0) {
            setCurrentIndex(images.length - 1)
        }
        else {
            setCurrentIndex(currentIndex - 1)
        }

    }
    const nextImage = () => {
        if (currentIndex === images.length - 1) {
            setCurrentIndex(0)
        }
        else {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const autoSlide = () => {

        if (parseInt(currentIndex) === parseInt(images.length - 1)) {
            setCurrentIndex(0)
        }
        else {
            setCurrentIndex(currentIndex + 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (images.length > 1) {
                autoSlide()
            }

        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex])

    return (
        <div>
            {images.length !== 0 && <div className='max-w-[350px] sm:max-w-[500px] xl:max-w-[450px] h-[500px] sm:h-[600px] md:h-[600px] w-full m-auto py-8 px-4 relative group'>
                <div style={{ backgroundImage: `url(${`http://127.0.0.1:8000${images[currentIndex].image}`})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
                <div>
                    <BsChevronCompactLeft onClick={prevImage} size={30} className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' />
                </div>
                <div>
                    <BsChevronCompactRight onClick={nextImage} size={30} className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' />
                </div>
                <div className='flex top-4 py-2 justify-center'>
                    {images.map((image, index) => (
                        <div key={index} className='2xl cursor-pointer'>
                            <RxDotFilled onClick={() => setCurrentIndex(index)} />
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}
