'use client'
import React, { useEffect, useRef } from 'react'
import { MdDelete } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { Task } from '../TaskTable/TaskTable';

type Props = {
  moreBoxPosition: {top: number, left: number}
  setShowEditPopup: (state: Task | null) => void
  activeTask: Task
  setActiveTask: (state: Task | null) => void
  setShowDeletePopup: (state: boolean | number[]) => void
  copy: () => void
}

const MoreBox = ({moreBoxPosition, setShowEditPopup, activeTask, setActiveTask, setShowDeletePopup, copy}: Props) => {
  
  const moreboxRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (moreboxRef.current && !moreboxRef.current.contains(event.target as Node)) {
          setActiveTask(null); 
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  return (
    <div ref={moreboxRef} style={{
        position: 'fixed',
        top: `${moreBoxPosition.top+10}px`,
        left: `${moreBoxPosition.left-180}px`,
      }}  
      className='z-50 h-fit text-sm p-2 top-10 right-10 rounded-lg bg-dark-100 border border-dark-200 flex flex-col w-[200px]'
    >
      <div onClick={() => {
          setShowEditPopup(activeTask)
          setActiveTask(null)
          }} className='px-4 py-2 hover:bg-dark-200 rounded-lg hover:cursor-pointer duration-300 transition-colors flex items-center justify-between'>
        <p>Edit</p>
        <MdModeEditOutline style={{color: '#3b82f6'}} />
      </div>
      <div onClick={copy} className='px-4 py-2 hover:bg-dark-200 rounded-lg hover:cursor-pointer duration-300 transition-colors flex items-center justify-between'>
        <p>Make a copy</p>
        <IoCopy />  
      </div>
      <div onClick={() => {
        setShowDeletePopup([activeTask.id])
        setActiveTask(null)
        }} className='px-4 py-2 hover:bg-dark-200 rounded-lg hover:cursor-pointer duration-300 transition-colors flex items-center justify-between'>
        <p>Delete</p>
        <MdDelete style={{color: '#dc2626'}} />
      </div>
    </div>
  )
}

export default MoreBox