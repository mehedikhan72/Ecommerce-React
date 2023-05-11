import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='py-10 text-white bg-black mt-10 md:mt-20'>
            <div className='flex flex-col lg:flex-row'>
                <div className='w-full lg:w-1/3 flex flex-col justify-center my-5'>
                    <p className='small-headings ml-0'>Contact us</p>
                    <div className='flex justify-center items-center'>
                        <i className='bx bx-phone normal-text ml-0 text-xl'></i>
                        <p className='normal-text ml-0'>017********</p>

                    </div>
                    <div className='flex justify-center items-center'>
                        <i className='bx bx-envelope normal-text ml-0 text-xl'></i>
                        <p className='normal-text ml-0'>halalbrothers@gmail.com</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <i className='bx bxl-facebook-circle normal-text ml-0 text-xl'></i>
                        <a className='normal-text ml-0 hover:underline hover:text-indigo-500'
                            href='https://www.facebook.com/halalvaibro'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Facebook page
                        </a>
                    </div>
                </div>
                <div className='w-full lg:w-1/3 flex flex-col justify-center items-center my-5'>
                    <p className='small-headings ml-0'>Comilla Outlet</p>
                    <p className='normal-text ml-0'>Shop No 69</p>
                    <p className='normal-text ml-0'>Anando City Center</p>
                    <p className='normal-text ml-0'>Kandirpar, Comilla</p>
                </div>
                <div className='w-full lg:w-1/3 flex flex-col justify-center items-center my-5'>
                    <p className='small-headings ml-0'>Legal</p>
                    <Link to={{ pathname: `/terms-of-service` }}><p className='hover:underline hover:text-indigo-500 normal-text ml-0'>Terms of service</p></Link>
                    <Link to={{ pathname: `/refund-policy` }}><p className='hover:underline hover:text-indigo-500 normal-text ml-0'>Refund policy</p></Link>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center mx-0 md:mx-10 my-10'>
                <div className='flex justify-center items-center'>
                    <p className="normal-text mx-2">Copyright 2023</p><i class='normal-text mx-0 bx bx-copyright'></i><p className="normal-text mx-2">Halal Brothers Limited</p>
                </div>

                <div className='flex justify-center items-center'>
                    <p className='normal-text mx-2'>Developed by</p>
                    <a
                        className="normal-text mx-0 hover:underline hover:text-indigo-500"
                        href="https://mehedikhan72.github.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Mehedi Khan
                    </a>

                </div>
            </div>
        </div>

    )
}
