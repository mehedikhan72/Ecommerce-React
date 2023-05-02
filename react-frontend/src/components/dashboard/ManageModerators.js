import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import Loading from '../utils/Loading';
import axios from '../axios/AxiosSetup';
import Confirmation from '../utils/Confirmation';

export default function AddProduct() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [currentMods, setCurrentMods] = useState([]);
    const [modChanged, setModChanged] = useState(false);

    useEffect(() => {
        const getMods = async () => {
            try {
                const response = await axios.get('get_moderators/');
                setCurrentMods(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        }
        getMods();
    }, [modChanged]);

    const [selectedModId, setSelectedModId] = useState(null);
    const changeModStatus = async () => {
        setLoading(true);
        try {
            if (selectedModId) {
                const response = await axios.put(`change_moderator_status/${selectedModId}/`);
                setLoading(false);
                setModChanged(!modChanged);
                setShowConfirmation(false);
                setSelectedModId(null);
                console.log(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    // Dealing with confirmation!
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [message, setMessage] = useState('');
    const btnClicked = (id, first_name, last_name) => {
        setMessage(`Are you sure you want to remove ${first_name} ${last_name} from moderators?`)
        setSelectedModId(id);
        setShowConfirmation(true);
    }

    const noClicked = () => {
        setShowConfirmation(false);
    }

    useEffect(() => {
        if (showConfirmation) {
            document.body.classList.add('disabled-scroll');
        }
        else {
            document.body.classList.remove('disabled-scroll');
        }
    }, [showConfirmation])

    return (
        <div>
            {showConfirmation && <Confirmation message={message} yesClicked={changeModStatus} noClicked={noClicked} />}
            {(!user || !user.is_admin) && <div>
                <div className='flex justify-center items-center'>
                    <p className='error-text text-center w-3/4'>You are not authorized to view this page.</p>
                </div>
            </div>}

            {loading && <Loading />}
            {!loading && user && user.is_admin && <div>
                <p className='normal-headings'>Manage Moderators!</p>
                {currentMods.length > 0 && <div>
                    <p className='small-headings text-left m-1 p-1'>Current moderators</p>
                    {currentMods.map((moderator) => (
                        <div key={moderator.id} className='m-1 p-1 py-2'>
                            <div className='flex justify-between items-center'>
                                <p className='normal-text ml-0'>{moderator.first_name} {moderator.last_name}</p>
                                <button onClick={() => btnClicked(moderator.id, moderator.first_name, moderator.last_name)} className='my-btns'>Remove</button>
                            </div>
                            <hr className='border-black my-1' />
                        </div>
                    ))}
                </div>}

                {currentMods.length === 0 && <div className='flex justify-center items-center'>
                    <p className='small-headings'>No current moderators.</p>
                </div>}
            </div>}
        </div>
    )
}