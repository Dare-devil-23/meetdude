import { updateUserRoleApi } from '@/services/auth';
import React from 'react'
import { toast } from 'react-toastify';

type Props = {
    userId: string,
    role?: string,
    setUserId: React.Dispatch<React.SetStateAction<string>>,
    setToggleUsers: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateUserRoleModal: React.FC<Props> = (props: Props) => {

    const { userId, role, setUserId, setToggleUsers } = props;

    const handleUpdateUserRole = () => {
        if (!userId || !role) return;
        updateUserRoleApi({ userId, role: role === "Admin" ? "user" : "admin" }).then(() => {
            setUserId('');
            setToggleUsers((prev) => !prev);
            toast.success("User role updated successfully");
        }).catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        });
    }

    return (
        <dialog id="update-user-role-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update User Role</h3>
                <p className="py-4">Are you sure you want to update the {role} to {role === "Admin" ? "User" : "Admin"}?</p>
                <div className="modal-action">
                    <form method="dialog">
                        <div className="flex gap-5">
                            <button className="btn btn-ghost">Cancel</button>
                            <button onClick={() => handleUpdateUserRole()} className="btn btn-primary">Yes Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default UpdateUserRoleModal