'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaSort } from "react-icons/fa";

export type selectboxOption = {
    id: number,
    text: string,
    value: string | number | null
}

type Props = {
    selected: string | number,
    setSelected: Function,
    options: selectboxOption[],
}

const Selectbox = ({selected, setSelected, options}: Props) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const selectboxRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectboxRef.current && !selectboxRef.current.contains(event.target as Node)) {
                setIsOpen(false); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <div ref={selectboxRef} className='relative select-none'>
        <div onClick={() => setIsOpen(prev => !prev)} className='rounded-lg w-full border text-sm border-dark-200 flex items-center hover:cursor-pointer justify-between px-4 py-2'>
            <p>{selected}</p>
            <FaSort />
        </div>
        {isOpen && <div className='left-0 top-10 absolute z-10 p-2 bg-dark-200 w-full rounded-xl '>
            {options?.map(item => <button onClick={() => {
                    setSelected(item.value)
                    setIsOpen(prev => !prev)
                }} key={item.id} className='px-4 py-2 text-left w-full hover:bg-dark-300 rounded-lg hover:cursor-pointer transition-colors duration-300'>{item.text}</button>)}
        </div>}
    </div>
  )
}

export default Selectbox