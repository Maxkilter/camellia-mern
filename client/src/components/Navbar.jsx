import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const handleOut = (event) => {
        event.preventDefault();
        auth.logOut();
        history.push('/');
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-4" style={{padding: '0 4rem'}}>
                <a href="/" className="brand-logo">Links shortening</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/crete'>Create</NavLink></li>
                    <li><NavLink to='/links'>Links</NavLink></li>
                    <li><a href="/" onClick={handleOut}>Log Out</a></li>
                </ul>
            </div>
        </nav>
    )
}
