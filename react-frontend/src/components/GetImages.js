import React, { useEffect, useState } from 'react'
import axios from './axios/AxiosSetup'

export default function GetImages(props) {
    const productId = props.productId;

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`images/${productId}/`)
                setImages(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (productId) {
            fetchImages();
        }

    }, [productId])
    console.log(images)

    //TODO: Deal with changing images later.

    return (
        <div>
            {images.length !== 0 && <div className='flex justify-center items-center'>
                <img className='product-detail-image' src={`http://127.0.0.1:8000${images[0].image}`}></img>
            </div>}
        </div>
    )
}
