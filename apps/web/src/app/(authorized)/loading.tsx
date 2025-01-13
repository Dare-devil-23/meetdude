import React from 'react'

interface SpacesLoadingProps {
    items?: number;
}

const SpacesLoading = ({ items = 9 }: SpacesLoadingProps) => {
    return (
        <div className='flex flex-col items-center justify-center my-5 md:my-10'>
            <div className="grid grid-cols-12 gap-5 w-full md:max-w-5xl mx-auto">
                {Array.from({ length: items }).map((_, index) => (
                    <div key={index} className="col-span-12 md:col-span-4 flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SpacesLoading