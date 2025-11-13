import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(error => console.log(error));
    }

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-reviews">All Reviews</NavLink></li>
        </>
    );

    const userDropdown = (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img alt="User Avatar" src={user?.photoURL || 'https://i.ibb.co/T0b1L0b/user-icon.png'} />
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/add-review">Add Review</Link></li>
                <li><Link to="/my-reviews">My Reviews</Link></li>
                <li><Link to="/my-favorites">My Favorites</Link></li>
                <li className="mt-2">
                    <button onClick={handleLogOut} className="btn btn-sm btn-error text-white">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
                    LocalFoodLovers
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    userDropdown
                ) : (
                    <Link to="/login" className="btn btn-primary">
                        Login / Register
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;