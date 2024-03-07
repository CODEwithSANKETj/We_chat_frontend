import React from 'react';
import { useSelector } from 'react-redux';

function Message_skeleton() {
    const theme = useSelector((Store)=>Store.theme.theme);
    const skeletonClass = theme === 'white' ? 'skeleton-light' : 'skeleton-dark';

    return (
        <>
            <div className={`flex gap-3 items-center ${skeletonClass}`}>
                <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
                <div className='flex flex-col gap-1'>
                    <div className='skeleton h-4 w-40'></div>
                    <div className='skeleton h-4 w-40'></div>
                </div>
            </div>
            <div className={`flex gap-3 items-center justify-end ${skeletonClass}`}>
                <div className='flex flex-col gap-1'>
                    <div className='skeleton h-4 w-24'></div>
                </div>
                <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
            </div>
        </>
    );
}

export default Message_skeleton;
