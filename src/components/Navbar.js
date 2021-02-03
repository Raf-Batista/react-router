import React from 'react'
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link exact to="/A">A</Link>
            <Link exact to="/B">B</Link>
            <NavLink exact activeClassName='active-link' to='/C'>C</NavLink>
        </div>
    )
}

export default Navbar
