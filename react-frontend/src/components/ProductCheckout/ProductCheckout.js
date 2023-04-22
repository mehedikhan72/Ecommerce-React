import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import UserInfo from './UserInfo'
import axios from '../axios/AxiosSetup'
import { Link } from 'react-router-dom'
import NoProductError from './NoProductError'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function ProductCheckout() {
    const { width, height } = useWindowSize()

    const [cartItems, setCartItems] = useState(localStorage.getItem('buy_now_product') ? JSON.parse(localStorage.getItem('buy_now_product')) : []);
    const [subTotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(50);

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
        setSubTotal(total);
    }, [cartItems])


    // Getting buyer data from buyer Info
    const [info, setInfo] = useState(null);

    // Creating the obj that will be sent to the server

    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (info) {
            setOrder({
                order: info,
                order_items: cartItems,
                shipping_charge: shipping,
            })
        }
    }, [cartItems, info, shipping])

    const [orderPlacedState, setOrderPlacedState] = useState(false);

    const orderPlaced = async (e) => {
        console.log(order)
        e.preventDefault();
        try {
            const response = await axios.post('place_order/', order);
            console.log(response.data);
            setOrderPlacedState(true);
            localStorage.removeItem('cart');
        }
        catch (error) {
            console.log(error);
        }
        console.log("Order Placed")
    }

    return (
        <div>
            {cartItems.length === 0 && <NoProductError />}
            {cartItems.length !== 0 && <div>
                {!orderPlacedState && <div>
                    <div className='grid grid-cols-1 xl:grid-cols-2'>
                        <div>
                            <UserInfo setShipping={setShipping} setInfo={setInfo} />
                        </div>
                        <div className='border-l-4 h-fit'>
                            <p className='normal-headings'>Order Summary</p>
                            {cartItems.map((item) => (
                                <div key={item.id} className='flex justify-between items-center m-5'>
                                    <div className='flex justify-center items-center'>
                                        <img className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]' src={item.productData.intro_image}></img>
                                        <div>
                                            <p className='small-headings text-left'>{item.productData.name}</p>
                                            <p className='normal-text text-left'>Size: {item.size[0].size}</p>
                                            <p className='normal-text text-left'>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className='small-headings lg:small-headings'>Price: {item.productData.discount_price ? item.quantity * item.productData.discount_price : item.quantity * item.productData.regular_price}</p>
                                </div>
                            ))}
                            <div className='border-t-4 m-5'>
                                <div className='flex justify-between items-center mx-5'>
                                    <p className='normal-text'>Subtotal</p>
                                    <p className='normal-text'>{subTotal}</p>
                                </div>
                                <div className='flex justify-between items-center mx-5'>
                                    <p className='normal-text'>Shipping</p>
                                    <p className='normal-text'>{shipping}</p>
                                </div>
                                <div className='flex justify-between items-center mx-5'>
                                    <p className='small-headings'>Total</p>
                                    <p className='small-headings'>TK {subTotal + shipping}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-t-4 m-5 flex justify-end'>
                        {info && <button onClick={orderPlaced} className='my-big-btns m-5'>Place Order</button>}
                    </div>
                </div>}
                {orderPlacedState && <div className='flex justify-center items-center flex-col my-20'>
                    <Confetti
                        width={width}
                        height={height}
                    />
                    <p className='success-text px-10 py-6 text-3xl font-bold'>Order placed successfully.</p>
                    <p className='normal-headings'>Thank you for shopping with us!</p>
                    <Link to={{ pathname: '/' }}><button className='my-btns sm:my-big-btns'>Continue Shopping</button></Link>
                </div>}
            </div>}
        </div>
    )
}
