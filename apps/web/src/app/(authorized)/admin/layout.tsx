'use client'

import { ROLE } from '@/constants';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const router = useRouter();
    const loggedinUser = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (loggedinUser && loggedinUser.role !== ROLE.ADMIN) {
            toast.error('You are not authorized to access this page');
            router.push('/');
        }
    }, [loggedinUser]);

    if (loggedinUser && loggedinUser.role !== ROLE.ADMIN) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}

export default AdminLayout