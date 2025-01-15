import React from 'react'

const AdminUsersLoading = () => {
  return (
    <table className="table table-auto bg-neutral text-neutral-content table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th className="bg-neutral text-neutral-content rounded-tl-[1.2rem]">Details</th>
            <th className="bg-neutral text-neutral-content">Role</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 skeleton" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="font-bold skeleton w-24 h-4" />
                      <div className="text-sm opacity-50 skeleton w-24 h-2" />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="skeleton w-24 h-4" />
                </td>
                <th className={`bg-neutral text-neutral-content ${index === 9 ? 'rounded-br-[1.2rem]' : ''}`}>
                  <div className="skeleton w-24 h-6" />
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
  )
}

export default AdminUsersLoading