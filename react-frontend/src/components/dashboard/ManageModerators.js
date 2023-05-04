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
    const [event, setEvent] = useState(null);
    const removeBtnClicked = (id, first_name, last_name) => {
        setMessage(`Are you sure you want to remove ${first_name} ${last_name} from moderators?`)
        setEvent("remove-moderators");
        setSelectedModId(id);
        setShowConfirmation(true);
    }

    const addBtnClicked = (id, first_name, last_name) => {
        setMessage(`Are you sure you want to add ${first_name} ${last_name} as a moderator?`);
        setEvent("add-moderators");
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

    // Adding mods
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const searchUsers = async () => {
            try {
                if (query) {
                    const response = await axios.get(`get_users/${query}`);
                    setUsers(response.data);
                    console.log(response.data);
                }
                else {
                    setUsers([]);
                }
            } catch (error) {
                console.log(error);
            }
        }

        // setTimeout(() => {
        //     searchUsers();
        // }, 1000);

        searchUsers();

    }, [query, modChanged]);

    return (
        <div>
            {showConfirmation && <Confirmation message={message} yesClicked={changeModStatus} noClicked={noClicked} event={event}/>}
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
                                <button onClick={() => removeBtnClicked(moderator.id, moderator.first_name, moderator.last_name)} className='my-btns'>Remove</button>
                            </div>
                            <hr className='border-black my-1' />
                        </div>
                    ))}
                </div>}

                {currentMods.length === 0 && <div className='flex justify-center items-center'>
                    <p className='small-headings'>No current moderators.</p>
                </div>}

                <div className='my-10 md:my-20'>
                    <p className='small-headings text-left ml-2'>Add Moderators</p>
                    <input placeholder='Search Users' className='my-input-fields ml-2' onChange={(e) => setQuery(e.target.value)} />

                    {users.length > 0 && <div>
                        <p className='small-headings text-left ml-2'>Available Users</p>
                        {users.map((user) => (
                            <div key={user.id} className='m-1 p-1 py-2'>
                                <div className='flex justify-between items-center'>
                                    <p className='normal-text ml-0'>{user.first_name} {user.last_name}({user.username})</p>
                                    <button onClick={() => addBtnClicked(user.id, user.first_name, user.last_name)} className='my-btns'>Add</button>
                                </div>
                                <hr className='border-black my-1' />
                            </div>
                        ))}
                    </div>}

                    {users.length === 0 && query !== '' &&  <div>
                        <p className='small-headings text-left m-1 p-1'>No users found.</p>
                    </div>}
                </div>
            </div>}
        </div>
    )
}