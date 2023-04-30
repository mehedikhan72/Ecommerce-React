import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from '../axios/AxiosSetup';
import { Link } from 'react-router-dom';
import Custom404 from '../utils/Custom404';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

export default function OrderDetails() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();


    const [orderItems, setOrderItems] = useState([]);
    const [orderData, setOrderData] = useState({});
    const [totalBill, setTotalBill] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [formattedDate, setFormattedDate] = useState('');

    const [statusValue, setStatusValue] = useState();
    const [statusValueChanged, setStatusValueChanged] = useState(false);

    useEffect(() => {
        const getOrderItems = async () => {
            try {
                const res = await axios.get(`get_order_items/${id}/`);
                setOrderItems(res.data);
                setOrderData(res.data[0].order);
            } catch (err) {
                console.log(err);
            }
        }

        getOrderItems();

    }, [statusValueChanged]);

    useEffect(() => {
        let total = 0;
        let totalItems = 0;
        orderItems.forEach((item) => {
            total += item.price;
            totalItems += item.quantity;
        });
        setTotalBill(total);
        setTotalItems(totalItems);
    }, [orderItems]);

    useEffect(() => {
        const formatDate = () => {
            const timestamp = orderData.date_ordered;
            console.log(timestamp);
            const date = new Date(timestamp);
            const formatter = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

            setFormattedDate(formatter.format(date));
        }

        if (orderData.date_ordered) {
            formatDate();
        }

    }, [orderData]);


    console.log(statusValue)

    const handleStatusChange = async () => {
        if (statusValue) {
            try {
                const res = await axios.post(`change_order_status/${id}/`, { status: statusValue });
                setStatusValueChanged(!statusValueChanged);
            } catch (err) {
                console.log(err);
            }
        }
    }


    return (
        <div>
            {orderItems.length === 0 && <Custom404 />}
            {!user || (!user.is_admin && !user.is_moderator) && <div>
                <div className='flex justify-center items-center'>
                    <p className='error-text text-center w-3/4'>You are not authorized to view this page.</p>
                </div>
            </div>}
            {user && (user.is_admin || user.is_moderator) && orderItems.length !== 0 && <div>
                <p className='normal-headings'>Order Details</p>
                <div className='mx-2 md:mx-5 p-5 flex justify-between items-center'>
                    <div className='flex justify-start items-center'>
                        <p className='small-headings text-left ml-0 mr-10'>{orderData.first_name} {orderData.last_name} ordered {totalItems} items on {formattedDate}.</p>
                        <p className={orderData.status === 'Delivered' ? 'success-text scale-150' : 'alert-text scale-150'}>{orderData.status}</p>
                    </div>

                    <p className='small-headings md:normal-headings md:m-2'>Total Bills: {totalBill}</p>
                </div>

                <div className='mx-2 md:mx-5 p-5'>
                    <p className='normal-headings ml-0 text-left m-0 mb-2'>Buyer Information</p>

                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <p className='normal-text ml-0'>First Name: {orderData.first_name}</p>
                        <p className='normal-text ml-0'>Last Name: {orderData.last_name}</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <p className='normal-text ml-0'>Email: {orderData.email}</p>
                        <p className='normal-text ml-0'>Phone No: {orderData.phone}</p>
                    </div>
                    <p className='normal-text ml-0'>Address: {orderData.address}</p>
                </div>

                <div className='mx-2 md:mx-5 p-5'>
                    <p className='normal-headings ml-0 text-left m-0 mb-2'>Ordered Items</p>
                    {orderItems.length > 0 && <div>
                        {orderItems.map((item) => (
                            <div key={item.id}>
                                <Link to={{ pathname: `/product/${item.product.slug}` }}>
                                    <div className='flex flex-wrap items-center justify-between border border-gray-500 mx-0 my-10 p-5 rounded-md'>
                                        <div className='flex items-center'>
                                            <div>
                                                <img className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] object-cover' src={`http://127.0.0.1:8000/${item.product.intro_image}`}></img>
                                            </div>
                                            <div>
                                                <p className='small-headings'>{item.product.name}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div>
                                                <p className='small-headings'>Size: {item.size}</p>
                                            </div>
                                            <div>
                                                <p className='small-headings'>Quantity: {item.quantity}</p>
                                            </div>
                                            <div className='mr-10'>
                                                <p className='small-headings lg:normal-headings'>Price: {item.product.discount_price ? item.quantity * item.product.discount_price : item.quantity * item.product.regular_price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>}
                </div>
                <div className='flex justify-start items-center mx-2 md:mx-5 p-5'>
                    <p className='normal-headings ml-0 text-left m-0 mr-10'>Order Status: </p>
                    <p className={orderData.status === 'Delivered' ? 'success-text scale-150' : 'alert-text scale-150'}>{orderData.status}</p>
                </div>

                <div className='mx-2 md:mx-5 p-5'>
                    <p className='small-headings text-left m-0'>Change Order Status</p>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={statusValue}
                            onChange={(e) => setStatusValue(e.target.value)}
                        >
                            <FormControlLabel value="Shipped" control={<Radio />} label="Shipped" />
                            <FormControlLabel value="Delivered" control={<Radio />} label="Delivered" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='mx-2 md:mx-5 px-5'>
                    <button onClick={handleStatusChange} className='my-0 my-btns'>Change</button>
                </div>

                <div className='my-20' />
            </div>}
        </div>
    )
}
