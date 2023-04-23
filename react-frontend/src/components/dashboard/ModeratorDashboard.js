import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function ModeratorDashboard() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {user && (user.is_moderator || user.is_admin) &&
                <div>
                    <p className='normal-headings'>Welcome to moderator dashboard!</p>
                </div>}
            {(!user || (!user.is_moderator && !user.is_admin)) &&
                <div >
                    <div className='flex justify-center items-center'>
                        <p className='error-text text-center w-3/4'>You are not authorized to view this page.</p>
                    </div>
                    <div className='m-10 text-center'>
                        <Link to={{ pathname: '/' }}><button className='my-btns sm:my-big-btns'>Continue Shopping</button></Link>
                    </div>
                </div>}
        </div>
    )
}
