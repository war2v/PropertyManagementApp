import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

export default function LogOut() {
    const logout = () => {
        localStorage.removeItem("token");
        setAuth(false);
        }
    return (
        <Fragment>
            <Link to='#' onClick={() => logout()} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
            </Link>
        </Fragment>
    )
}
