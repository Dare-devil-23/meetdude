'use client'
import React, { useEffect, useState } from 'react'
import { Map } from '@/types';
import { getMapsApi } from '@/services/space';
import SpacesLoading from '../../loading';

const AdminMapsPage = () => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [isMapsLoading, setIsMapsLoading] = useState(false);

  useEffect(() => {
    setIsMapsLoading(true);
    getMapsApi().then((response) => {
      setMaps(response.maps);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsMapsLoading(false);
    });
  }, []);

  if (isMapsLoading) {
    return (
      <SpacesLoading items={6} />
    )
  }

  return (
    <>
      <div className='grid grid-cols-12 gap-5 w-full md:max-w-5xl mx-auto px-5 md:px-10'>
        {
          maps.map((map) => (
            <div key={map.id} className="card col-span-12 md:col-span-6 lg:col-span-4 bg-neutral text-neutral-content shadow-xl">
              <figure className='aspect-square'>
                <img src={map.thumbnail || '/images/thumbnail-fallback.png'} alt={map.id} className="object-cover h-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{map.name}</h2>
                <div className="text-sm text-left">{map.dimensions} Units</div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default AdminMapsPage