'use client'

import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const loggedinUser = useSelector((state: RootState) => state.user);
    const router = useRouter();

    const handleUpdateAvatar = () => {
        router.push('/profile/update-avatar?ref=profile');
    }

    return (
        <div className="flex flex-col items-center justify-center px-5 md:px-10">
            <div className='text-2xl font-semibold mb-5 md:mb-10'>
                Update your profile
            </div>
            <div className='grid grid-cols-12 gap-5 w-full md:max-w-5xl mx-auto'>
                <div className='col-span-12 md:col-span-4'>
                    <div className="card card-compact bg-neutral text-neutral-content shadow-xl">
                        <figure className='p-5'>
                            <img
                                src={`${loggedinUser?.avatar?.imageUrl}`}
                                alt={loggedinUser?.avatar?.name || undefined}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title px-5">{loggedinUser?.avatar?.name}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={handleUpdateAvatar}>Update Avatar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 md:col-span-8'>
                    <div className='card card-compact bg-neutral text-neutral-content shadow-xl'>
                        <div className='card-body'>
                            <h2 className='card-title'>User Information</h2>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <div>
                                        Username
                                    </div>
                                    <div className='text-lg font-semibold'>
                                        {loggedinUser?.username}
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div>
                                        Email
                                    </div>
                                    <div className='text-lg font-semibold'>
                                        {loggedinUser?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage