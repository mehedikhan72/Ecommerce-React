import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {

    let { loginUser } = useContext(AuthContext);
    let { user } = useContext(AuthContext);
    let { message } = useContext(AuthContext);
    console.log(user)

    return (
        <div>
            {user && <Navigate to="/" />}
            <p className="normal-headings">Welcome To Halal Brothers!</p>
            <div className="flex justify-center">
                <div className="border-2 border-solid w-[350px] h-fit px-5 pb-5 rounded-md">
                    <p className="normal-headings">Login!</p>
                    {message && <p className="text-red-500 text-center font-bold text-xl mb-3">{message}</p>}
                    <form onSubmit={loginUser}>
                        <div className="flex flex-col items-center justify-center">
                            <input className="my-input-fields" name="email" type="text" placeholder="Email" />
                            <input className="my-input-fields" name="password" type="password" placeholder="Password" />
                            <button type="submit" className="my-btns w-[300px] mb-3">Login</button>
                        </div>
                        <div className="flex justify-center">
                            <hr className="border-1 border-solid w-[300px] border-black my-3" />
                        </div>
                        <p className="font-bold">Don't have an account? <Link className="text-indigo-500 underline" to={{ pathname: `/register/` }}>Register here.</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}