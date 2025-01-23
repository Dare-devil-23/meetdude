'use client'

import { getAvailableElements } from '@/services/user';
import { Element } from '@/types';
import React, { useEffect, useState } from 'react'
import SpacesLoading from '../../loading';
import UpdateElementImage from '@/components/UpdateElementImage';

const AdminElementsPage = () => {

  const [elements, setElements] = useState<Element[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEleId, setSelectedEleId] = useState<string | null>(null);
  const [toggleElementRender, setToggleElementRender] = useState(false);

  useEffect(() => {
    getAvailableElements().then((response) => {
      setElements(response.elements);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    })
  }, [toggleElementRender]);

  const handleOnClickUpdate = (id: string) => {
    setSelectedEleId(id);
    const updateElementImage = document.getElementById('update-element-image-modal');
    if (updateElementImage && updateElementImage instanceof HTMLDialogElement) {
      updateElementImage.showModal();
    }
  }

  if (loading) {
    return (
      <SpacesLoading items={6} />
    )
  }

  return (
    <>
      <div className='grid grid-cols-12 gap-5 w-full md:max-w-5xl mx-auto px-5 md:px-10'>
        {
          elements.map((ele) => (
            <div key={ele.id} className="card col-span-12 md:col-span-6 lg:col-span-4 bg-neutral text-neutral-content shadow-xl">
              <figure className='aspect-square'>
                <img src={ele.imageUrl || '/images/thumbnail-fallback.png'} alt={ele.id} className="object-cover h-full" />
              </figure>
              <div className="card-body">
                <div className="flex gap-2 items-center mb-2">
                  <div className="text-sm text-left">{ele.height}x{ele.width} Units</div>
                  <div className="badge badge-primary badge-outline">{ele.static ? 'Static' : 'Dynamic'}</div>
                </div>
                <div className="card-actions justify-end">
                  <label htmlFor="update-element-image-modal" className="btn btn-primary" onClick={() => handleOnClickUpdate(ele.id)}>Update Image</label>
                </div>
              </div>
            </div>
          ))
        }
        <UpdateElementImage elementId={selectedEleId || ''} setSelectedEleId={setSelectedEleId} setToggleElementRender={setToggleElementRender} />
      </div>
    </>
  )
}

export default AdminElementsPage