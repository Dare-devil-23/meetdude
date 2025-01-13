'use client'

import React, { useEffect, useState } from 'react'
import { getAvailableAvatars, updateUserAvatar } from '@/services/user'
import { Avatar } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const AvatarUpdatePage = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const loggedinUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getAvailableAvatars().then((response) => {
      setAvatars(response.avatars);
    });
  }, []);

  const handleUpdateAvatar = () => {
    if (selectedAvatar) {
      updateUserAvatar({
        avatarId: selectedAvatar.id
      }).then(() => {
        toast.success('Avatar updated successfully');
        if (searchParams.get('ref') === 'profile') {
          router.replace('/profile');
        } else {
          router.replace('/');
        }
      }).catch((error) => {
        toast.error('Failed to update avatar');
        console.log(error);
      });
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full mx-5 md:mx-10'>
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-semibold mb-2'>Choose your avatar</h1>
        {!loggedinUser?.avatarId && <p className='text-sm text-gray-500 mb-10 text-center'>You can change your avatar anytime in your profile, select one to continue</p>}
      </div>
      <div className='grid grid-cols-12 gap-5 lg:gap-10 lg:max-w-5xl'>
        {avatars.map((avatar) => (
          <button key={avatar.id} className={`card col-span-6 md:col-span-4 lg:col-span-3 shadow-xl ${selectedAvatar?.id === avatar.id ? 'bg-accent text-accent-content' : 'bg-neutral text-neutral-content'}`} onClick={() => setSelectedAvatar(avatar)}>
            <figure className='p-5'>
              <img
                src={`${avatar.imageUrl}?id=${avatar.id}`}
                alt={avatar.name}
                />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {avatar.name}
              </h2>
            </div>
          </button>
        ))}
      </div>
      <button className='btn btn-primary mt-5' disabled={!selectedAvatar} onClick={handleUpdateAvatar}>Update Avatar</button>
    </div>
  )
}

export default AvatarUpdatePage