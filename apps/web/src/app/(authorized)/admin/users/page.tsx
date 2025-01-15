'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { getUsersApi } from '@/services/user'
import { User } from '@/types'
import AdminUsersLoading from './loading'
import UpdateUserRoleModal from '@/components/UpdateUserRoleModal'

const AdminUsersPage: React.FC = (): React.ReactElement => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUserId, setSelectedUserId] = useState('');
  const [toggleUsers, setToggleUsers] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    getUsersApi().then((users) => {
      setUsers(users)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [toggleUsers])

  const handleOnClickUpdate = (id: string) => {
    setSelectedUserId(id);
    const updateUserModal = document.getElementById('update-user-role-modal');
    if (updateUserModal && updateUserModal instanceof HTMLDialogElement) {
      updateUserModal.showModal();
    }
  }

  if (isLoading) {
    return <AdminUsersLoading />;
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop */}
      <table className="md:table bg-neutral text-neutral-content hidden">
        <thead>
          <tr>
            <th>Details</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.avatar?.imageUrl || '/images/avatar-fallback.png'}
                          alt={user.avatar?.name || 'Avatar'} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.username}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="badge badge-primary badge-outline">{user.role}</div>
                </td>
                <th>
                  <button onClick={() => handleOnClickUpdate(user.id)} className="btn btn-ghost btn-xs">
                    Update
                  </button>
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* Mobile */}
      <div className="flex md:hidden w-full flex-col">
        {
          users?.map((user) => (
            <Fragment key={user.id}>
              <div className="card bg-neutral text-neutral-content shadow-300">
                <div className="flex items-center gap-3 p-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.avatar?.imageUrl || '/images/avatar-fallback.png'}
                        alt={user.avatar?.name || 'Avatar'} />
                    </div>
                  </div>
                  <div className='grow w-36'>
                    <div className='flex gap-2 items-center'>
                      <div className="font-bold truncate">{user.username}</div>
                      <div className="opacity-50 badge badge-sm badge-primary badge-outline">{user.role}</div>
                    </div>
                    <div className="text-sm opacity-50 truncate">{user.email}</div>
                  </div>
                  <div>
                    <button onClick={() => handleOnClickUpdate(user.id)} className="btn btn-ghost btn-xs">
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
            </Fragment>
          ))
        }
      </div>
      <UpdateUserRoleModal
        userId={selectedUserId}
        role={users.find((user) => user.id === selectedUserId)?.role}
        setUserId={setSelectedUserId}
        setToggleUsers={setToggleUsers}
      />
    </div>
  )
}

export default AdminUsersPage