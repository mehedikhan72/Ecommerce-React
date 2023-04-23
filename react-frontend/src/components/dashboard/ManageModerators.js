import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';

export default function AddProduct() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <p className='normal-headings'>Manage Moderators!</p>
        </div>
    )
}