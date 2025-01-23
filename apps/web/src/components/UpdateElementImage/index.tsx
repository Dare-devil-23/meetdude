import { updateElementImage } from '@/services/user';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

type Props = {
    elementId: string,
    setSelectedEleId: React.Dispatch<React.SetStateAction<string | null>>,
    setToggleElementRender: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateElementImage: React.FC<Props> = (props: Props) => {

    const { elementId, setSelectedEleId, setToggleElementRender } = props;
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleCancel = () => {
        setSelectedEleId(null);
    }

    const handleUpdateElementImage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = {
            imageUrl: e.currentTarget.imageUrl.value
        }
        updateElementImage({
            elementId,
            imageUrl: formData.imageUrl
        }).then(() => {
            setSelectedEleId(null);
            toast.success('Element image updated successfully');
            formRef.current?.reset();
            setToggleElementRender((prev) => !prev);
            const cancelButton = document.getElementById('cancel-update-element-image-modal');
            if (cancelButton && cancelButton instanceof HTMLLabelElement) {
                cancelButton.click();
            }
        }).catch((error) => {
            console.log(error);
            toast.error('Failed to update element image');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <>
            <input type="checkbox" id="update-element-image-modal" className="modal-toggle" />
            <div role="dialog" className="modal modal-bottom md:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Element Image</h3>
                    <form method="dialog" ref={formRef} onSubmit={handleUpdateElementImage}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input type="text" placeholder="eg: https://example.com/element.png" className="input input-bordered" name="imageUrl" />
                        </div>
                        <div className="modal-action">
                            <div className="flex justify-end gap-5">
                                <label id="cancel-update-element-image-modal" className="btn btn-ghost" htmlFor="update-element-image-modal" onClick={handleCancel}>Cancel</label>
                                <button type="submit" className="btn btn-primary" >{isLoading ? <div className="loading loading-spinner" /> : 'Update'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default UpdateElementImage