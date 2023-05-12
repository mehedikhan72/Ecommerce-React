import React, { useState, useEffect } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'


export default function Featurings() {
    const images = [
        {
            id: 1,
            src: "https://scontent.fdac157-1.fna.fbcdn.net/v/t1.15752-9/346102042_956882438671220_1655312054920929596_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHLsKyjzAHHxRS6Nqbsgu8KvEY0sFVf6Q28RjSwVV_pDRipZDKyktF_vdV8TNf-Skh4o4d5nYUkuZ0H0hIwnX1e&_nc_ohc=0sdoES0b-1gAX9eYjdo&_nc_oc=AQlmIUCY_LM1dFebIiTtWGbdpme5aomVZ0LP2Lpwd113nrB6Ki58idlMutZZ6c-2RRA&_nc_ht=scontent.fdac157-1.fna&oh=03_AdTbyFNNfg_rdFa9GdgZ-CwnQW7JDGXGQfuE2_PGvH3Qsw&oe=648561E0"
        },
        {
            id: 2,
            src: "https://scontent.fdac157-1.fna.fbcdn.net/v/t1.15752-9/346102827_546270727673839_8001624156646728619_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeH1Vm88ldeFeV1AnCfClLfeUu4y5TEAr61S7jLlMQCvrXsH2K81MDU22sqqZX5ZqvsHBWpN1ybX_9KhtVs-adBE&_nc_ohc=XJQ1zbHKLxEAX_wTHMm&_nc_ht=scontent.fdac157-1.fna&oh=03_AdQpM0790c7gJ2TFJ_kyYE28K_i1eF54w6zvQAei_XDrTg&oe=648554AB"
        },
        {
            id: 3,
            src: "https://scontent.fdac157-1.fna.fbcdn.net/v/t1.15752-9/346098446_183161611344431_1824917861756881353_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHPMVJ3V3UC-3MvT0ApBEAXkBK9zX2ZLJWQEr3NfZkslXZ8RDLOj1sz1xYMSjBU4UPmcvGxaIR6MqChkcQixQoG&_nc_ohc=yBBYDG8vSMwAX_JSsqv&_nc_ht=scontent.fdac157-1.fna&oh=03_AdRwe7iHDMsHaPquur3mn8QGdy_ml9UZftyTZEplZzpcZQ&oe=648580CF"
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

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
            {images.length !== 0 && <div className='relative group p-2'>
                <div className='flex justify-center items-center'>
                    <img
                        className='w-full lg:w-5/6'
                        src={`${images[currentIndex].src}`}
                        style={{ borderRadius: '10px' }}
                    />
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
