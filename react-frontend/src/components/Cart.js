import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const [cartItems, setCartItems] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    // console.log(cartItems);

    const removeItem = (id) => {
        const newCart = cartItems.filter((item) => item.id !== id);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].productData.discount_price) {
                total = total + cartItems[i].productData.discount_price * cartItems[i].quantity
            }
            else {
                total = total + cartItems[i].productData.regular_price * cartItems[i].quantity
            }
        }
        setTotalPrice(total);
    }, [cartItems])

    const navigate = useNavigate();
    const [itemToBeEditedSlug, setItemToBeEditedSlug] = useState(null);

    const editItemBtnClicked = (id) => {

        const itemToBeEdited = cartItems.find((item) => item.id === id);
        setItemToBeEditedSlug(itemToBeEdited.productData.slug);
        removeItem(id);
    }

    useEffect(() => {
        if(itemToBeEditedSlug){
            navigate(`/product/${itemToBeEditedSlug}/`)
        }
    }, [itemToBeEditedSlug])

    return (
        <div>
            <div className="flex justify-center items-center">
                <i className='bx bx-cart text-5xl'></i><p className='ml-2 normal-headings'>My Cart</p>
            </div>

            <div className='flex justify-center'>
                {cartItems.length === 0 && <p className='text-xl alert-text w-5/6 md:w-1/2 text-center '>Your cart is empty</p>}
            </div>

            {/* Cart items */}
            {cartItems.length !== 0 && <div>
                {cartItems.map((item) => (
                    <div key={item.id} className='relative'>
                        <Link to={{ pathname: `/product/${item.productData.slug}` }}>
                            <div className='flex flex-wrap items-center justify-between border border-gray-500 mx-5 my-10 p-5 rounded-md'>
                                <div className='flex items-center'>
                                    <div>
                                        <img
                                            className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] object-cover'
                                            src={item.productData.intro_image}
                                            style={{ borderRadius: '10px' }}
                                        ></img>
                                    </div>
                                    <div>
                                        <p className='small-headings'>{item.productData.name}</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div>
                                        <p className='small-headings'>Size: {item.size[0].size}</p>
                                    </div>
                                    <div>
                                        <p className='small-headings'>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className='mr-10'>
                                        <p className='small-headings lg:normal-headings'>Price: {item.productData.discount_price ? item.quantity * item.productData.discount_price : item.quantity * item.productData.regular_price}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div>
                            <button onClick={() => removeItem(item.id)} className="absolute -translate-x-0 translate-y-[-50%] right-7 top-8 sm:right-10 sm:top-1/3 text-2xl rounded-full py-1 px-2 bg-black hover:bg-gray-700 text-white cursor-pointer "><i class='bx bx-trash'></i></button>
                            <button onClick={() => editItemBtnClicked(item.id)} className="absolute -translate-x-0 translate-y-[-50%] right-7 top-20 sm:right-10 sm:top-2/3 text-2xl rounded-full py-1 px-2 bg-black hover:bg-gray-700 text-white cursor-pointer "><i class='bx bx-message-alt-edit'></i></button>
                        </div>
                    </div>
                ))}
                <div>
                    <p className='normal-headings text-right'>Total: {totalPrice}</p>
                    <div className='flex justify-end mx-10'>
                        <Link to={{ pathname: '/cart/checkout' }}><button className='my-btns sm:my-big-btns'>Proceed To Checkout</button></Link>
                    </div>

                </div>
            </div>}


            <div className='m-10 text-center'>
                <Link to={{ pathname: '/' }}><button className='my-btns sm:my-big-btns'>Continue Shopping</button></Link>
            </div>

        </div>
    )
}
