import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import axios from '../axios/AxiosSetup';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';

export default function AddProduct() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [maxData, setMaxData] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`orders?page=${page}`);
                setOrders([...orders, ...res.data.results])
                setMaxData(res.data.count);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        getOrders();
    }, [page]);

    const seeMoreClicked = () => {
        setPage(page + 1);
    }

    return (
        <div>
            {loading && <Loading />}
            {!loading && <div>
                <p className='normal-headings'>Previous Orders!</p>
                {orders.length > 0 && <div>
                    {orders.map((order) => (
                        <div key={order.id} className='m-1 p-1'>
                            <div className='flex justify-between items-center'>
                                <p className='normal-text ml-0'>{order.first_name} {order.last_name} ordered on {order.date_ordered}</p>
                                <Link to={{ pathname: `/order/${order.id}` }}><button className='my-small-btns'>View details</button></Link>
                            </div>
                            <hr className='border-black' />
                        </div>
                    ))}
                    {orders.length < maxData && <div className='m-10 text-center'>
                        <button onClick={seeMoreClicked} className='my-btns'>See more...</button>
                    </div>}
                </div>}
            </div>}

        </div>
    )
}