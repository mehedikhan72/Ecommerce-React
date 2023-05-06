import React, { useState, useEffect, useContext } from 'react'
import AuthContext from './context/AuthContext';
import Loading from './utils/Loading';
import axios from './axios/AxiosSetup';
import { Link } from 'react-router-dom';

export default function EditAccount() {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({});

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const autoFillForm = () => {
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setEmail(userData.email);
            setPhone(userData.phone);
            setAddress(userData.address);
            setLoading(false);
        }

        if (userData) {
            autoFillForm();
        }

    }, [userData]);



    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`get_user_data/${user.user_id}`);
                setUserData(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        if (user) {
            getUser();
        }

    }, []);

    const [edited, setEdited] = useState(false);

    const handleEdit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (firstName && lastName && email && phone && address) {
            try {
                const res = await axios.post(`edit_account/${user.user_id}`, {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    address: address,
                });

                if (res.status === 200) {
                    setEdited(true);
                    setLoading(false);
                }

            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            {loading && <Loading />}
            {!loading && <div>
                {!user &&
                    <div className='flex flex-col justify-center items-center m-10 p-5'>
                        <p className='error-text'>You must be logged in to edit your account.</p>
                        <Link to={{ pathname: '/' }}><button className='my-btns sm:my-big-btns'>Continue Shopping</button></Link>
                    </div>}

                {user &&
                    <div>
                        {!edited && <div>
                            <p className='small-headings'>Edit your account, {user.first_name} {user.last_name}!</p>

                            <form onSubmit={handleEdit}>
                                <div className="flex flex-col md:flex-row justify-center items-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <input required className="my-input-fields" name="first_name" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        <input required className="my-input-fields" name="last_name" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        <input required className="my-input-fields" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <input required className="my-input-fields" name="phone" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        <textarea
                                            required
                                            className="my-input-fields h-[118px] resize-none"
                                            name="address"
                                            type="text"
                                            placeholder="Address (Please put a detailed address as your purchases will be shipped in that location)"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='flex justify-center items-center m-5'>
                                    <button type='submit' className='my-btns'>Edit Profile</button>
                                </div>
                            </form>
                        </div>}


                        {edited && <div>
                            <div className='flex justify-center items-center'>
                                <p className='success-text text-center w-3/4'>Your account has been edited successfully!</p>
                            </div>

                            <div className='flex justify-center items-center p-5'>
                                <Link to={{ pathname: `/cart` }}><button className='my-btns m-2'>Continue to Cart</button></Link>
                            </div>
                        </div>
                        }
                    </div>}
            </div>}

        </div>
    )
}
