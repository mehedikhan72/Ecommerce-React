import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { CartIcon } from '@heroicons/react/outline'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { SignInIcon } from '@heroicons/react/outline'
import { useState } from 'react'


export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    }

    return (
        <div className='w-screen h-[60px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
            <div className='px-2 flex justify-between items-center w-full h-full'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-bold mr-4 sm:text-3xl'>HalalBrothers</h1>

                </div>
                <div className='hidden sm:flex pr-2 items-center'>
                    <ul className='hidden sm:flex'>
                        <li className='nav-list font-bold'><div className='flex items-center'><i className='bx bx-home text-xl p-1'></i>HOME</div></li>
                        <li className='nav-list font-bold'><div className='flex items-center'><i className='bx bx-cart text-xl p-1'></i>Cart</div></li>
                    </ul>
                    <button>LOGIN</button>
                </div>
                <div className='sm:hidden'>
                    {!navOpen && <MenuIcon onClick={toggleNav} className='w-5' />}
                    {navOpen && <XIcon onClick={toggleNav} className='w-5' />}
                </div>
            </div>

            {navOpen && <ul className='absolute bg-zinc-200 w-full px-8 text-center sm:hidden'>
                <li className='border-b-2 border-zinc-300 w-full py-4'><div className='flex items-center justify-center'><i className='bx bx-home text-xl p-1'></i>HOME</div></li>
                <li className='border-b-2 border-zinc-300 w-full py-4'><div className='flex items-center justify-center'><i className='bx bx-cart text-xl p-1'></i>Cart</div></li>
                <div className='py-4'>
                    <button>LOGIN</button>
                </div>
            </ul>}

        </div>
    )
}