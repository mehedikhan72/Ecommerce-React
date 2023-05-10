import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Confirmation from './utils/Confirmation';


export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

    const { user } = useContext(AuthContext);
    const { logoutUser } = useContext(AuthContext);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    }

    const [userOptionsOn, setUserOptionsOn] = useState(false);

    const toggleUserOptions = () => {
        setUserOptionsOn(!userOptionsOn);
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserOptionsOn(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const message = "Are you sure you want to log out?"

    const logout = () => {
        setShowConfirmation(false);
        setUserOptionsOn(false);
        logoutUser();
    }

    const noClicked = () => {
        setShowConfirmation(false);
    }

    const logoutClicked = () => {
        setShowConfirmation(true);
    }

    useEffect(() => {
        if (showConfirmation) {
            document.body.classList.add('disabled-scroll');
        }
        else {
            document.body.classList.remove('disabled-scroll');
        }
    }, [showConfirmation])

    let cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const [cartItemCount, setCartItemcount] = useState(cartItems.length);

    useEffect(() => {
        cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setCartItemcount(cartItems.length);
    }, [localStorage.getItem('cart')])


    return (
        <div>
            {showConfirmation && <Confirmation message={message} yesClicked={logout} noClicked={noClicked} event={"logout"} />}
            <div className='relative w-screen h-[50px] sm:h-[70px] lg:h-[90px] bg-black text-white drop-shadow-lg z-[9999]'>
                <div className='px-8 flex justify-between items-center w-full h-full'>
                    <div className='flex items-center'>
                        <h1 className='text-2xl font-bold mr-4 sm:text-3xl'>HalalBrothers</h1>

                    </div>
                    <div className='hidden sm:flex pr-5 items-center'>
                        <ul className='hidden sm:flex'>
                            <Link to={{ pathname: '/' }}><li className='nav-list font-bold'><div className='flex items-center'><i className='bx bx-home text-xl p-1'></i>HOME</div></li></Link>
                            <div className='relative'>
                                <Link to={{ pathname: '/cart ' }}>
                                    <li className='nav-list font-bold'>
                                        <div className='flex items-center'>
                                            <i className='bx bx-cart text-xl p-1'>
                                            </i>CART
                                            {cartItemCount > 0 && <p className='absolute text-center right-1 top-3 h-6 w-6 rounded-full text-black bg-white'>{cartItemCount}</p>}
                                        </div>
                                    </li>
                                </Link>
                            </div>
                        </ul>
                        {!user && <Link to={{ pathname: '/login' }}><button className='my-btns ml-5'>LOGIN</button></Link>}
                        {user &&
                            <div onClick={toggleUserOptions} className='flex items-center justify-center'>
                                <i className='bx bx-user text-xl p-1'></i>
                                <p className='font-bold cursor-pointer'>{user.first_name.toUpperCase()}</p>
                            </div>}
                    </div>
                    <div className='sm:hidden'>
                        {!navOpen && <MenuIcon onClick={toggleNav} className='w-5' />}
                        {navOpen && <XIcon onClick={toggleNav} className='w-5' />}
                    </div>
                </div>

                {navOpen && <ul className='absolute bg-black text-white w-full px-8 text-center sm:hidden'>
                    <Link to={{ pathname: '/' }}><li className='border-b-2 border-zinc-300 w-full py-4'><div className='flex items-center justify-center font-bold'><i className='bx bx-home text-xl p-1'></i>HOME</div></li></Link>
                    <div className='relative'>
                        <Link to={{ pathname: '/cart ' }}>
                            <li className='border-b-2 border-zinc-300 w-full py-4'>
                                <div className='flex items-center justify-center font-bold'>
                                    <i className='bx bx-cart text-xl p-1'></i>
                                    CART
                                </div>
                            </li>
                        </Link>
                    </div>
                    <div className='py-4'>
                        {!user && <Link to={{ pathname: '/login' }}><button className='my-btns'>LOGIN</button></Link>}
                        {user && <div onClick={toggleUserOptions} className='flex justify-center items-center'>
                            <i className='bx bx-user text-xl p-1'></i>
                            <p className='font-bold cursor-pointer'>{user.first_name.toUpperCase()}</p>
                        </div>}
                    </div>
                </ul>}

                {userOptionsOn && <div ref={dropdownRef} className='z-[9999] flex flex-col items-center justify-center border border-gray-500 bg-white m-5 p-5 w-[210px] rounded-md top-56 sm:top-12 right-10 fixed '>
                    <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: `/account/edit` }}><button className='my-btns w-[160px] m-1'><div className='flex justify-center items-center'><i class='bx bxs-edit text-xl m-1'></i><p>Edit Account</p></div></button></Link>
                    <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: `/${user.username}/orders` }}><button className='my-btns w-[160px] m-1'><div className='flex justify-center items-center'><i class='bx bx-shopping-bag text-xl m-1' ></i><p>Track Orders</p></div></button></Link>
                    <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: '/saved-products' }}><button className='my-btns w-[160px] m-1'><div className='flex justify-center items-center'><i class='bx bx-bookmarks text-xl m-1' ></i><p>Saved</p></div></button></Link>
                    {user.is_admin && <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: '/dashboard/admin' }}><button className='my-btns w-[160px] m-1'><div className='flex justify-center items-center'><i class='bx bxs-dashboard text-xl m-1' ></i><p>Admin</p></div></button></Link>}
                    {user.is_moderator && !user.is_admin && <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: '/dashboard/moderator' }}><button className='my-btns w-[160px] m-1'><div className='flex justify-center items-center'><i class='bx bxs-dashboard text-xl m-1' ></i><p>Moderator</p></div></button></Link>}
                    <button onClick={logoutClicked} className='my-btns w-[160px] mt-1'><div className='flex justify-center items-center'><i class='bx bx-log-out text-xl mx-1 mt-[2px]'></i><p>Logout</p></div></button>
                </div>}
            </div>
        </div>
    )
}