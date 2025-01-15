'use client'

import { AUTH_TOKEN_KEY, ROLE } from '@/constants';
import { RootState } from '@/store/store';
import { generateGradientFromToken, setSessionStorage } from '@/utils/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const NavBar = () => {
    const router = useRouter();

    const loggedinUser = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        setSessionStorage(AUTH_TOKEN_KEY, "");
        toast.success("Logged out successfully");
        router.push("/login");
    }

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const elem = e.target as HTMLElement;
        if (elem) {
            elem.blur();
        }
    };

    return (
        <div className="navbar bg-base">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">MeetDude</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full" style={{ background: loggedinUser.id ? generateGradientFromToken() : "#000" }} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow-md">
                        <li onClick={handleClick}>
                            <Link href="/profile" className="justify-between">
                                Profile
                                <span className="badge badge-primary">New</span>
                            </Link>
                        </li>
                        {
                            loggedinUser?.role === ROLE.ADMIN && (
                                <li onClick={handleClick}>
                                    <Link href="/admin/users">
                                        Admin Dashboard
                                    </Link>
                                </li>
                            )
                        }
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar