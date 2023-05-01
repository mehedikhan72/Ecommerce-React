import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { useNavigate } from 'react-router-dom';


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

    const logoutClicked = () => {
        setUserOptionsOn(false);
        logoutUser();
    }

    //TODO: Add logout confirmation.


    return (
        <div className='w-screen h-[50px] sm:h-[70px] lg:h-[90px] z-10 bg-black text-white drop-shadow-lg'>
            <div className='px-8 flex justify-between items-center w-full h-full'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-bold mr-4 sm:text-3xl'>HalalBrothers</h1>

                </div>
                <div className='hidden sm:flex pr-5 items-center'>
                    <ul className='hidden sm:flex'>
                        <Link to={{ pathname: '/' }}><li className='nav-list font-bold'><div className='flex items-center'><i className='bx bx-home text-xl p-1'></i>HOME</div></li></Link>
                        <Link to={{ pathname: '/cart ' }}><li className='nav-list font-bold'><div className='flex items-center'><i className='bx bx-cart text-xl p-1'></i>CART</div></li></Link>
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
                <Link to={{ pathname: '/cart ' }}><li className='border-b-2 border-zinc-300 w-full py-4'><div className='flex items-center justify-center font-bold'><i className='bx bx-cart text-xl p-1'></i>CART</div></li></Link>
                <div className='py-4'>
                    {!user && <Link to={{ pathname: '/login' }}><button className='my-btns'>LOGIN</button></Link>}
                    {user && <div onClick={toggleUserOptions} className='flex justify-center items-center'>
                        <i className='bx bx-user text-xl p-1'></i>
                        <p className='font-bold cursor-pointer'>{user.first_name.toUpperCase()}</p>
                    </div>}
                </div>
            </ul>}

            {userOptionsOn && <div ref={dropdownRef} className='flex flex-col items-center justify-center border border-gray-500 bg-white m-5 p-5 w-[200px] rounded-md z-[999] top-56 sm:top-12 right-10 fixed '>
                <button className='my-btns w-[150px] m-1'>Edit Account</button>
                <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: `/${user.username}/orders` }}><button className='my-btns w-[150px] m-1'>Track Orders</button></Link>
                <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: '/saved-products' }}><button className='my-btns w-[150px] m-1'>Saved Products</button></Link>
                {user.is_admin && <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: '/dashboard/admin' }}><button className='my-btns w-[150px] m-1'>Admin Dashboard</button></Link>}
                {user.is_moderator && !user.is_admin && <Link onClick={() => setUserOptionsOn(false)} to={{ pathname: '/dashboard/moderator' }}><button className='my-btns w-[150px] m-1'>Moderator Dashboard</button></Link>}
                <button onClick={logoutClicked} className='my-btns w-[150px] mt-1'>Logout</button>
            </div>}
        </div>
    )
}