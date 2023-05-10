import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import axios from '../axios/AxiosSetup'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';

export default function UserInfo(props) {
    const { user } = useContext(AuthContext);

    const [buyerInfo, setBuyerInfo] = useState(null);
    const [availableInfo, setAvailableInfo] = useState(false);
    const [loading, setLoading] = useState(true);

    // If not logged in user
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`get_user_data/${user.user_id}/`);
                setBuyerInfo(response.data);
                props.setInfo(response.data);
                setAvailableInfo(true);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        const fetchSavedUserInfo = () => {
            setLoading(true);
            const savedUserInfo = localStorage.getItem('saved_user_info');
            if (savedUserInfo) {
                setBuyerInfo(JSON.parse(savedUserInfo));
                setAvailableInfo(true);
                setFirst_name(JSON.parse(savedUserInfo).first_name);
                setLast_name(JSON.parse(savedUserInfo).last_name);
                setEmail(JSON.parse(savedUserInfo).email);
                setPhone(JSON.parse(savedUserInfo).phone);
                setAddress(JSON.parse(savedUserInfo).address);
            }
            setLoading(false);
        }

        if (user) {
            fetchUserData();
        }
        else {
            fetchSavedUserInfo();
        }

    }, [user])

    const [deliveryValue, setDeliveryValue] = useState('inside-cumilla');
    const handleDeliveryChange = (event) => {
        setDeliveryValue(event.target.value);
        if (event.target.value === 'inside-cumilla') {
            props.setShipping(50);
            props.setOutsideComilla(false);
        }
        else if (event.target.value === 'outside-cumilla') {
            props.setShipping(100);
            props.setOutsideComilla(true);
        }
    };

    // Saving user data
    const [saveChecked, setSaveChecked] = useState(false);

    const handleCheckChange = () => {
        setSaveChecked(!saveChecked);
    }

    //TODO: Bug: for some reason, user.id isn't being sent to the db, but since we have another
    //unique field which is username, we can get the job done for now.

    const infoAdded = (e) => {
        e.preventDefault();
        setBuyerInfo({
            first_name,
            last_name,
            email,
            phone,
            address
        });
        setAvailableInfo(true);
    }

    useEffect(() => {
        if (buyerInfo) {
            props.setInfo(buyerInfo);
        }
    }, [buyerInfo])

    useEffect(() => {
        if (saveChecked && !user) {
            localStorage.setItem('saved_user_info', JSON.stringify(buyerInfo));
        }
    }, [buyerInfo])

    // TODO: fix bug. save updated data to localstorage properly.

    return (
        <div>
            {loading && <Loading />}
            {availableInfo && <div>
                <p className='normal-headings'>Here is your information, {buyerInfo.first_name}.</p>
                <div className='flex justify-between items-center'>
                    <p className='normal-headings text-left ml-5'>Contact</p>
                    {!user && <button onClick={() => setAvailableInfo(false)} className='m-2'><i class='bx bx-message-alt-edit text-2xl'></i></button>}
                    {user && <Link to={{ pathname: '/account/edit' }}><button className='m-2'><i class='bx bx-message-alt-edit text-2xl'></i></button></Link>}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <p className='normal-text'>First Name: {buyerInfo.first_name}</p>
                    <p className='normal-text'>Last Name: {buyerInfo.last_name}</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <p className='normal-text'>Phone: {buyerInfo.phone}</p>
                    <p className='normal-text'>Email: {buyerInfo.email}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className='normal-headings text-left ml-5'>Shipping Address</p>
                    {!user && <button onClick={() => setAvailableInfo(false)} className='m-2'><i class='bx bx-message-alt-edit text-2xl'></i></button>}
                    {user && <Link to={{ pathname: '/account/edit' }}><button className='m-2'><i class='bx bx-message-alt-edit text-2xl'></i></button></Link>}
                </div>
                <p className='normal-text'>{buyerInfo.address}</p>
            </div>}

            {!availableInfo && <div>
                <p className='normal-headings mb-2'>Please fill up the following information.</p>
                <p className='normal-text text-center mb-5'>Already have an account? <Link className='underline text-xl hover:text-indigo-500' to={{ pathname: '/login' }}>Login</Link></p>
                <form onSubmit={infoAdded}>
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <div className="flex flex-col items-center justify-center">
                            <input required className="my-input-fields" name="first_name" type="text" placeholder="First Name" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                            <input required className="my-input-fields" name="last_name" type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                            <input required className="my-input-fields" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <input required className="my-input-fields" name="phone" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <textarea required className="my-input-fields h-[118px] resize-none" name="address" type="text" placeholder="Address (Please put a detailed address as your purchases will be shipped in that location)" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <div className='text-center small-headings m-5'>
                        <label>
                            <input type="checkbox" checked={saveChecked} onChange={handleCheckChange} />
                            Save this data for next time.
                        </label>
                    </div>

                    <div className='flex justify-center items-center'>
                        <button type='submit' className='my-btns'>Save</button>
                    </div>

                </form>
            </div>}

            <div className='m-5 py-5 border-t-4'>
                <p className='small-headings text-left m-0'>Delivery Option</p>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={deliveryValue}
                        onChange={handleDeliveryChange}
                    >
                        <FormControlLabel value="inside-cumilla" control={<Radio />} label="Inside Cumilla (50TK)" />
                        <FormControlLabel value="outside-cumilla" control={<Radio />} label="Outside Cumilla (100TK)" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}
