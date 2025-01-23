'use client'

import CreateSpaceModal from "@/components/CreateSpaceModal";
import DeleteSpaceModal from "@/components/DeleteSpaceModal";
import { getSpacesForUserApi } from "@/services/space";
import { RootState } from "@/store/store";
import { Space } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpacesLoading from "./loading";

const HomePage = () => {
  const loggedinUser = useSelector((state: RootState) => state.user);

  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const [toggleRender, setToggleRender] = useState(false);

  useEffect(() => {
    if (loggedinUser?.id) {
      getSpacesForUserApi().then((response) => {
        setSpaces(response.spaces);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [loggedinUser?.id, toggleRender]);

  const openDeleteSpaceModal = (spaceId: string) => {
    setSpaceId(spaceId);
    const deleteSpaceModal = document.getElementById('delete-space-modal');
    if (deleteSpaceModal && deleteSpaceModal instanceof HTMLDialogElement) {
      deleteSpaceModal.showModal();
    }
  }

  if (isLoading) {
    return <SpacesLoading />;
  }

  return (
    <>
      <div className="flex justify-between items-center md:max-w-5xl mx-auto p-5">
        <h1 className="text-2xl font-bold">Your Spaces</h1>
        {
          spaces.length > 0 && (
            <label htmlFor="create-space-modal" className="btn btn-outline btn-sm btn-primary">Create New Space</label>
          )
        }
      </div>
      <div className="grid grid-cols-12 gap-5 w-full md:max-w-5xl mx-auto px-5 md:px-10">
        {
          spaces.length > 0 ? spaces.map((space) => (
            <div key={space.id} className="card col-span-12 md:col-span-6 lg:col-span-4 bg-neutral text-neutral-content shadow-xl">
              <figure className="aspect-square">
                <img
                  src={space.thumbnail || '/images/thumbnail-fallback.png'}
                  alt={space.name}
                  className="object-cover h-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{space.name}</h2>
                <p className="text-sm text-gray-500">{space.dimensions} Units</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-ghost underline" onClick={() => openDeleteSpaceModal(space.id)}>Delete</button>
                  <Link href={`/space/${space.id}`} className="btn btn-primary">Join Space</Link>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-12 text-center min-h-[50vh] flex items-center justify-center border border-gray-800 rounded-2xl">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">No spaces found</h1>
                <p className="text-sm text-gray-500">You don't have any spaces yet. Create one to get started.</p>
                <label htmlFor="create-space-modal" className="btn btn-primary mt-5 w-fit mx-auto">Create Space</label>
              </div>
            </div>
          )
        }
        <CreateSpaceModal toggleRender={toggleRender} setToggleRender={setToggleRender} />
        <DeleteSpaceModal spaceId={spaceId} spaces={spaces} setSpaces={setSpaces} setSpaceId={setSpaceId} />
      </div>
    </>
  );
}

export default HomePage;