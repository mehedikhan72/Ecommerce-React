import React, { useEffect, useState } from 'react';
import { QuantityPicker } from 'react-qty-picker';

export default function Quantity(props) {
    const productId = props.productId;
    const [quantity, setQuantity] = useState(1);

    // Will error check later on, when added to cart or direct buy.
    // Errors like if the buyer selected more item than available.(of the selected size)

    useEffect(() => {
        props.selectedProductQuantity(quantity);
    }, [quantity])


    return (
        <div className='mx-10 my-5 lg:mx-20'>
            <p className='text-xl my-4 sm:text-2xl font-bold text-left'>Quantity: {quantity}</p>
            <QuantityPicker smooth value={1} min={1} max={props.sizeStock} onChange={(value) => { setQuantity(value) }} />
        </div>
    )
}
