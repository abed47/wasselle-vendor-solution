import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';

const NAVBAR = (props) => {

    const [currentPage, setCurrentPage] = useState('dashboard');

    return(
        <nav className="navbar__container">
            <div className="navbar__links_container">
                <ul>
                    <li onClick={() => setCurrentPage('dashboard')} className={currentPage === 'dashboard' ? 'active' : ''}>
                        <Link to="/" className="navbar__link_item"> DASHBOARD </Link>
                    </li>
                    <li onClick={() => setCurrentPage('items')} className={currentPage === 'items' ? 'active' : ''}>
                        <Link to="/items" className="navbar__link_item">ITEMS</Link>
                    </li>
                    <li onClick={() => setCurrentPage('orders')} className={currentPage === 'orders' ? 'active' : ''}>
                        <Link to="/orders" className="navbar__link_item">ORDERS</Link>
                    </li>
                    <li onClick={() => setCurrentPage('reports')} className={currentPage === 'reports' ? 'active' : ''}>
                        <Link to="/reports" className="navbar__link_item">REPORTS</Link>
                    </li>
                    <li>
                        <Button className="navbar__btn primary">LOGOUT</Button>
                    </li>
                </ul>
            </div>
            <div className="navbar__rendered_components">
                {
                    props.children
                }
            </div>
        </nav>
    )
};

export default NAVBAR;