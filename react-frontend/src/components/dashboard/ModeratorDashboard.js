import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom';
import Options from './Options';
import AddProduct from './AddProduct';
import AddCategory from './AddCategory';
import ViewOrders from './ViewOrders';
import ManageModerators from './ManageModerators';
import axios from '../axios/AxiosSetup';
import UnansweredQuestions from './UnansweredQuestions';

export default function ModeratorDashboard() {
    const { user } = useContext(AuthContext);
    const [addProductViewOn, setAddProductViewOn] = useState(false);
    const [viewOrdersViewOn, setViewOrdersViewOn] = useState(true);
    const [manageModeratorsViewOn, setManageModeratorsViewOn] = useState(false);
    const [unansweredQuestionsViewOn, setUnansweredQuestionsViewOn] = useState(false);

    return (
        <div>
            {user && (user.is_moderator || user.is_admin) &&
                <div>
                    <p className='normal-headings'>Welcome to moderator dashboard, {user.first_name}!</p>
                    <Options
                        setAddProductViewOn={setAddProductViewOn}
                        setViewOrdersViewOn={setViewOrdersViewOn}
                        setManageModeratorsViewOn={setManageModeratorsViewOn}
                        setUnansweredQuestionsViewOn={setUnansweredQuestionsViewOn}
                    />
                    <div className='m-10'>
                        {addProductViewOn && <AddProduct />}
                        {viewOrdersViewOn && <ViewOrders />}
                        {manageModeratorsViewOn && <ManageModerators />}
                        {unansweredQuestionsViewOn && <UnansweredQuestions />}
                    </div>
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

