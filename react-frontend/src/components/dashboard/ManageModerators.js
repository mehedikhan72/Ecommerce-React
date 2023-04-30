import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';

export default function AddProduct() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {user && user.is_admin && <div>
                <p className='normal-headings'>Manage Moderators!</p>
            </div>}
            {(!user || !user.is_admin) && <div>
                <div className='flex justify-center items-center'>
                    <p className='error-text text-center w-3/4'>You are not authorized to view this page.</p>
                </div>
            </div>}
        </div>
    )
}