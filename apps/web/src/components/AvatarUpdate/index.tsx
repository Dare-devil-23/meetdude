'use client'

import React, { useEffect, useState } from 'react'
import { getAvailableAvatars, updateUserAvatar } from '@/services/user'
import { Avatar } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface AvatarUpdateProps {
  showNote?: boolean;
}

const AvatarUpdate = ({ showNote = true }: AvatarUpdateProps) => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const router = useRouter();

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
        router.push('/');
      }).catch((error) => {
        toast.error('Failed to update avatar');
        console.log(error);
      });
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full mx-10'>
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-semibold mb-2'>Choose your avatar</h1>
        {showNote && <p className='text-sm text-gray-500 mb-10'>You can change your avatar anytime, select one to continue</p>}
      </div>
      <div className='flex gap-5 flex-wrap'>
        {avatars.map((avatar) => (
          <button key={avatar.id} className={`card w-52 shadow-xl ${selectedAvatar?.id === avatar.id ? 'bg-accent text-accent-content' : 'bg-neutral text-neutral-content'}`} onClick={() => setSelectedAvatar(avatar)}>
            <figure className='p-5 min-h-52'>
              <img
                src={`${avatar.imageUrl}?id=${avatar.id}`}
                alt={avatar.name}
                />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {avatar.name}
                <div className="badge badge-secondary">NEW</div>
              </h2>
            </div>
          </button>
        ))}
      </div>
      <button className='btn btn-primary mt-5' disabled={!selectedAvatar} onClick={handleUpdateAvatar}>Update Avatar</button>
    </div>
  )
}

export default AvatarUpdate