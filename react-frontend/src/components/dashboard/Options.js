import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Options(props) {
    const { user } = useContext(AuthContext);
    const enableViewOrders = () => {
        props.setViewOrdersViewOn(true)
        props.setAddProductViewOn(false)
        props.setAddCategoryViewOn(false)
        props.setManageModeratorsViewOn(false)
    }

    const enableAddProduct = () => {
        props.setViewOrdersViewOn(false)
        props.setAddProductViewOn(true)
        props.setAddCategoryViewOn(false)
        props.setManageModeratorsViewOn(false)
    }

    const enableAddCategory = () => {
        props.setViewOrdersViewOn(false)
        props.setAddProductViewOn(false)
        props.setAddCategoryViewOn(true)
        props.setManageModeratorsViewOn(false)
    }

    const enableManageModerators = () => {
        props.setViewOrdersViewOn(false)
        props.setAddProductViewOn(false)
        props.setAddCategoryViewOn(false)
        props.setManageModeratorsViewOn(true)
    }

    return (
        <div className='flex flex-wrap justify-center items-center'>
            <button onClick={enableViewOrders} className='my-btns m-3 w-[200px]'>View Orders</button>
            <button onClick={enableAddProduct} className='my-btns m-3 w-[200px]'>Add Product</button>
            <button onClick={enableAddCategory} className='my-btns m-3 w-[200px]'>Add Category</button>
            {user && user.is_admin && <button onClick={enableManageModerators} className='my-btns m-3 w-[200px]'>Manage Moderators</button>}
        </div>
    )
}
