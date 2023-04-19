import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Loading from "../utils/Loading";

export default function Register() {
    let { user } = useContext(AuthContext);
    let { loginUser } = useContext(AuthContext);

    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirm_password) {
            const data = { first_name, last_name, email, phone, address, password };
            fetch('http://localhost:8000/api/register/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        setMessage(data.error);
                    }
                    else {
                        console.log("logging in")
                        loginUser(e);
                    }
                })
                .catch(error => console.log(error));
        }
        else {
            setMessage("Passwords don't match");
        }
    }

    // TODO: Remove search box from login and reg page.

    return (
        <div>
            <div>
                {user && <Navigate to="/" />}
                <p className="normal-headings">Welcome To Halal Brothers!</p>
                <div className="flex justify-center">
                    <div className="border-2 border-solid w-full mx-10 mb-10 md:w-[700px] h-fit px-2 md:px-5 pb-5 rounded-md">
                        <p className="normal-headings">Register!</p>
                        {message && <p className="text-red-500 text-center font-bold text-xl mb-3">{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <div className="flex flex-col items-center justify-center">
                                    <input required className="my-input-fields" name="first_name" type="text" placeholder="First Name" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                                    <input required className="my-input-fields" name="last_name" type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                                    <input required className="my-input-fields" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input required className="my-input-fields" name="phone" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <textarea required className="my-input-fields h-[118px] resize-none" name="address" type="text" placeholder="Address (Please put a detailed address as your purchases will be shipped in that location)" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    <input required className="my-input-fields" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <input required className="my-input-fields" name="confirm_password" type="password" placeholder="Confirm Password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <button type="submit" className="my-btns w-[300px] my-3">Register</button>
                                <hr className="border-1 border-solid w-[300px] border-black my-3" />
                                <p className="font-bold">Already own an account? <Link className="text-indigo-500 underline" to={{ pathname: `/login` }}>Login here.</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}