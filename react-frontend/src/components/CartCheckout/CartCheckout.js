import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import CartOwnerInfo from './CartOwnerInfo'
import axios from '../axios/AxiosSetup'
import { Link } from 'react-router-dom'
import NoCartError from './NoCartError'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Loading from '../utils/Loading'
import Error from '../utils/Error'

export default function CartCheckout() {

    const { width, height } = useWindowSize()

    const [cartItems, setCartItems] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    const [subTotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(50);
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [loading, setLoading] = useState(false);

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
                payment_method: paymentMethod,
            })

        }
    }, [cartItems, info, shipping, paymentMethod])

    const [orderPlacedState, setOrderPlacedState] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const orderPlaced = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post('place_order/', order);
            // check for unavailable products
            if(response.data.error) {
                setShowErrorMsg(true);
                setErrorMsg(response.data.error);
                setLoading(false);
                return;
            }

            if (paymentMethod === 'online') {
                if ((response.data.status === 'SUCCESS' || response.data.status === 'success') && response.data.GatewayPageURL) {
                    window.location.href = response.data.GatewayPageURL;
                }
            }
            else {
                // COD payments.
                setOrderPlacedState(true);
                localStorage.removeItem('cart');
            }
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div>
            {loading && <Loading />}
            {cartItems.length === 0 && <NoCartError />}
            {showErrorMsg && <Error error={errorMsg}/>}
            {cartItems.length !== 0 && <div>
                {!orderPlacedState && <div>
                    <div className='grid grid-cols-1 xl:grid-cols-2'>
                        <div>
                            <CartOwnerInfo setShipping={setShipping} setInfo={setInfo} />
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

                            <div className='border-t-4 m-5'>
                                <p className='small-headings text-left m-2'>Payment Option</p>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <FormControlLabel value="online" control={<Radio />} label="Pay Online" />
                                        <FormControlLabel value="COD" control={<Radio />} label="Cash On Delivery" />
                                    </RadioGroup>
                                </FormControl>
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
