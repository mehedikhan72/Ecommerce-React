import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from '../axios/AxiosSetup'
import Loading from '../utils/Loading';

export default function UserOrderList() {
    const { user } = useContext(AuthContext);
    const { username } = useParams();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`get_user_orders/`);
                setOrders(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        if (user && user.username === username) {
            fetchOrders();
        }
    }, [])

    console.log(orders);
    return (
        <div>
            {user && username === user.username && <div>
                {loading && <Loading />}
                {!loading && <div>
                    <p className='normal-headings'>Track your orders, {user.first_name}!</p>
                    {orders.length > 0 && <div className='p-2'>
                        {orders.map((order) => (
                            <div key={order.id} className='m-2 p-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex justify-center items-center'>
                                        <p className={order.status === 'Delivered' ? 'success-text ml-0' : 'alert-text ml-0'}>You ordered on {order.date_ordered}</p>
                                        {order.status === 'Shipped' && <p className='hidden md:block alert-text'><i className='bx bxs-truck text-xl'></i></p>}
                                    </div>

                                    <Link to={{ pathname: `/${username}/order/${order.id}` }}><button className='my-btns my-2'>Track</button></Link>
                                </div>
                                <hr className='border-black' />
                            </div>
                        ))}
                    </div>}
                </div>}

            </div>}

            {username !== user.username && <div className='flex flex-col justify-center items-center'>
                <p className='error-text'>You are not authorized to view this page.</p>
                <Link to={{ pathname: '/' }}><button className='my-5 my-btns sm:my-big-btns'>Continue Shopping</button></Link>
            </div>}
        </div>
    )
}
