import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom';
import Options from './Options';
import AddProduct from './AddProduct';
import AddCategory from './AddCategory';
import ViewOrders from './ViewOrders';
import ManageModerators from './ManageModerators';
import axios from '../axios/AxiosSetup';

export default function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const [addProductViewOn, setAddProductViewOn] = useState(false);
    const [addCategoryViewOn, setAddCategoryViewOn] = useState(false);
    const [viewOrdersViewOn, setViewOrdersViewOn] = useState(true);
    const [manageModeratorsViewOn, setManageModeratorsViewOn] = useState(false);

    return (
        <div>
            {user && user.is_admin &&
                <div>
                    <p className='normal-headings'>Welcome to admin dashboard, {user.first_name}!</p>
                    <Options
                        setAddProductViewOn={setAddProductViewOn}
                        setAddCategoryViewOn={setAddCategoryViewOn}
                        setViewOrdersViewOn={setViewOrdersViewOn}
                        setManageModeratorsViewOn={setManageModeratorsViewOn}
                    />
                    <div className='m-10'>
                        {addProductViewOn && <AddProduct />}
                        {addCategoryViewOn && <AddCategory />}
                        {viewOrdersViewOn && <ViewOrders />}
                        {manageModeratorsViewOn && <ManageModerators />}
                    </div>
                </div>}
            {(!user || !user.is_admin) &&
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