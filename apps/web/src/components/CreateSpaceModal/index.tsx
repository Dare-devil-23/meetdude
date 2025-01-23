import SpacesLoading from '@/app/(authorized)/loading';
import { createSpaceApi, getMapsApi } from '@/services/space';
import { Map } from '@/types';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

interface CreateSpaceModalProps {
    toggleRender: boolean;
    setToggleRender: (value: boolean) => void;
}

const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({ toggleRender, setToggleRender }: CreateSpaceModalProps) => {
    const [maps, setMaps] = useState<Map[]>([]);
    const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
    const [createWithoutMap, setCreateWithoutMap] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMapsLoading, setIsMapsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMapsLoading(true);
            getMapsApi().then((response) => {
                setMaps(response.maps);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsMapsLoading(false);
            });
        }
    }, [isOpen]);

    const handleCreateSpace = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData: {
            name: string,
            dimensions: string,
            mapId?: string,
            thumbnail?: string
        } = {
            name: "",
            dimensions: "",
            mapId: undefined,
            thumbnail: undefined
        };
        if (createWithoutMap) {
            formData = {
                name: e.currentTarget.spaceName.value as string,
                dimensions: e.currentTarget.dimensions.value as string,
                thumbnail: e.currentTarget.thumbnail.value as string
            }
        } else {
            const map = maps.find((map) => map.id === selectedMapId);
            formData = {
                name: map?.name!,
                dimensions: map?.dimensions!,
                mapId: map?.id
            }
        }

        if (formData) {
            setIsLoading(true);
            createSpaceApi(formData).then(() => {
                toast.success("Space created successfully")
                const createSpaceModal = document.getElementById('create-space-modal');
                if (createSpaceModal && createSpaceModal instanceof HTMLInputElement) {
                    createSpaceModal.click();
                }
                setToggleRender(!toggleRender);
                setSelectedMapId(null);
            }).catch((e) => {
                toast.error(e.response.message || "Something went wrong")
            }).finally(() => {
                setIsLoading(false);
            })
        }
    }

    const handleCreateWithoutMap = () => {
        setCreateWithoutMap(!createWithoutMap);
        formRef.current?.reset();
    }

    return (
        <>
            <input type="checkbox" id="create-space-modal" className="modal-toggle" onChange={(e) => setIsOpen(e.target.checked)} />
            <div role="dialog" className="modal modal-bottom md:modal-middle">
                <div className={`modal-box ${!createWithoutMap ? 'md:max-w-5xl' : ''}`}>
                    <h3 className="font-bold text-lg">Create a new space</h3>
                    <p className="py-2">
                        {createWithoutMap ? 'Create a space without a map' : 'Choose a map to create your space'}
                    </p>
                    <div className="flex justify-end m-5">
                        <button className="btn btn-outline btn-primary btn-sm" onClick={handleCreateWithoutMap}>{createWithoutMap ? 'Create with map' : 'Create without map'}</button>
                    </div>
                    <form ref={formRef} onSubmit={handleCreateSpace}>
                        {
                            createWithoutMap ? (
                                <>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name<span className="text-red-500">*</span></span>
                                        </label>
                                        <input type="text" placeholder="eg: My Space" className="input input-bordered" required name="spaceName" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Dimensions<span className="text-red-500">*</span></span>
                                        </label>
                                        <input type="text" placeholder="eg: 100x100" className="input input-bordered" required name="dimensions" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Thumbnail</span>
                                        </label>
                                        <input type="text" placeholder="eg: https://example.com/thumbnail.png" className="input input-bordered" name="thumbnail" />
                                    </div>
                                </>
                            ) : (
                                <div className="grid grid-cols-12 gap-5 mx-auto px-5 max-h-[500px] overflow-y-auto">
                                    {
                                        isMapsLoading ? (
                                            <>
                                                <SpacesLoading items={6} />
                                            </>
                                        ) : maps.map((map) => (
                                            <button type="button" key={map.id} className="col-span-12 md:col-span-4 lg:col-span-3" onClick={() => setSelectedMapId(map.id)}>
                                                <div className={`card shadow-xl ${selectedMapId === map.id ? 'bg-primary text-primary-content' : 'bg-neutral text-neutral-content'}`}>
                                                    <figure className='aspect-square'>
                                                        <img src={map.thumbnail || '/images/thumbnail-fallback.png'} alt={map.name} className="object-cover h-full" />
                                                    </figure>
                                                    <div className="card-body">
                                                        <h2 className="card-title">{map.name}</h2>
                                                        <p className="text-sm text-left">{map.dimensions}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <div className="modal-action">
                            <div className="flex justify-end gap-5">
                                <label id="cancel-create-space-modal" className="btn btn-ghost" htmlFor="create-space-modal">Cancel</label>
                                <button type="submit" className="btn btn-primary" disabled={createWithoutMap ? false : !selectedMapId || isLoading}>{isLoading ? 'Creating...' : 'Create'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default CreateSpaceModal