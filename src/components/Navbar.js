import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <div className="navbar">
            <h2 className="navbar-logo">Photo of the day</h2>
            <Link className="navbar-item" to="/">Take me Home</Link>
        </div>
    )
}