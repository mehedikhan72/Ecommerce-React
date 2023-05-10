import React, { useState, useEffect } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'


export default function Featurings() {
    const images = [
        {
            id: 1,
            src: "https://lh3.googleusercontent.com/Mjt663TQUysGmJvMTMDkeNTaenNxmUBoAticuMfFaVq7QB1QHSF7lNSHJ67S3LMChc5vIZDwSabB7AWp4677zV-qJ75JR5QEnRMqyuA8ICf58b84x2c6q5G1H4em_8wcXVvFUKk2tMDPzpyNuXtmiJuCOesL7xuuwyLNn1AIm0EXf3DGnrcIABn2hKXBThypySMB2xxIJF8orEUUYTySxWGbkxIU1ZfZWSlIORPBnjO5K3Nj7QBQxLfGPq6ugCR0qSH0_yLHIjtLuCrl6Ax7ugH8uLGm5_ZSUt5_hak5GqJT-09LxAeDQKYC8HoDb1O0ukk_McT1NMiNsuKujIrBIZ_YjpHtQM5Z1EN9u1aUwhTxt1s93t26OhJlrsWqclX6cV9HVoHlYddknMoBHKLmx_vaBp8l0-Rfc-SXvdUCq2QAzbEWn2Ymaox-2tA75GCZoj3vocks1kz-_C2P1v_sqNjTAPvP5JRn8j_N7rg_OZWCGW9dMgWIjhM1U3v6MQj-kog4qnS_Cl_6AZnZ2qfZsQ75DEajzLRd1rZBtKS7OvQ2d8613RDKnLNWHRyIo65TfFf_TYIatWF6401v_dkEdro7llGLJolFO7_IFD-42TvvlQTJekUGzlXPrjZZ-BzeqZ3KeclksYzanlgRZzr37oHQ3RKZqHcVM5zJUMW3gPqSd6Z-T2SxemGEUDLaYfTMA5pS4-MaKKWNRjwETpVvCmxG8SHZpRw94Vy8Vqo_HII0r9eaQ1xcMGQZ139I8TixdhOWwKTe5LI7WToY4MRiMKugsR6G3Wt9dE4I5tHiXkNkEwcMPgiQUSwGAH72pt3cMfzt0m1cUi4vvzkjAYuU7eE1rzbvEdH9aO7o2Ijq_prWvZQDI-sNnRZiIsvNUFw0e9FZ_VdHq7AEJuEMmDnfL96qsGoywMbnVfyrUDHvyw6m=w1366-h768-s-no?authuser=0"
        },
        {
            id: 2,
            src: "https://lh3.googleusercontent.com/4cQpXmkGMU3Cq87L6mBvpO7Ke5NC735A6JQ5CDZAyoBiKDOzxlX0Ur5E_h0h4fDU4yLHEUld7fxCT92CNmmO57BuuTx_QPK4-dG-L3TGqWp88-hjTcrwuj2ABMeoX-a4soCOUCz3rFb6zY24qNbyjHhdmA9qR9Wb6cflieemCJmqID0A9C8Zqu-rOdpGzbG-zW2BVP-_2Y-bSXHX549V8stsCugmbwAr1Eep6N4gejtoUinDqeNqGbrI5ltMffUcjb6o6UCCpJPmpFYlu8o-z2zu1itybMH0R3dmzOdNDVju2K9g4UPkqxjTWKCUeAiiOdCJs4A6vvpm2JlhjsAFGKQDLTc-ZhnzqIAqudyffzrzxWMxmLHFDvinc74FxQVKRxRLmgpxP8OU5whZBKP5-O9qJ7Yv8hfmXZl8b57C0eNb8z3VNw81jwpr13r4R9O9x7v3l_NdFGxAMZl6oFCjMXvKMM4pvThakrVBr2p51Mm9-Vq6g87BbA9k96WmBV3t5ic2NIwccLnGCS5T5df-SUdpIael_SkC2DlJpuOsvy5qtEUqZFpuVP1DRwEr35_VWP8Ph42B5ise_v8nqaBCKHIWdCbB_SBppM_jLGLkkGZ0mA5YLVOa-54Clkl1Mmc2338IhiTyFBG_ABR7SWgvDqJGMzixFKf9xIuTFMtnsXqyWVL9uwo_Q2OQmoNmJOP6fs5umr7nPfAxarmbU5fNnvZoZPlWhcV7Hlr2rf0yLfXZ6P1TctpEJxa9PeIE5aw_73qXqDuBEhwAyyS9G5QLCFnK8r5h1k2lyh6ta_IgYpZ7gqYalg3V2nG6oaVuN40VR0WafcmDH5ODxSHfovCKj6ihFmy_d-3AgbMlwyzolff-Jm3x2666cfX0EjN5oOKrre2J78hkn9hxMkif-gufXi9qZody2hCqkIyEzFTXbS7_=w1366-h768-s-no?authuser=0"
        },
        {
            id: 3,
            src: "https://lh3.googleusercontent.com/WSIpE0HSI-To6g3cndjKqa3pN9ImPzQoENumHNSClPUmmeAFB62WSEf00mRTdp-QKA_68u_Ik1WkNaAF1sK54PJld8-SPO7UipDvohXkQcI247WNl2GwT3_p6g1PIAvnjJe1cVUnAOujq4ASHnI8mWkXtBjgOCg48kzlaOfVj5zAEwLsYqrCDH3TybEF194XfKmtvGa_GZ4a5VKR5SSlScGoT3asOVyjz4Tor-OOA5Vo_Q7UpzONnvQ4EW0J4CWMeCcjqC8CWpZJxZobQaXK460bqP4pfiO-h3PO-5W1IhsZ-i3jfCPkRRutVleuIm5YxKItjCtNkMtW5EePTCLVl8AMEY294vwdhc6mYGrTaG5IrQcMX9l-ac6IBITWRWsg92bVhTKebZJnrruEDkVrufgtF7E7v2vtend14I5Uq2ETNgFMbcP8L9YhOI1eoARZhNq2Rlee4orqIjn9mB8l4lmHkkYB03MPpCrtD0D-VZUAewyI3SFfHJz5Y_sqBEbvNvyj-4E_-ekU3P6gcRhZqo8YiZ8Enz1uKQJkQKvp1uIP4M02Y_m18TRNY7NdvXLU1nQRKxggiPr9OufrjBBc2W879xRH78QULZOzYksEeObI40hw2Ee6VUO-0uv2ZFT8EdAo2rWjJVcnaRQi-9qab97OQBqpKtKNFJ0V6t2L4_WgP1GGuXGphF7KXfH6lFcEZ_tW-r_FvRGYmIhyXzLDRqgEJEX_wP9_gwJum7Xi_pB1h85pNXYw7AXUaHFo5oebXV6zCSNSMnQTz90uBOInyKIB6QBW5mhcuu8YvOal1-WQVKOt3G-uM28YVcOa8BqKepWKdCnOOM2ejjU7YW2a0WTWq2rOjhyt-DUKzR5aPWl5sRHulhyefU2hgpa6DH4088CT_ostfcjf7l-BjlM_0hdTPV4-OV8iDIU6vv3YgNIK=w1366-h768-s-no?authuser=0"
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

        }, 4000);
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
