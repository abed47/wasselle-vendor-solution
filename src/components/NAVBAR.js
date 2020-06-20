import React from 'react';
import {Link} from 'react-router-dom';

const NAVBAR = (props) => {
    return(
        <nav className="navbar__container">
            <ul>
                <li>
                    <Link to="/dashboard"> DASHBOARD </Link>
                </li>
                <li>
                    <Link to="/items">ITEMS</Link>
                </li>
            </ul>
        </nav>
    )
};

export default NAVBAR;