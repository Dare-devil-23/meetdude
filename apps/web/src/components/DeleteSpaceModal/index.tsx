import React from 'react'
import { deleteSpaceApi } from '@/services/space';
import { Space } from '@/types';

interface DeleteSpaceModalProps {
    spaceId: string | null;
    spaces: Space[];
    setSpaces: (spaces: Space[]) => void;
    setSpaceId: (spaceId: string | null) => void;
}

const DeleteSpaceModal = (props: DeleteSpaceModalProps) => {
    const { spaceId, spaces, setSpaces, setSpaceId } = props;

    const handleDeleteSpace = (spaceId: string | null) => {
        if (!spaceId) return;
        deleteSpaceApi(spaceId).then(() => {
            setSpaces(spaces.filter((space) => space.id !== spaceId));
            setSpaceId(null);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <dialog id="delete-space-modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this space?</h3>
                    <p className="py-4">This action cannot be undone.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex gap-5">
                                <button className="btn btn-ghost">Cancel</button>
                                <button onClick={() => handleDeleteSpace(spaceId)} className="btn btn-error">Yes Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default DeleteSpaceModal