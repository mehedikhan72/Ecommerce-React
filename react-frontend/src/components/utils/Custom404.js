import React from "react";
import { Link } from "react-router-dom";

export default function Custom404() {
    return (
        <div className="text-center mt-20">
            <h1 className="m-5 small-headings">404 - Page Not Found!</h1>
            <h3 className="m-5 small-headings">You sure you're in the right place?</h3>
            <Link to={{ pathname: `/` }}><button className="my-btns sm:my-big-btns">Continue Shopping</button></Link>
        </div>
    )
}