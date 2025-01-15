'use client'

import { ROLE } from '@/constants';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminTabs = [
    {
        label: 'Users',
        value: 'users'
    },
    {
        label: 'Maps',
        value: 'maps'
    },
    {
        label: 'Elements',
        value: 'elements'
    }
]

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const loggedinUser = useSelector((state: RootState) => state.user);
    const activeTab = pathname.split('/').pop();

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
        <div className='flex justify-between items-center md:max-w-5xl mx-auto p-5'>
            <div role="tablist" className="tabs tabs-bordered tabs-lg w-full">
                {AdminTabs.map((tab) => (
                    <Fragment key={tab.value}>
                        <Link
                            role="tab"
                            href={`/admin/${tab.value}`}
                            className={`tab ${tab.value === activeTab ? 'tab-active' : ''}`}
                        >
                            {tab.label}
                        </Link>
                        {
                            tab.value === activeTab && (
                                <div role="tabpanel" aria-labelledby={activeTab} className="tab-content md:p-5 py-5">{children}</div>
                            )
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default AdminLayout